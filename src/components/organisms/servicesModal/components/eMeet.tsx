import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import React, { memo } from 'react';
import { Grid } from '@mui/material';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import { EmeetServices } from '@/common/utils/data';
import EMeetCard from '@/components/molecules/card/emeetCard';
import { useTranslations } from 'next-intl';
import { IEMeetService } from '@/components/page/BabeProfileSetting/components/interface';

interface eMeetServicesProps {
  EMeetService: IEMeetService[];
  setEMeetService: React.Dispatch<React.SetStateAction<IEMeetService[]>>;
  uid: string | null | undefined;
  btnDisable: boolean;
}

const EMeet = ({ EMeetService, setEMeetService, uid, btnDisable }: eMeetServicesProps) => {
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
          {EmeetServices.map((item, key) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={key} className={styles.cardGrid}>
                <EMeetCard
                  item={item}
                  currentValue={EMeetService?.find((i: IEMeetService) => i?.id == item?.id)}
                  EMeetService={EMeetService}
                  setEMeetService={setEMeetService}
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

export default memo(EMeet);
