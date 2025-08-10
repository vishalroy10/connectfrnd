import * as React from 'react';

const ArrowRightIcon = ({ ...props }) => (
  <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#filter0_d_774_63360)">
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_774_63360"
        x="-4"
        y="0"
        width="32"
        height="32"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_774_63360" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_774_63360" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default ArrowRightIcon;
