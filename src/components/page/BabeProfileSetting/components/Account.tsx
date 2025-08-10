'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import Typography from '@/components/atoms/typography';
import LoadingIcon from '@/components/atoms/icons/loading';
import Button from '@/components/atoms/button';

import styles from '../babeProfileSetting.module.css';
import { useFormik } from 'formik';
import { onboardingStep5Schema } from './ProfileSetting.validation';
import UseBabeProfileSettingHook from '../useBabeProfileSettingHook';
import { BabeProfileSettingType, UserProfile } from '../BabeProfileSettingContext';
import GeneralInformation from '@/components/molecules/accountSetting/generalInformation';
import AdditionalInformation from '@/components/molecules/accountSetting/AdditionalInformation';
import BackButton from './BackButton';
import {
  availabilityKey,
  dateOfBirthKey,
  foodPrefKey,
  genderKey,
  heightKey,
  nicknameKey,
  orientationKey,
  privacyKey,
  raceKey,
} from '@/keys/firestoreKeys';
import dayjs from 'dayjs';
import DeleteAccountModel from './models/DeleteAccountModel';

const Account = () => {
  const { saveAccountDetail, t, loading, data, loadingDataLoader }: BabeProfileSettingType =
    UseBabeProfileSettingHook();
    const [isDeleteAccount, setIsDeleteAccount] = useState(false);

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
      saveAccountDetail(values);
    },
  });

  useEffect(() => {
    async function setInitialValues() {
      const userData = {
        privacy: data?.get(privacyKey),
        userName: data?.get(nicknameKey),
        availability: data?.get(availabilityKey),
        dateOfBirth: dayjs(data?.get(dateOfBirthKey), 'DD MMMM YYYY at HH:mm:ss [UTC]Z'),
        height: data?.get(heightKey),
        gender: data?.get(genderKey),
        orientation: data?.get(orientationKey),
        foodPref: data?.get(foodPrefKey),
        ethnicity: data?.get(raceKey),
      };
      formik.setValues(userData, false);
    }
    setInitialValues();
  }, []);

  if (loading)
    return (
      <Box className={styles.loader}>
        <LoadingIcon />
      </Box>
    );

  return (
    <>
      <Box className={styles.container}>
        <BackButton title="Account" />
        <Box className={styles.formCard}>
          <GeneralInformation formik={formik} privacy={false} />
        </Box>
        <Box className={styles.formCard}>
          <AdditionalInformation formik={formik} />
        </Box>
        <Box>
          <Button
            loading={loadingDataLoader}
            onClick={() => formik.handleSubmit()}
            variant="contained"
            className={styles.submitButtonContainer}
          >
            Save
          </Button>
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{ cursor: 'pointer', fontWeight: 700, color: '#E32D2D', padding: '24px 20px' }}
            onClick={() => setIsDeleteAccount(true)}
          >
            {t('profileSetting.deleteAccount')}
          </Typography>
        </Box>
      </Box>
      <DeleteAccountModel isDeleteAccount={isDeleteAccount} setIsDeleteAccount={setIsDeleteAccount} />
    </>
  );
};

export default Account;
