import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import React, { memo } from 'react';
import { Grid } from '@mui/material';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import { sportServicesData } from '@/common/utils/data';
import SportCard from '@/components/molecules/card/sportCard';
import { useTranslations } from 'next-intl';
import { IMeetUpService, ISportService } from '@/components/page/BabeProfileSetting/components/interface';

interface sportsServicesProps {
  sportServices: ISportService[];
  setSportServices: React.Dispatch<React.SetStateAction<IMeetUpService[]>>; // Adjust the type according to what setService actually does;
  uid: string | null | undefined;
  btnDisable: boolean;
}

const Sports = ({ sportServices, setSportServices, uid, btnDisable }: sportsServicesProps) => {
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
          {sportServicesData.map((item, key) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={key} className={styles.cardGrid}>
                <SportCard
                  currentValue={sportServices?.find((i: ISportService) => i?.id == item?.id)}
                  item={item}
                  sportServices={sportServices}
                  setSportServices={setSportServices}
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

export default memo(Sports);
