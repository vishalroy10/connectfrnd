'use client';
import React from 'react';
import { Box, Divider } from '@mui/material';

import LeftArrowIcon from '@/components/atoms/icons/left-arrow';
import Typography from '@/components/atoms/typography';
import SimpleDialog from '@/components/atoms/modal';
import LoadingIcon from '@/components/atoms/icons/loading';
import Button from '@/components/atoms/button';

import UseOnboardingHook from '../useOnboardingHook';
import styles from '../onboarding.module.css';
import SubmitData from './SubmitData';
import { useFormik } from 'formik';
import { OnboardingType, UserProfile } from '../OnboardingContext';
import { onboardingStep5Schema } from './onboarding.validation';
import AdditionalInformation from '@/components/molecules/accountSetting/AdditionalInformation';
import GeneralInformation from '@/components/molecules/accountSetting/generalInformation';

const Step5 = () => {
  const {
    handleNext,
    handleClosePopup,
    handleGoToProfile,
    handlePrevious,
    setProfileData,
    t,
    loading,
    isMobile,
    goToProfileLoading,
    openSubmitModal,
    loadingDataLoader,
    goToReviewLoading,
  }: OnboardingType = UseOnboardingHook();

  const formikInitialValues: UserProfile = {
    privacy: '',
    userName: '',
    availability: '',
    dateOfBirth: '',
    height: '',
    gender: 0,
    ethnicity: '',
    orientation: '',
    foodPref: '',
  };

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: onboardingStep5Schema,
    onSubmit: (values) => {
      setProfileData(values);
      handleNext();
    },
  });

  if (loading)
    return (
      <Box className={styles.loader}>
        <LoadingIcon />
      </Box>
    );

  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.flexContainer} onClick={handlePrevious}>
          <Box className={styles.iconBox}>
            <LeftArrowIcon />
          </Box>
          <Box className={styles.textBox}>
            <Typography variant="subtitle2">{t('servicesCard.back')}</Typography>
          </Box>
        </Box>{' '}
        <Box>
          <Box sx={{ margin: '40px 0' }}>
            <Typography variant="h2" sx={{ textAlign: 'center' }}>
              {t('userDetailsStep.profileHeader')}
            </Typography>
            {!isMobile && formik.values.privacy !== undefined && (
              <Box className={styles.infoBox}>
                <Typography variant="body2" sx={{ color: '#37aaf2' }}>
                  {formik.values.privacy === 'Public'
                    ? t('userDetailsStep.publicGuidLine')
                    : t('userDetailsStep.privateGuidLine')}
                </Typography>
              </Box>
            )}
          </Box>
          <GeneralInformation formik={formik} />
          <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
          <AdditionalInformation formik={formik} />
        </Box>
        <Box>
          <Button
            loading={loadingDataLoader}
            onClick={() => formik.handleSubmit()}
            variant="contained"
            className={styles.submitButtonContainer}
          >
            {t('userDetailsStep.Submit')}
          </Button>
        </Box>
      </Box>
      <SimpleDialog
        modelWidth={!isMobile ? '448px' : 'fit-content'}
        open={openSubmitModal}
        borderRadius={24}
        footer={
          <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
            <Button
              loading={goToReviewLoading}
              onClick={() => handleClosePopup()}
              className={styles.footerCancelButton}
              sx={{ padding: '24px', marginRight: '6px' }}
            >
              <Typography variant="subtitle1">{t('modalButton.close')}</Typography>
            </Button>
            <Button
              loading={goToProfileLoading}
              onClick={() => {
                handleGoToProfile();
              }}
              variant="contained"
              className={styles.footerCancelButton}
              sx={{ padding: '24px', marginLeft: '6px' }}
            >
              <Typography variant="subtitle1">{t('modalButton.goProfile')}</Typography>
            </Button>
          </Box>
        }
        title=""
        maxWidth={'lg'}
        isDeleteModel={true}
      >
        <SubmitData />
      </SimpleDialog>
    </>
  );
};

export default Step5;
