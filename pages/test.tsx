import React from "react";

type TestProps = {
  // 定义组件的Props
};

// 使用函数组件和类型注解定义React组件
const Test: React.FC<TestProps> = (props) => {
  return <div>ceshi</div>;
};

export default Test;
