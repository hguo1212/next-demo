import { useEffect, useState, useMemo } from "react";
import { throttle } from "lodash/fp";
import classNames from "classnames";
import Icon from "../components/icon";
import cls from "./use-scroll.module.css";

const useScroll = ({ containerRef }) => {
  const [rolled, setRolled] = useState(false);

  const scroll = () => {
    const container = containerRef.current;
    let viewHight = container.offsetHeight; //可视区域高度
    let scrollTop = container.scrollTop; // 元素顶部到视口可见内容顶部的像素数
    if (scrollTop > viewHight) {
      setRolled(true);
    } else {
      setRolled(false);
    }
  };

  const throttleScroll = throttle(200, scroll);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", throttleScroll);
      return () => {
        container.removeEventListener("scroll", throttleScroll);
      };
    }
  }, [containerRef, throttleScroll]);

  const BackTop = useMemo(() => {
    const container = containerRef.current;
    return (
      container && (
        <Icon
          src="/icons/top-arrow.svg"
          className={classNames(cls.anchor, { [cls.show]: rolled })}
          onClick={() => {
            container.scrollTo(0, 0);
          }}
        />
      )
    );
  }, [rolled, containerRef]);

  return { rolled, BackTop };
};
export default useScroll;
