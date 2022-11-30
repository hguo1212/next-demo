import {useEffect, useState} from 'react';
import Head from "next/head";
import {prop} from 'lodash/fp'
import {run} from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime';
import { getAllPostIds, getPostData } from "../../lib/post";
import Layout from "../../components/layout";
import Date from "../../components/date";

const components = {Planet: () => <span style={{color: 'tomato'}}>Pluto</span>};

export default function Post({postData}) {
  const [Component, setComponent] = useState('');

  useEffect(()=>{
    const getContent = async ()=> {
    run(postData.code, runtime).then((res)=>{
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
    <hr />
    {Component ? <Component 
    components={components}/> : null}
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