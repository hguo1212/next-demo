import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { map, flow, isEmpty, prop, trim, split } from "lodash/fp";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getAllPostIds, getPostData } from "../../lib/post";
import { read, put } from "../../hooks/request";
import Layout from "../../components/layout";
import Date from "../../components/date";
import Echart from "../../components/echart-box";
import Envelope from "../../components/envelope";
import FoldedPicture from "../../components/folded-picture";
import {
  CustomScrollbar,
  PureCssGradientBorder,
  Glass,
  GradientText,
  ImageGrayFilter,
  CustomCursor,
  IconHoverAnimation,
  OverLay,
  TextSelection,
} from "../../components/css-trick-vision";

import cls from "./[id].module.css";
import {
  Grid,
  AdjustFontSize,
  AdjustImage,
  FlexCenter,
} from "../../components/grid";

const components = {
  Code: ({ children }) => (
    <span style={{ background: "#BDCDD6", color: "#27374D" }}>{children}</span>
  ),
  Planet: ({ children }) => <span style={{ color: "tomato" }}>{children}</span>,
  Echart: ({ children, ...res }) => <Echart {...res} />,
  Envelope: ({ ...res }) => <Envelope {...res} />,
  Paragraph: ({ children, ...res }) => (
    <div {...res} style={{ color: "#626469", marginBottom: 10 }}>
      {children}
    </div>
  ),
  Strong: ({ children }) => (
    <span style={{ color: "#f03744" }}>{children}</span>
  ),
  FoldedPicture: ({ children, ...res }) => <FoldedPicture {...res} />,
  Grid,
  AdjustFontSize,
  AdjustImage,
  CustomScrollbar,
  PureCssGradientBorder,
  FlexCenter,
  Glass,
  GradientText,
  ImageGrayFilter,
  CustomCursor,
  IconHoverAnimation,
  OverLay,
  TextSelection,
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

  const tags = useMemo(() => {
    return flow(prop("tag"), split(","))(postData);
  }, [postData]);

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
      {!isEmpty(tags) && (
        <div>
          {map((tag) => (
            <span key="tag" className={cls.tag}>
              {tag}
            </span>
          ))(tags)}
        </div>
      )}
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
