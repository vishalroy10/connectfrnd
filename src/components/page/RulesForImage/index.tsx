import Typography from '@/components/atoms/typography';
import { Box } from '@mui/material';
import styles from '../OnboardingSteps/onboarding.module.css';
import Grid from '@mui/material/Grid';
import Header from '@/components/organisms/header/pageBannerHeader';
import ExcellentTrueIcon from '@/components/atoms/icons/excellentTrueIcon';
import ModerateIcon from '@/components/atoms/icons/moderateIcon';
import PoorIcon from '@/components/atoms/icons/poorIcon';
import Image from 'next/image';

const data = [
  {
    work: 'Excellent',
    description: 'Clean background, well-defined facial feature and show body type. This is a great portrait.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FrulesForImage1.png?alt=media&token=89f7c628-e8cb-4b7d-8fc7-9e4bcb6731fb',
  },
  {
    work: 'Good',
    description: 'Feels natural, but facial features are partially obstructed, and the background is a little messy.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FrulesForImage2.png?alt=media&token=6422c757-6b6e-4451-aa8e-326c10bda446',
  },
  {
    work: 'Moderate',
    description: 'Too much filter and obstruction on the face. Horrible filter and blurry effects.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FrulesForImage3.png?alt=media&token=d18cf3da-3eee-4248-b6fc-70a612f1dbaf',
  },
  {
    work: 'Poor',
    description: 'Does not contain real person, look like a shady profile and does not proof your identity.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2FrulesForImage4.png?alt=media&token=5a8b40a0-5434-4a87-87d3-b3b043468864',
  },
];

const ReadAttireRules = () => {
  return (
    <>
      <Header title={'Rules for images and content'} />
      <Box className={styles.rulesBoxContainer}>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography variant="body1">
            RentBabe is dedicated to creating a platform for users to rent a date, rent a friend purely for social
            purposes only. To reach this goal, please observe our <b>Multimedia Policy</b> when uploading images to your
            profile. You can read the full policy here RentBabe Attire Policy. These policies apply to all genders.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h3" className={styles.imageHeader}>
            Images criteria
          </Typography>
          <Typography variant="body1" className={styles.imageListContent}>
            1. The general quality of the image, and its resolution
          </Typography>
          <Typography variant="body1" className={styles.imageListContent}>
            2. What is in the background, messy or clean
          </Typography>
          <Typography variant="body1" className={styles.imageListContent}>
            3. The lighting of the image
          </Typography>
          <Typography variant="body1" className={styles.imageListContent}>
            4. whether if all facial features are clearly defined
          </Typography>
          <Typography variant="body1" className={styles.imageListContent}>
            5. At least one full body photo of you to show your body type, if you are tall, slim, short.
          </Typography>
        </Box>
        <Box className={styles.imageBoxContainer}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
            {data.map((item, index) => (
              <Grid item xs={2} sm={3} md={3} key={index} className={styles.detailsBox}>
                <Image alt="" loading="lazy" src={item?.image || ''} style={{ width: '100%' }} />
                <Box sx={{ marginTop: '12px' }}>
                  <Typography variant="h5" sx={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    {item?.work === 'Excellent' || item?.work === 'Good' ? (
                      <ExcellentTrueIcon />
                    ) : item?.work === 'Moderate' ? (
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
          <Typography variant="h4">
            Stay true and authentic! Dont worry, looks are perspective. Coming out with these guidelines show that we
            are transparent with our services.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ReadAttireRules;
