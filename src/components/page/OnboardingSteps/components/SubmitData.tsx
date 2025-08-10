import Box from '@/components/atoms/box';
import SubmitIcon from '@/components/atoms/icons/submitIcon';
import Typography from '@/components/atoms/typography';
import { useTranslations } from 'next-intl';
import React from 'react';

const SubmitData = () => {
  const t = useTranslations('profile');

  return (
    <>
      <Box sx={{ maxWidth: '448px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <SubmitIcon />
          <Typography variant="h3" sx={{ margin: '16px 0' }}>
            {t('userDetailsStep.applicationSubmitText')}
          </Typography>
          <Typography variant="body1">{t('userDetailsStep.applicationSubmitDescription')}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default SubmitData;
