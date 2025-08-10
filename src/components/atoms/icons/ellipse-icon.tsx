import { useScreenSize } from '@/hooks/useScreenSize';
import React from 'react';

function EllipseIcon() {
  const { isTablet } = useScreenSize();
  return (
    <svg
      style={{
        position: 'absolute',
        left: '0rem',
        top: '-3rem',
      }}
      width="427"
      height="409"
      viewBox="0 0 427 409"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!isTablet ? (
        <>
          {' '}
          <circle cx="213.5" cy="195.5" r="213.5" fill="url(#paint0_linear_578_45229)" />
          <defs>
            <linearGradient
              id="paint0_linear_578_45229"
              x1="-19.5"
              y1="-18"
              x2="445.5"
              y2="567.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFF2C2" />
              <stop offset="1" stopColor="#FFF7F2" />
              <stop offset="1" stopColor="#FFF7F2" />
            </linearGradient>
          </defs>{' '}
        </>
      ) : (
        <>
          {' '}
          <circle cx={'213.5'} cy={'213.5'} r="213.5" fill="url(#paint0_linear_632_101549)" />
          <defs>
            <linearGradient
              id="paint0_linear_632_101549"
              x1="-19.5"
              y1="-1.20346e-06"
              x2="445.5"
              y2="585.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFF2C2" />
              <stop offset="1" stopColor="#FFF7F2" />
              <stop offset="1" stopColor="#FFF7F2" />
            </linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}
export default EllipseIcon;
