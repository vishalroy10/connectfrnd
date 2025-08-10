import * as React from 'react';
import { ISvgIcon } from './types';

const LocationIcon = ({ size, color="white", ...props }: ISvgIcon) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
		<path
			d="M9.99967 10.8337C11.3804 10.8337 12.4997 9.71437 12.4997 8.33366C12.4997 6.95295 11.3804 5.83366 9.99967 5.83366C8.61896 5.83366 7.49967 6.95295 7.49967 8.33366C7.49967 9.71437 8.61896 10.8337 9.99967 10.8337Z"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M9.99967 18.3337C13.333 15.0003 16.6663 12.0156 16.6663 8.33366C16.6663 4.65176 13.6816 1.66699 9.99967 1.66699C6.31778 1.66699 3.33301 4.65176 3.33301 8.33366C3.33301 12.0156 6.66634 15.0003 9.99967 18.3337Z"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export default LocationIcon;
