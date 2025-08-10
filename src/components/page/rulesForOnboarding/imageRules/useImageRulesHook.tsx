'use client';
import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';

const useImageRulesHook = () => {
  const t = useTranslations('imageRules');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const data = [
    {
      work: t('cardTitle1'),
      type: 'Excellent',
      description: t('cardDescription1'),
      image:
        'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FrulesForImage1.png?alt=media&token=89f7c628-e8cb-4b7d-8fc7-9e4bcb6731fb',
    },
    {
      work: t('cardTitle2'),
      type: 'Good',
      description: t('cardDescription2'),
      image:
        'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FrulesForImage2.png?alt=media&token=6422c757-6b6e-4451-aa8e-326c10bda446',
    },
    {
      work: t('cardTitle3'),
      type: 'Moderate',
      description: t('cardDescription3'),
      image:
        'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FrulesForImage3.png?alt=media&token=d18cf3da-3eee-4248-b6fc-70a612f1dbaf',
    },
    {
      work: t('cardTitle4'),
      type: 'Poor',
      description: t('cardDescription4'),
      image:
        'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FrulesForImage4.png?alt=media&token=5a8b40a0-5434-4a87-87d3-b3b043468864',
    },
  ];

  const imageCriteria = [
    {
      title: t('criteria1'),
    },
    {
      title: t('criteria2'),
    },
    {
      title: t('criteria3'),
    },
    {
      title: t('criteria4'),
    },
    {
      title: t('criteria5'),
    },
  ];

  return {
    data,
    imageCriteria,
    t,
    isMobile,
  };
};

export default useImageRulesHook;
