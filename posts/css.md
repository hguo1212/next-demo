---
title: "使用css居中的三种方式"
date: '2022-11-23'
---

本文介绍三种使用css实现居中的方式。

1. 使用绝对定位、相对定位 及动画实现居中
```css
  .container {
    position: relative;
    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      }
  }
```

2. 使用flex
```css
  .flexBox {
    background: linear-gradient(
      to right, 
      hsl(142deg 71% 45%), 
      hsl(142deg 72% 29%)
    );
    
    display: flex;
    // align-content: center;
    // justify-content: center;
    flex-wrap: wrap;
    place-content: center;
  }
```

3. 使用grid

```css
  .grid {
    background: linear-gradient(
      to right, 
      hsl(351deg 95% 71%), 
      hsl(292deg 84% 61%),
      hsl(239deg 84% 67%)
    );
    
    display: grid;
    //align-content: center;
    //justify-content: center;
    place-content: center;
  }
```