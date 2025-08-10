import React from 'react';
import { Box, Snackbar, Typography, useMediaQuery } from '@mui/material';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import CropLandscapeOutlinedIcon from '@mui/icons-material/CropLandscapeOutlined';
import Lottie from 'lottie-react';

import Button from '@/components/atoms/button';
import PlayIconWithBackground from '@/components/atoms/icons/playIconWithBackground';
import StopIcon from '@/components/atoms/icons/stopIcon';
import DeleteIcon from '@/components/atoms/icons/deleteIcon';

import wave from './multipleAudioAnimation.json';
import styles from './audioRecording.module.css';
import { DateHelper } from '@/utility/dateHelper';
import { useTranslations } from 'next-intl';
import useAudioRecording from './useAudioRecording';

export default function AudioRecording({
  audioURL,
  voiceDetails,
  setAudioURL,
  setVoiceDetails,
  viewOnly = false,
}: any) {
  const t = useTranslations('profile');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const {
    totalSecondsRef,
    isRecording,
    handleStopRecording,
    handleStartRecording,
    setIsRecording,
    isPlaying,
    handlePlay,
    totalSeconds,
    currentAudioValue,
    handleReset,
    microphoneError,
    requireMicroPhone,
    handleClose,
  } = useAudioRecording({ audioURL, voiceDetails, setAudioURL, setVoiceDetails });
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={requireMicroPhone}
        onClose={handleClose}
        message={microphoneError}
      />
      <audio id="recorder-audio" preload="auto">
        <source type="audio/ogg" />
        <source type="audio/mpeg" />
        <source type="audio/webm" />
        <source type="audio/wav" />
      </audio>
      <Box className="actions">
        {!audioURL && !viewOnly ? (
          <>
            <Box className={styles.recordingBox}>
              <Typography className={styles.recordIcon}>{DateHelper.formatTime(totalSecondsRef.current)}</Typography>
              <Box className={styles.nextButton}>
                {isRecording ? (
                  <Button
                    className={
                      totalSecondsRef.current >= 5
                        ? styles.stopRecordingBoxButton
                        : styles.disableStopRecordingBoxButton
                    }
                    onClick={() => {
                      handleStopRecording();
                      // setDisableNextBtn(false);
                    }}
                    disabled={totalSecondsRef.current >= 5 ? false : true}
                    variant="contained"
                  >
                    <CropLandscapeOutlinedIcon />
                    <Typography variant="subtitle1">{t('voiceUploadStep.stopRecord')}</Typography>
                  </Button>
                ) : (
                  <Button
                    className={styles.recordingBoxButton}
                    onClick={() => {
                      handleStartRecording();
                      setIsRecording(true);
                      // setDisableNextBtn(true);
                    }}
                  >
                    <KeyboardVoiceOutlinedIcon />
                    <Typography variant="subtitle1">{t('voiceUploadStep.record')}</Typography>
                  </Button>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Box className={viewOnly ? styles.recorderPlayer : styles.recordBox}>
            {!isPlaying ? (
              <Box sx={{ cursor: 'pointer', display: 'flex', alignItem: 'center' }} onClick={handlePlay}>
                <PlayIconWithBackground />
              </Box>
            ) : (
              <Box
                style={{
                  cursor: 'pointer',
                  background: '#000',
                  padding: '9.5px',
                  borderRadius: '50%',
                  alignItems: 'center',
                  display: 'flex',
                  marginBottom: '3px',
                }}
                onClick={handlePlay}
              >
                <StopIcon />
              </Box>
            )}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '48px',
                background: 'var(--Primary, linear-gradient(77deg, #FFED34 11.3%, #FFD144 86.76%))',
                padding: '10px 16px',
                borderRadius: '100px',
              }}
            >
              <Typography sx={{ display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                {DateHelper.formatTime(
                  totalSeconds && totalSeconds + currentAudioValue > 0 ? totalSeconds + currentAudioValue : '0'
                )}
              </Typography>
              <Box style={!isMobile ? { width: '210px' } : { width: 'fit-content' }} className={styles.audioBox}>
                <Lottie style={{ marginLeft: 8 }} animationData={wave} loop={isPlaying} autoplay={isPlaying} />{' '}
              </Box>
            </Box>

            {!viewOnly && (
              <Box
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={handleReset}
              >
                <DeleteIcon />
              </Box>
            )}
          </Box>
        )}
      </Box>
      {!viewOnly && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
          <Typography variant="caption" className="place-holder">
            {t('voiceUploadStep.voiceLength')}
          </Typography>
        </Box>
      )}
    </>
  );
}
