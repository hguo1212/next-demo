import Image from "next/image";
import style from './icon.module.css';
import classNames from "classnames";

const Icon = ({ src, className, width = 30, height = 30, onClick,...res }) => {
  return (
    <Image
      priority
      src={src}
      className={classNames(style.icon, className)}
      height={width}
      width={height}
      alt=""
      onClick={onClick}
      {...res}
    />
  );
};

export default Icon;
