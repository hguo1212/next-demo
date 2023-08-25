import React from "react";
import { string } from "prop-types";
import cls from "./folded-picture.module.css";

const FoldedPicture = ({ imgPath, imgText }) => {
  return (
    <span
      className={cls.box}
      style={{
        "--bg": `url(${imgPath})`,
      }}
    >
      <span className={cls.a}></span>
      <span className={cls.bc}>
        <span className={cls.b}></span>
        <span className={cls.c}></span>
      </span>
      <img src={imgPath} alt={imgText} className={cls.img} />
    </span>
  );
};

FoldedPicture.propTypes = {
  imgPath: string,
  imgText: string,
};

FoldedPicture.displayName = __filename;

export default FoldedPicture;
