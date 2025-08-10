import React from 'react';
import { Box } from '@mui/material';

import Typography from '@/components/atoms/typography';
import DragUpload from '@/components/molecules/upload/dragupload';
import UploadIconNew from '@/components/atoms/icons/uploadIconNew';

import styles from './imageUpload.module.css';
import { useTranslations } from 'next-intl';
import { urlsKey } from '@/keys/firestoreKeys';
import { useUserStore } from '@/store/reducers/usersReducer';

export default function ImageUpload({ images, setImages, viewImages, setViewImages, handleUpdate }: any) {
  const t = useTranslations('profile');
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const [uid] = [currentUser?.uid];
  const handleDeleteImage = async (key: number, type: string) => {
    if (type === 'Image') {
      setImages((prevImages: any) => prevImages?.filter((item: any, index: number) => index !== key));
    } else {
      const newImagesSet = viewImages.filter((item: any, index: number) => index !== key);
      const updateData: Record<string, any> = {};
      updateData[urlsKey] = newImagesSet;
      await handleUpdate(
        {
          ...updateData,
        },
        uid
      );
      setViewImages(newImagesSet);
    }
  };
  return (
    <Box className={styles.servicesContainer}>
      <Typography variant="body2" className={styles.uploadPhotos}>
        {t('mediaUploadStep.uploadPhotosLimit')}
      </Typography>
      <DragUpload
        images={images}
        // setImage={setImage}
        setImages={setImages}
        fromSteps={true}
        multiple={true}
        isImageViewAuto={false}
        viewImages={viewImages}
        handleDelete={handleDeleteImage}
        maxLimit={6}
        setViewImages={setViewImages}
        icon={<UploadIconNew />}
      />
    </Box>
  );
}
