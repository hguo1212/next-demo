import Image from "next/image";
import cls from "./grid.module.css";

function FlexCenter({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

function Grid() {
  return (
    <div className={cls["gird-auto"]}>
      <div className={cls["grid-auto-item"]}>1</div>
      <div className={cls["grid-auto-item"]}>2</div>
      <div className={cls["grid-auto-item"]}>3</div>
    </div>
  );
}

function AdjustFontSize() {
  return (
    <div className={cls["text-adjust"]}>
      AdjustFontSize 自适应缩放字体 测试文本测试文本
    </div>
  );
}

function AdjustImage({ src }) {
  return (
    <div>
      AdjustImage 自适应图片
      <Image
        src={src}
        className={cls.img}
        alt="adjust-image"
        width={200}
        height={200}
      />
    </div>
  );
}

export { Grid, AdjustFontSize, AdjustImage, FlexCenter };
