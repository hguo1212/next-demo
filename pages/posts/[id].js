import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { map, flow, isEmpty, prop, trim, split } from "lodash/fp";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getAllPostIds, getPostData } from "../../lib/post";
import { read, put } from "../../hooks/request";
import Layout from "../../components/layout";
import Date from "../../components/date";
import cls from './[id].module.css'
const components = {
  Planet: ({ children }) => <span style={{ color: "tomato" }}>{children}</span>,
};

export default function Post({ postData }) {
  const [Component, setComponent] = useState("");
  const [detail, setDetail] = useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      run(postData.code, runtime).then((res) => {
        setComponent(() => res.default);
      });
    };
    getContent();
  }, [postData, flag]);

  useEffect(() => {
    read(`statistical`, { title: postData.title }).then((res) => {
      setDetail(res);
    });
  }, [postData.title, flag]);

  const tags = useMemo(()=>{
    return  flow(prop('tag'),split(','))(postData)
  },[postData])

  const onHeartClick = useCallback(() => {
    const { _id, count } = detail || {};
    if (_id) {
      put("statistical", { id: _id, count: count + 1 }).then(() => {
        setFlag((val) => !val);
      });
    }
  }, [detail]);

  return (
    <Layout count={prop("count")(detail)} onHeartClick={onHeartClick}>
      <Head>
        <title>{postData.title}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
      </Head>
      <h1>{prop("title")(postData)}</h1>
      <Date dateString={prop("date")(postData)} />
      {!isEmpty(tags) && <div>
        {map((tag)=> <span key="tag" className={cls.tag}>{tag}</span>)(tags)}
        </div>}
      <hr />
      {Component ? <Component components={components} /> : null}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
