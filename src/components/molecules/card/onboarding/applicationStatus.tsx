import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import { useTranslations } from 'next-intl';
import React from 'react';

interface IApplicationStatusCard {
  status?: string;
}

const ApplicationStatusCard = ({ status }: IApplicationStatusCard) => {
  const t = useTranslations('profile');

  if (!status) {
    return null;
  }

  return (
    <Box bgcolor={status === 'in-review' ? '#f0f0f0' : '#fdf1f1'} borderRadius="12px" padding="8px 12px 8px 12px">
      <Typography variant="subtitle1" color={status === 'in-review' ? '#1a1a1a' : '#e32d2d'}>
        {status === 'in-review' ? t('startCard.inReviewText') : t('startCard.inApplicationText')}
      </Typography>
      <Typography variant="body2" color="#646464">
        {t('startCard.reviewDesc')}
      </Typography>
    </Box>
  );
};

export default ApplicationStatusCard;
