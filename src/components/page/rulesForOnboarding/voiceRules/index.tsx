'use client';
import React from 'react';
import Typography from '@/components/atoms/typography';
import { Box } from '@mui/material';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import Header from '@/components/organisms/header/pageBannerHeader';
import UseVoiceRulesHook from '@/components/page/rulesForOnboarding/voiceRules/useVoiceRulesHook';
import Lottie from 'lottie-react';
import singleAudioAnimation from './singleAudioAnimation.json';

const VoiceRules = () => {
  const { audioCriterias, voiceHints, t, isMobile, isPlaying, handlePlay } = UseVoiceRulesHook();
  const voiceDescription = t('description')?.replace('Multimedia Policy', `<strong> Multimedia Policy </strong>`);

  return (
    <>
      <audio id="recorder-audio" preload="auto">
        <source type="audio/ogg" />
        <source type="audio/mpeg" />
        <source type="audio/webm" />
        <source type="audio/wav" />
      </audio>
      <Header title={t('pageHeader')} />
      <Box className={styles.rulesBoxContainer}>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: voiceDescription }} />
        </Box>
        <Box>
          <Typography variant="h3" className={styles.imageHeader}>
            {t('audioCriterias')}
          </Typography>
          {audioCriterias.map((item, index) => (
            <>
              <Typography key={index} variant="body1" className={styles.imageListContent}>
                {item.description}
              </Typography>
            </>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: isMobile ? '32px' : '48px' }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {t('playExample')}
          </Typography>
          <Box
            sx={{
              background: '#FFD443',
              width: '40px',
              height: '40px',
              borderRadius: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '9px',
            }}
          >
            <Lottie
              style={{ display: 'flex', alignItems: 'center' }}
              className={styles.voice_rules_animation}
              animationData={singleAudioAnimation}
              loop={isPlaying}
              autoplay={isPlaying}
              onClick={handlePlay}
            />{' '}
          </Box>
        </Box>
        <Box>
          <Typography variant="h3" className={styles.imageHeader}>
            {t('hints')}
          </Typography>
          {voiceHints.map((item, index) => (
            <>
              <Typography key={index} variant="body1" className={styles.imageListContent}>
                {item.description}
              </Typography>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default VoiceRules;
