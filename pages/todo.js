import { useEffect, useState } from "react";
import { prop, map, flow, propEq, keys, toNumber } from "lodash/fp";
import classNames from "classnames";
import Image from "next/image";
import Icon from "../components/icon";
import Layout from "../components/layout";
import style from "./todo.module.css";
import { del, post, read } from "../hooks/request";
import clientPromise from "../lib/mongodb";


export default function TODO({ baseUrl }) {
  const [data, setData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [params, setParams] = useState({ page: 1, size: 3 });

  useEffect(() => {
    read(`${baseUrl}/api/todo`, params).then(
      ({ content, total: _total, pageTotal }) => {
        setData(content);
        setTotalPage(pageTotal);
      }
    );
  }, [params]);

  return (
    <Layout>
      <article>
        <div className={style.marginLeft9}>
          <br />
          <div className={style.flex}>
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <Icon
              src="/icons/add.svg"
              onClick={() => {
                post(`${baseUrl}/api/todo`, { name: inputVal }).then(() => {
                  setParams((pre) => ({ ...pre }));
                  setInputVal("");
                });
              }}
            />
          </div>
        </div>
        {map((item) => {
          return (
            <div className={style.item} key={prop("_id")(item)}>
              {item.name}
              <Image
                priority
                src="/icons/delete.svg"
                className={style.deleteIcon}
                height={30}
                width={30}
                alt=""
                onClick={() => {
                  del(`${baseUrl}/api/todo`, {
                    _id: prop("_id")(item),
                  }).then(() => {
                    setParams((pre) => ({ ...pre }));
                  });
                }}
              />
            </div>
          );
        })(data)}
      </article>
      <div className={classNames(style.flex, style.marginTop)}>
        {flow(
          (val) => {
            return keys(new Array(val));
          },
          map(toNumber),
          map((item) => (
            <div
              key={item}
              className={classNames(style.pagination, {
                [style.cur]: propEq("page", item + 1)(params),
              })}
              onClick={() => {
                if (!propEq("page", item + 1)(params)) {
                  setParams((pre) => ({ ...pre, page: item + 1 }));
                }
              }}
            >
              {item + 1}
            </div>
          ))
        )(totalPage)}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const baseUrl = process.env.API_BASE_URL;
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const todo = await db.collection("kittens").find({}).limit(10).toArray();
    return {
      props: { data: JSON.parse(JSON.stringify(todo)), baseUrl },
    };
  } catch (e) {
    console.error(e);
  }
  return { props: { data: [], baseUrl } };
}
