import * as React from "react";

const DotIcon = ({...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={4}
    height={4}
    viewBox="0 0 4 4"
    fill="none"
    {...props}
  >
    <circle cx={2} cy={2} r={2} fill="#D9D9D9" />
  </svg>
);
export default DotIcon;
