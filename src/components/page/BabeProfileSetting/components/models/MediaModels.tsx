'use client';
import React from 'react';
import { Typography } from '@mui/material';
import styles from '../../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import { BabeProfileSettingType } from '../../BabeProfileSettingContext';
import UseBabeProfileSettingHook from '../../useBabeProfileSettingHook';
import SimpleDialog from '@/components/atoms/modal';
import AudioRecording from '@/components/molecules/audioRecording';
import VideoUpload from '@/components/molecules/VideoUpload';
import ImageUpload from '@/components/molecules/ImageUpload';

export const UploadPhoto = ({ isUploadPhoto, setIsUplaodPhoto }: any) => {
  const handleModalClose = () => {
    setIsUplaodPhoto(false);
  };
  const {
    loadingDataLoader,
    setViewImages,
    setImages,
    images,
    t,
    viewImages,
    savePhotos,
    handleUpdate,
  }: BabeProfileSettingType = UseBabeProfileSettingHook();

  const updatePhotos = async () => {
    await savePhotos();
    handleModalClose();
  };
  return (
    <>
      <SimpleDialog
        footer={
          <>
            <Button onClick={handleModalClose} className={styles.footerCancelButton}>
              <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
            </Button>
            <Button
              onClick={() => updatePhotos()}
              variant="contained"
              className={styles.footerDoneButton}
              loading={loadingDataLoader}
            >
              <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
            </Button>
          </>
        }
        open={isUploadPhoto}
        title=""
        modelWidth="1200px"
        isDeleteModel={true}
        borderRadius={24}
      >
        <Typography variant="h3" mb={2}>
          Upload Photos
        </Typography>
        <ImageUpload
          images={images}
          setImages={setImages}
          viewImages={viewImages}
          setViewImages={setViewImages}
          handleUpdate={handleUpdate}
        />
      </SimpleDialog>
    </>
  );
};

export const UploadVideo = ({ isUploadVideo, setIsUplaodVideo }: any) => {
  const {
    loadingDataLoader,
    setViewVideoImages,
    setVideoImages,
    t,
    viewVideoImages,
    videoImages,
    saveVideos,
    handleUpdate,
  }: BabeProfileSettingType = UseBabeProfileSettingHook();

  const handleModalClose = () => {
    setIsUplaodVideo(false);
  };
  const updateVideos = async () => {
    await saveVideos();
    handleModalClose();
  };
  return (
    <>
      <SimpleDialog
        footer={
          <>
            <Button onClick={handleModalClose} className={styles.footerCancelButton}>
              <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
            </Button>
            <Button
              onClick={() => updateVideos()}
              variant="contained"
              className={styles.footerDoneButton}
              loading={loadingDataLoader}
            >
              <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
            </Button>
          </>
        }
        open={isUploadVideo}
        title=""
        modelWidth="1200px"
        isDeleteModel={true}
        borderRadius={24}
      >
        <Typography variant="h3" mb={2}>
          Upload Videos
        </Typography>
        <VideoUpload
          viewVideoImages={viewVideoImages}
          setViewVideoImages={setViewVideoImages}
          setVideoImages={setVideoImages}
          videoImages={videoImages}
          handleUpdate={handleUpdate}
        />
      </SimpleDialog>
    </>
  );
};

export const VoiceRecording = ({ isVoiceRecording, setIsVoiceRecording }: any) => {
  const {
    loadingDataLoader,
    t,
    audioURL,
    setAudioURL,
    voiceDetails,
    setVoiceDetails,
    saveVoiceRecording,
  }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const handleModalClose = () => {
    setIsVoiceRecording(false);
  };

  const updateVoice = async () => {
    await saveVoiceRecording();
    handleModalClose();
  };
  return (
    <>
      <SimpleDialog
        footer={
          <>
            <Button onClick={handleModalClose} className={styles.footerCancelButton}>
              <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
            </Button>
            <Button
              onClick={() => updateVoice()}
              variant="contained"
              className={styles.footerDoneButton}
              loading={loadingDataLoader}
              disabled={voiceDetails?.next ? false : true}
            >
              <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
            </Button>
          </>
        }
        open={isVoiceRecording}
        title=""
        modelWidth="1200px"
        isDeleteModel={true}
        borderRadius={24}
      >
        <Typography variant="h3" mb={2}>
          Voice Recording
        </Typography>
        <AudioRecording
          audioURL={audioURL}
          setAudioURL={setAudioURL}
          voiceDetails={voiceDetails}
          setVoiceDetails={setVoiceDetails}
        />
      </SimpleDialog>
    </>
  );
};
