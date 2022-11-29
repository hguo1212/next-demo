import fs from 'fs';
import path from 'path';
import { compile } from '@mdx-js/mdx'
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import {flow, orderBy, filter, split,trim, includes} from 'lodash/fp'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
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
  const code = String(await compile(fileContents, {
    outputFormat: 'function-body',
    useDynamicImport: true,
    remarkPlugins: [
      [remarkGfm, {singleTilde: false}]
      ,remarkFrontmatter, remarkMdxFrontmatter],
  }))

  const matterResult = matter(fileContents);
  // Combine the data with the id and contentHtml
  return {
    id,
    fullPath,
    code,
    ...matterResult.data
  };
}