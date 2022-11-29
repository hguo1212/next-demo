import {useEffect, useState} from 'react';
import Head from "next/head";
import {prop} from 'lodash/fp'
import {run} from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime';
import { getAllPostIds, getPostData } from "../../lib/post";
import Layout from "../../components/layout";
import Date from "../../components/date";

export default function Post({postData}) {
  const [Component, setComponent] = useState('');
  const [meta, setMeta] = useState();

  useEffect(()=>{
    const getContent = async ()=> {
    run(postData.code, runtime).then((res)=>{
        console.log('res',res)
        setMeta(res.meta)
        setComponent(()=> res.default)
      })
    }
    getContent();
  },[postData])

  return <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <h1>{prop('title')(postData)}</h1>
    <Date dateString={prop('date')(postData)}/>
    {Component ? <Component 
    components={{
      Planet: () => <span style={{color: 'tomato'}}>Pluto</span>
      }}/> : null}
  </Layout>
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id);
  return {
    props:{
      postData,
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}