'use client';
import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';

import Typography from '@/components/atoms/typography';
import Input from '@/components/atoms/input';
import UpArrowIcon from '@/components/atoms/icons/upArrowIcon';
import DownArrowIcon from '@/components/atoms/icons/downArrowIcon';
import { useTranslations } from 'next-intl';
import styles from './accountSetting.module.css';

export default function AdditionalInformation({ formik }: any) {
  const t = useTranslations('profile');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [showAdditionalInformation, setShowAdditionalInformation] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setShowAdditionalInformation(false);
    } else {
      setShowAdditionalInformation(true);
    }
  }, [isMobile]);
  return (
    <Box>
      <Box
        sx={
          isMobile
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
            : { display: 'none' }
        }
        onClick={() => setShowAdditionalInformation(!showAdditionalInformation)}
      >
        <Typography variant={`${isMobile ? 'h5' : 'h2'}`}>{t('userDetailsStep.additionalInformation')}</Typography>
        {isMobile && showAdditionalInformation ? <UpArrowIcon /> : <DownArrowIcon />}
      </Box>
      {!isMobile && (
        <Typography variant={`${isMobile ? 'h5' : 'h2'}`}>{t('userDetailsStep.additionalInformation')}</Typography>
      )}
      {showAdditionalInformation ? (
        <>
          <Box className={styles.inputFieldBox}>
            <Typography variant="h6" className={styles.formLabel}>
              {t('userDetailsStep.orientation')}
            </Typography>
            <Input
              className={styles.usernameInput}
              placeholder="Orientation"
              // value={profileData?.orientation}
              // onChange={(e) => setProfileData({ ...profileData, orientation: e.target.value })}
              name="orientation"
              value={formik.values.orientation}
              onChange={formik.handleChange}
              error={formik.touched.orientation && Boolean(formik.errors.orientation)}
              helperText={formik.touched.orientation && formik.errors.orientation}
            />
          </Box>
          <Box className={styles.inputFieldBox}>
            <Typography variant="h6" className={styles.formLabel}>
              {t('userDetailsStep.foodPreferences')}
            </Typography>
            <Input
              className={styles.usernameInput}
              placeholder="Food preferences"
              // value={profileData?.foodPref}
              // onChange={(e) => setProfileData({ ...profileData, foodPref: e.target.value })}
              name="foodPref"
              value={formik.values.foodPref}
              onChange={formik.handleChange}
              error={formik.touched.foodPref && Boolean(formik.errors.foodPref)}
              helperText={formik.touched.foodPref && formik.errors.foodPref}
            />
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
}
