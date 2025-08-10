'use client';
import { useTranslations } from 'next-intl';

const UseGamingRulesHook = () => {
  const t = useTranslations('gameRules');

  const gameRules = [
    {
      description: t('gameRule1'),
    },
    {
      description: t('gameRule2'),
    },
    {
      description: t('gameRule3'),
    },
    {
      description: t('gameRule4'),
    },
  ];

  const gameCards = [
    {
      description: t('cardDescription1'),
      value: 'excellent',
      image:
        'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FgameRuleCard1.png?alt=media&token=bfc717e2-5080-402e-98ee-24d09e59e541',
    },
    {
      description: t('cardDescription2'),
      value: 'poor',
      image:
        'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FgameRuleCard2.png?alt=media&token=e91c8a72-2aed-4f2c-9a67-66d311701c2d',
    },
    {
      description: t('cardDescription3'),
      value: 'poor',
      image:
        'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FgameRuleCard3.png?alt=media&token=04b20983-ecdf-4ce3-8864-ae8712d7d18b',
    },
    {
      description: t('cardDescription4'),
      value: 'poor',
      image:
        'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FgameRuleCard4.png?alt=media&token=4a612d73-a792-4ce5-b948-b161e35a1a55',
    },
  ];

  return {
    gameRules,
    gameCards,
    t,
  };
};

export default UseGamingRulesHook;
