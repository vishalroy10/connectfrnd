import * as React from "react";
import { ISvgIcon } from "./types";

const Lighting = ({size,...props}: ISvgIcon) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.8333 1.66699L3.41118 10.5735C3.12051 10.9223 2.97517 11.0967 2.97295 11.244C2.97102 11.3721 3.02808 11.4939 3.12768 11.5744C3.24226 11.667 3.46928 11.667 3.92333 11.667H9.99997L9.16663 18.3337L16.5888 9.42712C16.8794 9.07831 17.0248 8.9039 17.027 8.75661C17.0289 8.62856 16.9719 8.50674 16.8723 8.42625C16.7577 8.33366 16.5307 8.33366 16.0766 8.33366H9.99997L10.8333 1.66699Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Lighting;
