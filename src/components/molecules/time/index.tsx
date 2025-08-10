import Typography from '@/components/atoms/typography';
import React from 'react';

interface ITime {
  hasSlider?: boolean;
  from: string;
  to: string;
  size?: string;
}

const Time = ({ hasSlider, from, to, size }: ITime) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const [fromTime, fromValue] = from?.split(' ');
  // eslint-disable-next-line no-unsafe-optional-chaining
  const [toTime, toValue] = to?.split(' ');

  return (
    <Typography variant="h4" component="span" fontSize={size === 'small' ? 16 : 20} display={'flex'} gap={3}>
      <span style={{ whiteSpace: hasSlider ? 'nowrap' : undefined }}>
        {fromTime}{' '}
        <span
          style={{
            fontSize: '14px',
            color: '#646464',
            fontWeight: 400,
          }}
        >
          {fromValue}
        </span>
      </span>
      <span>-</span>
      <span style={{ whiteSpace: hasSlider ? 'nowrap' : undefined }}>
        {toTime}{' '}
        <span
          style={{
            fontSize: '14px',
            color: '#646464',
            fontWeight: 400,
          }}
        >
          {toValue}
        </span>
      </span>
    </Typography>
  );
};

export default Time;
