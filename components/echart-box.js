import React from "react";
import ReactEcharts from "echarts-for-react";

const Result = ({ width = 200, height = 200, option }) => {
  return (
    <ReactEcharts
      style={{
        width,
        height,
      }}
      option={option}
    />
  );
};

Result.propTypes = {};

Result.displayName = __filename;

export default Result;
