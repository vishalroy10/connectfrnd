import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import React, { memo } from 'react';
import ServicesCard from '@/components/molecules/card/servicesCard';
import { Grid } from '@mui/material';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import { meetUpServices } from '@/common/utils/data';
import { useTranslations } from 'next-intl';
import { IMeetUpService } from '@/components/page/BabeProfileSetting/components/interface';

interface meetupServicesProps {
  service: IMeetUpService[];
  setService: React.Dispatch<React.SetStateAction<IMeetUpService[]>>;
  uid: string | null | undefined;
  btnDisable: boolean;
}

const Meetup = ({ service, setService, uid, btnDisable }: meetupServicesProps) => {
  const t = useTranslations('profile');
 
  return (
    <>
      <Box className={styles.infoBox} sx={{ marginLeft: '0px', width: 'fit-content' }}>
        <Typography variant="body2" className={styles.infoText} sx={{ padding: '0px' }}>
          {t('servicesCard.virtualCurrency')} &nbsp;
          {t('servicesCard.creditSGD')}
        </Typography>
      </Box>
      <Box className={styles.servicesContainer}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {meetUpServices.map((item: IMeetUpService, key: number) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={key} className={styles.cardGrid}>
                <ServicesCard
                  currentValue={service?.find((i: IMeetUpService) => i?.id === item?.id)}
                  item={item}
                  service={service}
                  setService={setService}
                  uid={uid}
                  btnDisable={btnDisable}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default memo(Meetup);
