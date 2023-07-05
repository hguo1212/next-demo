import React from "react";

const result = ({ style }) => (
  <svg
    width="500"
    height="360"
    viewBox="0 0 500 360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <g>
      <g filter="url(#filter0_d)">
        <rect x="16" y="16" width="468" height="328" rx="4" fill="white" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="-4"
        y="-4"
        width="508"
        height="368"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="10" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.788594 0 0 0 0 0.66846 0 0 0 0 0.386406 0 0 0 0.37 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default result;
