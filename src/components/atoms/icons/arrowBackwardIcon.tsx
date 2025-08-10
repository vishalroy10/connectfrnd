import * as React from 'react';

const ArrowBackwardIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 18L9 12L15 6" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);
export default ArrowBackwardIcon;
