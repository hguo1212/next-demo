import {  useRef } from "react";
import { map, flow, keys,} from "lodash/fp";
import Layout from "../components/layout";
import useScroll from "../hooks/use-scroll";

export default function list() {
  const containerRef = useRef();

  const { BackTop } = useScroll({containerRef });
  return (
    <Layout>
      use-scroll 
      <div style={{ position: "relative" }}>
        <div
          style={{
            height: 500,
            overflow: "auto",
            padding: "10px",
            background: "white",
            position: "relative",
          }}
          ref={containerRef}
        >
          <div style={{ background: "pink" }}>
            {flow(
              (val) => {
                return keys(new Array(val));
              },
              map((item) => (
                <div key={item}>
                  <span>{item} </span>Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Odio nesciunt nam officia labore voluptatum.
                  Necessitatibus beatae nostrum praesentium magnam officiis
                  quisquam commodi, quos soluta tempore. Dignissimos quam
                  accusamus cupiditate eos?
                </div>
              ))
            )(100)}
          </div>
        </div>
        {BackTop}
      </div>
    </Layout>
  );
}
