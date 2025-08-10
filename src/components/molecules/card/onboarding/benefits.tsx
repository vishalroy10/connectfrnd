import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import React from 'react';

interface IBenefitsCard {
  title: string;
  description: string;
  icon: any;
}

const BenefitsCard = ({ title, description, ...props }: IBenefitsCard) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      borderBottom="1px solid #cccccc"
      padding="0px 0px 24px 0px"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="18px"
        height="36px"
        width="36px"
        bgcolor="#f0f0f0"
      >
        <props.icon size={24} />
      </Box>
      <Box display="flex" flexDirection="column" width="85%">
        <Typography variant="subtitle1" color="#1a1a1a">
          {title}
        </Typography>
        <Typography variant="body2" color="#646464">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default BenefitsCard;
