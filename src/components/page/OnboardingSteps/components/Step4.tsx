import React from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/atoms/button';
import LeftArrowIcon from '@/components/atoms/icons/left-arrow';
import LoadingIcon from '@/components/atoms/icons/loading';

import styles from '../onboarding.module.css';
import UseOnboardingHook from '../useOnboardingHook';
import Link from 'next/link';
import { OnboardingType } from '../OnboardingContext';
import AudioRecording from '@/components/molecules/audioRecording';

const MyRecorder = () => {
  const {
    handlePrevious,
    handleNext,
    setVoiceDetails,
    voiceDetails,
    setAudioURL,
    audioURL,
    loading,
    t,
    loadingDataLoader,
  }: OnboardingType = UseOnboardingHook();

  if (loading)
    return (
      <Box className={styles.loader}>
        <LoadingIcon />
      </Box>
    );

  return (
    <>
      <Box className="audio-recorder">
        <Box className={styles.container}>
          <Box className={styles.flexContainer} onClick={handlePrevious}>
            <Box className={styles.iconBox}>
              <LeftArrowIcon />
            </Box>
            <Box className={styles.textBox}>
              <Typography variant="subtitle2">{t('servicesCard.back')}</Typography>
            </Box>
          </Box>

          <Box>
            <Box sx={{ margin: '40px 0' }}>
              <Typography variant="h2" className={styles.centerText}>
                {t('voiceUploadStep.voiceHeader')}
              </Typography>
              <Link href="onboarding-rules/voiceRules" target="_blank">
                <Typography
                  variant="subtitle2"
                  sx={{
                    textAlign: 'center',
                    padding: '6px 0',
                    marginTop: '8px',
                    textDecorationLine: 'underline',
                    color: '#000',
                  }}
                >
                  {t('voiceUploadStep.voiceRules')}
                </Typography>
              </Link>
            </Box>
            <AudioRecording
              audioURL={audioURL}
              setAudioURL={setAudioURL}
              voiceDetails={voiceDetails}
              setVoiceDetails={setVoiceDetails}
            />
          </Box>
        </Box>

        <Box>
          <Button
            loading={loadingDataLoader}
            disabled={voiceDetails?.next ? false : true}
            className={styles.submitButtonContainer}
            onClick={handleNext}
            variant="contained"
          >
            <Typography variant="subtitle1">{t('servicesCard.next')}</Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MyRecorder;
