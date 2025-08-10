import React from 'react';
import { Box } from '@mui/material';

import Typography from '@/components/atoms/typography';
import DragVideoUpload from '@/components/molecules/upload/dragVideoupload';

import styles from './videoUpload.module.css';
import { useTranslations } from 'next-intl';
import { cacheVideoUrlsKey } from '@/keys/firestoreKeys';
import { useUserStore } from '@/store/reducers/usersReducer';

export default function VideoUpload({ viewVideoImages, setViewVideoImages, setVideoImages, videoImages, handleUpdate }: any) {
  const t = useTranslations('profile');
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const [uid] = [currentUser?.uid];
  const handleDeleteVideo = async (key: any, type: string) => {
    if (type === 'Image') {
      setVideoImages((pre: any) => pre?.filter((item: any, index: any) => index !== key));
    } else {
      const newImagesSet = viewVideoImages.filter((item: any, index: any) => index !== key);
      const updateData: Record<string, any> = {};
      updateData[cacheVideoUrlsKey] = newImagesSet;
      await handleUpdate(
        {
          ...updateData,
        },
        uid
      );
      setViewVideoImages(newImagesSet);
    }
  };
  return (
    <Box className={styles.servicesContainer}>
      <Typography variant="body2" className={styles.uploadVideos}>
        {t('mediaUploadStep.uploadVideosLimit')}
      </Typography>
      <DragVideoUpload
        viewVideoImages={viewVideoImages}
        handleDelete={handleDeleteVideo}
        setVideoImages={setVideoImages}
        videoImages={videoImages}
        maxLimit={2}
      />
    </Box>
  );
}
