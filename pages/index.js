import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  flow,
  flatten,
  map,
  split,
  trim,
  isNil,
  isString,
  entries,
  filter,
  prop,
  includes,
} from "lodash/fp";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Date from "../components/date";
import classNames from "classnames";

import { getSortedPostsData } from "../lib/post";

import styles from "./index.module.css";

export default function Home({ allPostsData, tagCount }) {
  const [selectTag, setSelectTag] = useState();

  return (
    <Layout
      home
      tagCount={tagCount}
      setSelectTag={setSelectTag}
      selectTag={selectTag}
      className={styles.layout}
    >
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          {map((item) => (
            <div
              key={item[0]}
              className={classNames(styles.flex, {
                [styles.highlight]: item[0] === selectTag,
              })}
              onClick={() => {
                setSelectTag(item[0]);
              }}
            >
              {item[0]} <span className={styles.count}>{item[1]}</span>
            </div>
          ))(tagCount)}
        </aside>
        <div className={styles.content}>
          <Head>
            <title>{siteTitle}</title>
          </Head>
          <section className={utilStyles.headingMd}>
            <p>
              Hello, I&apos;m Hannah. I&apos;m a fronted-web developer. You can
              contact me on GitHub.
            </p>
          </section>
          <section
            className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
          >
            <h2 className={utilStyles.headingLg}>
              Blog {selectTag ? `/ ${selectTag}` : ""}
            </h2>
            <ul className={utilStyles.list}>
              {flow(
                filter((item) => {
                  if (selectTag) {
                    const tagStr = flow(
                      prop("tag"),
                      split(","),
                      map(trim)
                    )(item);
                    return includes(selectTag)(tagStr);
                  }
                  return true;
                }),
                map(({ id, date, title }) => (
                  <li className={utilStyles.listItem} key={id}>
                    <Link href={`/posts/${id}`}>{title}</Link>
                    <br />
                    <small className={utilStyles.lightText}>
                      <Date dateString={date} />
                    </small>
                  </li>
                ))
              )(allPostsData)}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const tags = flow(
    map(({ tag }) => split(",")(tag)),
    flatten,
    map(trim)
  )(allPostsData);

  const tagCount = tags.reduce((statics, item, b) => {
    if (isString(item)) {
      if (isNil(statics[item])) {
        statics[item] = 1;
      } else {
        statics[item] += 1;
      }
    }
    return statics;
  }, {});

  return {
    props: { allPostsData, tags, tagCount: entries(tagCount) },
  };
}
