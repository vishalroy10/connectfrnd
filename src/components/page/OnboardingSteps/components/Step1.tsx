import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import LocationIcon from '@mui/icons-material/LocationOnOutlined'; // Import the icon you want to use

import Button from '@/components/atoms/button';
import LoadingIcon from '@/components/atoms/icons/loading';

import styles from '../onboarding.module.css';
import UseOnboardingHook from '../useOnboardingHook';
import { OnboardingType } from '../OnboardingContext';

const Step1 = () => {
  const {
    setValue,
    setError,
    handleChangeLocation,
    handleNext,
    t,
    loadingDataLoader,
    getRegionState,
    error,
    value,
    loading,
    currentUser,
  }: OnboardingType = UseOnboardingHook();
  if (loading)
    return (
      <Box className={styles.loader}>
        <LoadingIcon />
      </Box>
    );
  return (
    <>
      <Typography className={styles.firstContainer}>{t('locationStep.locationHeader')}</Typography>
      <Typography variant="h5" mb={2}>
        {t('locationStep.selectLocation')}
      </Typography>
      <Autocomplete
        value={currentUser?.encods}
        freeSolo
        options={getRegionState}
        renderOption={(props, option: any) => {
          return (
            <Box component="li" className={styles.autocompleteContainer} {...props}>
              <LocationIcon sx={{ mr: 2 }} />
              <Typography variant="h5" mr={2}>
                {option.label}
              </Typography>
            </Box>
          );
        }}
        onChange={(e, newValue: any) => {
          if (typeof newValue == 'string') {
            setValue({ label: newValue, value: newValue });
          } else {
            setValue(newValue);
          }
          setError(false);
        }}
        renderInput={(params) => {
          return (
            <TextField
              error={error}
              helperText={error ? t('locationStep.selectError') : ''}
              placeholder={t('locationStep.chooseLocation')}
              {...params}
              onChange={handleChangeLocation}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <LocationIcon /> {/* Start icon */}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          );
        }}
      />
      <Button
        loading={loadingDataLoader}
        onClick={handleNext}
        disabled={error || !value?.value}
        variant="contained"
        className={styles.buttonContainer}
      >
        {t('locationStep.next')}
      </Button>
    </>
  );
};

export default Step1;
