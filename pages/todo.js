import { useEffect, useState } from "react";
import { prop, map, flow, propEq, keys, toNumber } from "lodash/fp";
import classNames from "classnames";
import Icon from "../components/icon";
import Layout from "../components/layout";
import style from "./todo.module.css";
import { del, post, read } from "../hooks/request";

export default function TODO({}) {
  const [data, setData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [params, setParams] = useState({ page: 1, size: 3 });

  useEffect(() => {
    read("todo", params).then(({ content, total: _total, pageTotal }) => {
      setData(content);
      setTotalPage(pageTotal);
    });
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
                post("todo", { name: inputVal }).then(() => {
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
              <Icon
                priority
                src="/icons/delete.svg"
                className={style.deleteIcon}
                onClick={() => {
                  del(`todo`, {
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
