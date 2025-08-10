import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import React, { memo } from 'react';
import GamesCard from '@/components/molecules/card/gamesCard';
import { Grid } from '@mui/material';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import { gamesServices } from '@/common/utils/data';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { IGameService } from '@/components/page/BabeProfileSetting/components/interface';

interface gamesServicesProps {
  uid: string | null | undefined;
  btnDisable: boolean;
  gamesService: IGameService[];
  setGamesService: React.Dispatch<React.SetStateAction<IGameService[]>>;
  setBtnDisable: (arg: boolean) => void;
}

const Games = ({ gamesService, setGamesService, uid, btnDisable, setBtnDisable }: gamesServicesProps) => {
  const t = useTranslations('profile');

  return (
    <>
      <Link href="onboarding-rules/gameRules" target="_blank">
        <Typography variant="subtitle2" sx={{ marginTop: '14px', textDecorationLine: 'underline', color: '#000' }}>
          {t('servicesCard.gamingProfileGuideline')}
        </Typography>
      </Link>
      <Box className={styles.infoBox} sx={{ marginLeft: '0px', width: 'fit-content' }}>
        <Typography variant="body2" className={styles.infoText} sx={{ padding: '0px' }}>
          {t('servicesCard.virtualCurrency')} &nbsp;
          {t('servicesCard.creditSGD')}
        </Typography>
      </Box>
      <Box className={styles.servicesContainer}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {gamesServices.map((item, key) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={key} className={styles.cardGrid}>
                <GamesCard
                  currentValue={gamesService?.find((i: IGameService) => i?.id == item?.id)}
                  item={item}
                  setGamesService={setGamesService}
                  gamesService={gamesService}
                  uid={uid}
                  btnDisable={btnDisable}
                  setBtnDisable={setBtnDisable}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default memo(Games);
