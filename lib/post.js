import fs from 'fs';
import path from 'path';
import {compile,run} from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime';
import matter from 'gray-matter';

import {flow, orderBy, filter, split,trim, includes} from 'lodash/fp'

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  // NOTE:map中使用异步函数
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx?$/, '');
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const code = String(await compile(fileContents, {outputFormat: 'function-body',useDynamicImport: true }));
    const { meta } = await run(code, runtime) || {};

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
      id,
      ...meta,
    };
  }));
  // Sort posts by date
  return flow(orderBy('date','desc')
  ,filter(({tag})=>{
    const tags = flow(split(","), trim)(tag);
    return includes('css')(tags)
  }),
  )(allPostsData);
}


export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName)=>{
    return {
      params: {
        id: fileName.replace(/\.mdx?$/,''),
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const code = String(await compile(fileContents, {outputFormat: 'function-body',useDynamicImport: true }))
  // Combine the data with the id and contentHtml
  return {
    id,
    fullPath,
    code,
  };
}