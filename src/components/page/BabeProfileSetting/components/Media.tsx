import React, { memo, useState } from 'react';
import { Box, Link } from '@mui/material';

import Typography from '@/components/atoms/typography';
import LoadingIcon from '@/components/atoms/icons/loading';
import Button from '@/components/atoms/button';
import { ViewImagesCard } from '@/components/molecules/upload/dragupload';
import { ViewVideoCard } from '@/components/molecules/upload/dragVideoupload';

import styles from '../babeProfileSetting.module.css';
import UseBabeProfileSettingHook from '../useBabeProfileSettingHook';
import { BabeProfileSettingType } from '../BabeProfileSettingContext';
import AudioRecording from '@/components/molecules/audioRecording';
import BackButton from './BackButton';
import { UploadPhoto, UploadVideo, VoiceRecording } from './models/MediaModels';

const Media = () => {
  const {
    t,
    loading,
    viewImages,
    viewVideoImages,
    audioURL,
    setAudioURL,
    voiceDetails,
    setVoiceDetails,
  }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const [isUploadPhoto, setIsUplaodPhoto] = useState(false);
  const [isUploadVideo, setIsUplaodVideo] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  if (loading)
    return (
      <Box className={styles.loader}>
        <LoadingIcon />
      </Box>
    );

  return (
    <>
      <Box className={styles.container}>
        <BackButton title="Media" />
        <Box className={styles.formCard}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Box mb={2} className={styles.cardHeading}>
                Photos (6 photos min)
              </Box>
              <Link href="onboarding-rules/imageRules" target="_blank">
                <Typography variant="h5" mb={2}>
                  {t('mediaUploadStep.readAttireRules')}
                </Typography>
              </Link>
            </Box>
            <Button
              sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
              onClick={() => setIsUplaodPhoto(true)}
            >
              Edit
            </Button>
          </Box>
          <ViewImagesCard viewImages={viewImages} />
        </Box>
        <Box className={styles.formCard}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box mb={2} className={styles.cardHeading}>
              Videos (2 videos max)
            </Box>
            <Button
              sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
              onClick={() => setIsUplaodVideo(true)}
            >
              Edit
            </Button>
          </Box>
          <ViewVideoCard viewVideoImages={viewVideoImages} />
        </Box>
        <Box className={styles.formCard}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Box mb={2} className={styles.cardHeading}>
                Voice recording
              </Box>
              <Link href="onboarding-rules/voiceRules" target="_blank">
                <Typography variant="h5" mb={2}>
                  {t('voiceUploadStep.voiceRules')}
                </Typography>
              </Link>
            </Box>
            <Button
              sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
              onClick={() => setIsVoiceRecording(true)}
            >
              Edit
            </Button>
          </Box>
          <AudioRecording
            audioURL={audioURL}
            setAudioURL={setAudioURL}
            voiceDetails={voiceDetails}
            setVoiceDetails={setVoiceDetails}
            viewOnly={true}
          />
        </Box>
      </Box>
      <UploadPhoto isUploadPhoto={isUploadPhoto} setIsUplaodPhoto={setIsUplaodPhoto} />
      <UploadVideo isUploadVideo={isUploadVideo} setIsUplaodVideo={setIsUplaodVideo} />
      <VoiceRecording isVoiceRecording={isVoiceRecording} setIsVoiceRecording={setIsVoiceRecording} />
    </>
  );
};

export default memo(Media);
