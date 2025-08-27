import Image from "next/image";
import cls from "./css-trick-vision.module.css";
import { FlexCenter } from "./grid";
function CustomScrollbar() {
  return (
    <div
      style={{
        height: 100,
        width: "calc(100% - 50px)",
        overflow: "auto",
        background: "lightyellow",
        margin: 16,
        padding: 8,
      }}
      className={cls["custom-scrollbar"]}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
    </div>
  );
}

function PureCssGradientBorder() {
  return (
    <div
      className={cls["pure-css-gradient-border"]}
      style={{ height: 100 }}
    ></div>
  );
}

function Glass() {
  return (
    <div
      style={{
        height: 400,
        width: 400,
        backgroundImage: "url('/images/5.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={cls["glass"]}>毛玻璃效果</div>
    </div>
  );
}

function GradientText({ children }) {
  return <div className={cls["gradient-text"]}>{children}</div>;
}

function ImageGrayFilter() {
  return (
    <Image
      src="/images/5.jpg"
      width="200"
      height="200"
      alt="image"
      style={{ filter: "grayscale(100%)" }}
    />
  );
}

function CustomCursor({ children }) {
  return <div className={cls["custom-cursor"]}>{children}</div>;
}

function IconHoverAnimation() {
  return (
    <Image
      src="/images/double.png"
      width="20"
      height="20"
      alt="image"
      className={cls["icon-hover-animation"]}
    />
  );
}

function OverLay({ children }) {
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>{children}</div>
  );
}

function TextSelection({ children }) {
  return <div className={cls["text-selection"]}>{children}</div>;
}

export {
  CustomScrollbar,
  PureCssGradientBorder,
  Glass,
  GradientText,
  ImageGrayFilter,
  CustomCursor,
  IconHoverAnimation,
  OverLay,
  TextSelection,
};
