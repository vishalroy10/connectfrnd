import React, { memo } from 'react';
import { Box, Link } from '@mui/material';

import LeftArrowIcon from '@/components/atoms/icons/left-arrow';
import Typography from '@/components/atoms/typography';
import LoadingIcon from '@/components/atoms/icons/loading';
import Button from '@/components/atoms/button';
import DragUpload from '@/components/molecules/upload/dragupload';
import DragVideoUpload from '@/components/molecules/upload/dragVideoupload';
import UploadIconNew from '@/components/atoms/icons/uploadIconNew';

import styles from '../onboarding.module.css';
import UseOnboardingHook from '../useOnboardingHook';
import { OnboardingType } from '../OnboardingContext';

const Step3 = () => {
  const {
    handleNext,
    handlePrevious,
    handleDelete,
    handleDeleteVideo,
    setViewImages,
    setVideoImages,
    setImage,
    setImages,
    images,
    t,
    loading,
    viewImages,
    viewVideoImages,
    videoImages,
    loadingDataLoader,
  }: OnboardingType = UseOnboardingHook();

  if (loading)
    return (
      <Box className={styles.loader}>
        <LoadingIcon />
      </Box>
    );

  return (
    <Box className={styles.container}>
      <Box className={styles.flexContainer} onClick={handlePrevious}>
        <Box className={styles.iconBox}>
          <LeftArrowIcon />
        </Box>
        <Box className={styles.textBox}>
          <Typography variant="subtitle2">{t('servicesCard.back')}</Typography>
        </Box>
      </Box>

      <Box className={styles.servicesContainer}>
        <Typography variant="h2" className={styles.centerText}>
          {t('mediaUploadStep.uploadMedia')}
        </Typography>
        <Box className={styles.link}>
          <Link href="onboarding-rules/imageRules" target="_blank">
            {t('mediaUploadStep.readAttireRules')}
          </Link>
        </Box>
      </Box>

      <Box className={styles.servicesContainer}>
        <Typography variant="body2" className={styles.uploadPhotos}>
          {t('mediaUploadStep.uploadPhotosLimit')}
        </Typography>
        <DragUpload
          images={images}
          setImage={setImage}
          setImages={setImages}
          fromSteps={true}
          multiple={true}
          isImageViewAuto={false}
          viewImages={viewImages}
          handleDelete={handleDelete}
          maxLimit={6}
          setViewImages={setViewImages}
          icon={<UploadIconNew />}
        />
      </Box>

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

      <Button
        loading={loadingDataLoader}
        disabled={viewImages.length + images.length < 6}
        onClick={handleNext}
        variant="contained"
        className={styles.buttonContainer}
      >
        {t('servicesCard.next')}
      </Button>
    </Box>
  );
};

export default memo(Step3);
