import React, { useState } from "react";
import Image from "next/image";
import cls from "./envelope.module.css";
import BackPane from "../image/envelope-layer-back";
import Shell from "../image/envelope-layer-shell";
import Content from "../image/envelope-layer-content";
import Flap from "../image/envelope-layer-flap";
import classNames from "classnames";

const Letter = ({ className, style, children }) => (
  <div className={className} style={style}>
    <div style={{ position: "relative" }}>
      <Content />
      <div style={{ position: "absolute", left: 20, top: 20 }}>{children}</div>
    </div>
  </div>
);

const Envelope = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={cls.wrapper}
      onClick={() => {
        setIsOpen((val) => !val);
      }}
    >
      <BackPane
        style={{
          zIndex: 1,
          position: "absolute",
        }}
      />
      <Letter
        className={classNames({
          [cls.contentOpen]: isOpen,
          [cls.contentClose]: !isOpen,
        })}
        style={{
          zIndex: 3,
          position: "absolute",
        }}
      >
        {children}
      </Letter>
      <Shell
        style={{
          position: "absolute",
          zIndex: 4,
        }}
      />
      <Flap
        className={classNames({
          [cls.open]: isOpen,
          [cls.close]: !isOpen,
        })}
        style={{ position: "absolute", zIndex: isOpen ? 2 : 5 }}
      />
    </div>
  );
};

Envelope.propTypes = {};

Envelope.displayName = __filename;

export default Envelope;
