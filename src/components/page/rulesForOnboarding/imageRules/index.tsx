'use client';
import Typography from '@/components/atoms/typography';
import { Box } from '@mui/material';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import Grid from '@mui/material/Grid';
import Header from '@/components/organisms/header/pageBannerHeader';
import ExcellentTrueIcon from '@/components/atoms/icons/excellentTrueIcon';
import ModerateIcon from '@/components/atoms/icons/moderateIcon';
import PoorIcon from '@/components/atoms/icons/poorIcon';
import useImageRulesHook from './useImageRulesHook';
import Image from 'next/image';

const ImageRules = () => {
  const { imageCriteria, data, t } = useImageRulesHook();
  const imageDescription = t('description')?.replace('Multimedia Policy', `<strong> Multimedia Policy </strong>`);
  return (
    <>
      <Header title={t('pageHeader')} />
      <Box className={styles.rulesBoxContainer}>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: imageDescription }} />
        </Box>
        <Box>
          <Typography variant="h3" className={styles.imageHeader}>
            {t('imagesCriteria')}
          </Typography>
          {imageCriteria.map((item, index) => (
            <>
              <Typography key={index} variant="body1" className={styles.imageListContent}>
                {item.title}
              </Typography>
            </>
          ))}
        </Box>
        <br />
        <Box className={styles.imageBoxContainer}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
            {data.map((item, index) => (
              <Grid item xs={2} sm={3} md={3} key={index} className={styles.detailsBox}>
                <Image alt="" loading="lazy" src={item?.image || ''} style={{ width: '100%' }} />
                <Box sx={{ marginTop: '12px' }}>
                  <Typography variant="h5" sx={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    {item?.type === 'Excellent' || item?.type === 'Good' ? (
                      <ExcellentTrueIcon />
                    ) : item?.type === 'Moderate' ? (
                      <ModerateIcon />
                    ) : (
                      <PoorIcon />
                    )}
                    &nbsp; {item?.work}
                  </Typography>
                  <Typography variant="body2" className={styles.GridContent}>
                    {item?.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ padding: '24px 0' }}>
          <Typography variant="h4">{t('footerDescription')}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ImageRules;
