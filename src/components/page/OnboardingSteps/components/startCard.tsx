import React from 'react';
import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import LogoIcon from '@/components/atoms/icons/logo';
import HighIncomeIcon from '@/components/atoms/icons/high-income';
import ExpandNetworkIcon from '@/components/atoms/icons/expand-network';
import FlexibleTimingIcon from '@/components/atoms/icons/flexible-timing';
import EllipseIcon from '@/components/atoms/icons/ellipse-icon';
import BenefitsCard from '@/components/molecules/card/onboarding/benefits';
import ApplicationStatusCard from '@/components/molecules/card/onboarding/applicationStatus';
import UseOnboardingHook from '../useOnboardingHook';
import { OnboardingType } from '../OnboardingContext';
import Image from 'next/image';

const ELIGIBILITY_CRITERIA = [
  '18 years old or above',
  'Able to provide services in at least 1 category in RentBabe',
  'Enthusiastic, good at communication, non-toxic and do not conduct NSFW (not safe for work) services',
];

const StartCard = () => {
  const { isTablet, isMobile, requestStatus, t, applyFormLoading, handleApplyForm }: OnboardingType =
    UseOnboardingHook();

  return (
    <Box paddingX={'1rem'} bgcolor="#fff8e8" pb={'5rem'} display="flex" justifyContent={'center'} width="100%">
      <Box
        display="grid"
        width={isTablet ? '100%' : '80%'}
        gridAutoColumns={isTablet ? '1fr' : '1fr 1fr'}
        paddingTop={isMobile ? '1rem' : isTablet ? '5rem' : '3rem'}
        zIndex={0}
      >
        <Box
          position={'relative'}
          display="flex"
          flexDirection="row"
          margin={'auto'}
          gap="80px"
          justifyContent={'center'}
          alignItems={'center'}
          width={'100%'}
        >
          <EllipseIcon />

          <Box
            zIndex={9999}
            borderRadius="24px"
            bgcolor="#fff"
            width={'100%'}
            maxWidth={isTablet ? '604px' : '420px'}
            padding={
              isMobile ? '24px 16px 24px 16px' : isTablet === true ? '66px 32px 66px 32px' : '32px 32px 36px 32px'
            }
            boxShadow="0px 0px 10px rgba(0,0,0,0.1)"
          >
            <Box display="flex" gap="24px" flexDirection="column">
              <Box gap="4px">
                <Typography variant="h1" fontWeight="700">
                  {t('startCard.beAbabe')}
                </Typography>
                <Typography variant="h4" fontWeight="500" color="#1a1a1a">
                  {t('startCard.startCardDescription')}
                </Typography>
              </Box>
              {requestStatus !== 'in-review' && (
                <Button
                  loading={applyFormLoading}
                  variant="contained"
                  sx={{ height: '48px', width: '240px' }}
                  onClick={handleApplyForm}
                >
                  <Typography variant="h5" fontWeight="700" color="#fff">
                    {t('startCard.applyFree')}
                  </Typography>
                </Button>
              )}
              <ApplicationStatusCard status={requestStatus} />
            </Box>

            <Box mt="40px" display="flex" flexDirection="column" gap="20px">
              <Box display="flex" flexDirection="column" borderBottom="1px solid #cccccc" padding="0px 0px 24px 0px">
                <Box
                  display="flex"
                  flexDirection="row"
                  gap="8px"
                  pb="6px"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <LogoIcon size={24} />
                  <Typography variant="subtitle2">{t('startCard.rentBabeMember')}</Typography>
                </Box>
                <Typography variant="body2" color="#646464">
                  {t('startCard.rentMemberDescription')}
                </Typography>
              </Box>
              <BenefitsCard
                title="High income"
                description="Earn more than 5000 Credits per month for making friends and gaming."
                icon={HighIncomeIcon}
              />
              <BenefitsCard
                title="Flexible timing"
                description="You are  your own boss. Anytime. Anywhere."
                icon={FlexibleTimingIcon}
              />
              <BenefitsCard
                title="Expand network"
                description=" Get to know individuals or gamers from all over the world."
                icon={ExpandNetworkIcon}
              />
              <Box display="flex" flexDirection="column" gap="4px">
                <Typography variant="subtitle2">Who is eligible?</Typography>
                <ol style={{ gap: '4px', margin: 0, paddingInlineStart: '20px' }}>
                  {ELIGIBILITY_CRITERIA.map((title, index) => (
                    <li key={index} style={{ color: '#646464', fontSize: '14px', fontWeight: '400' }}>
                      <Typography variant="body2" color="#646464">
                        {title}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </Box>
            </Box>
          </Box>
          {!isTablet && (
            <Box height={'100%'}>
              <Image
                src={
                  'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fapply-banner.png?alt=media&token=6af18017-874d-4b78-9ab0-e57a8d1149ff'
                }
                width={550}
                alt="apply banner"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StartCard;
