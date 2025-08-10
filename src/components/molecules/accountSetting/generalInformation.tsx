'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, CircularProgress, FormHelperText, InputAdornment, Switch, useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';

import Typography from '@/components/atoms/typography';
import Input from '@/components/atoms/input';
import DateTimePicker from '@/components/atoms/datepicker/datepicker';
import Dropdown from '@/components/molecules/dropdown';
import UpArrowIcon from '@/components/atoms/icons/upArrowIcon';
import DownArrowIcon from '@/components/atoms/icons/downArrowIcon';
import { genderData, privacyData, raceEnums } from '@/common/utils/data';
import { debounce } from 'lodash';
import styles from './accountSetting.module.css';
import { useTranslations } from 'next-intl';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '@/credentials/firebase';
import { USERS, nicknameKey } from '@/keys/firestoreKeys';
import { useUserStore } from '@/store/reducers/usersReducer';

export default function GeneralInformation({ formik, privacy = true }: any) {
  const t = useTranslations('profile');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const [uid] = [currentUser?.uid];
  const [showGeneralInformation, setShowGeneralInformation] = useState(true);
  const [loadingUserName, setLoadingUserName] = useState<boolean>(false);
  const [userError, setUserError] = useState<string | any>('');

  useEffect(() => {
    if (isMobile) {
      if (!formik.values.privacy) formik.setFieldValue('privacy', 'Private');
      setShowGeneralInformation(true);
    } else {
      setShowGeneralInformation(true);
    }
  }, [isMobile]);

  const handleUserNameValidation = useCallback(async (value: string) => {
    setLoadingUserName(true);
    const nameRegex = /^[a-z]+$/; // eslint-disable-line
    let text = '';
    if (value.match(nameRegex) === null || value.length < 3) {
      text = 'Username Must Contains A-Z. NO Spacing, NO Numbers. Minimum Length Is 3 Characters.';
      setLoadingUserName(false);
    } else if (value === 'undefined') {
      text = 'This username is not available. Please try again.';
      setLoadingUserName(false);
    } else {
      const snap = await getDocs(query(collection(db, USERS), where(nicknameKey, '==', value), limit(1)));
      if (snap.docs.length !== 0) {
        const myUid = snap.docs[0].id;
        if (uid !== myUid) {
          text = 'This username is not available. Please try again.';
          setLoadingUserName(false);
        }
      } else {
        text = 'Available.';
        setLoadingUserName(false);
      }
    }
    setUserError(text);
    setLoadingUserName(false);
    return text;
  }, []);
  const debounceUsername = debounce(handleUserNameValidation, 300);
  const minHeight = 100;
  const maxHeight = 300;
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
        onClick={() => setShowGeneralInformation(!showGeneralInformation)}
      >
        <Typography variant="h5">{t('userDetailsStep.generalInfo')} </Typography>
        {isMobile && showGeneralInformation ? <UpArrowIcon /> : <DownArrowIcon />}
      </Box>
      {showGeneralInformation ? (
        <>
          {privacy && (
            <Box sx={isMobile ? { display: 'none' } : { display: 'block' }}>
              <Box className={styles.genderBirthBox}>
                <Typography variant="h6" className={styles.formLabel}>
                  {t('userDetailsStep.privacy')}
                </Typography>
                <Dropdown
                  placeholderText="Choose"
                  sx={{ background: '#fff', borderRadius: '100px', width: '100%' }}
                  listData={privacyData}
                  name="privacy"
                  value={formik.values.privacy}
                  onChange={formik.handleChange}
                  error={formik.touched.privacy && Boolean(formik.errors.privacy)}
                />
                {formik.touched.privacy && Boolean(formik.errors.privacy) && (
                  <FormHelperText error id="privacy-error">
                    {formik.touched.privacy && formik.errors.privacy}
                  </FormHelperText>
                )}
              </Box>
            </Box>
          )}
          <Box className={styles.inputFieldBox}>
            <Typography variant="h6" className={styles.formLabel}>
              {t('userDetailsStep.username')}
            </Typography>
            <Input
              InputProps={{
                endAdornment: loadingUserName && <CircularProgress size={18} />,
              }}
              placeholder="Username"
              className={styles.usernameInput}
              onChange={(e) => {
                setLoadingUserName(true);
                formik.setFieldValue('userName', e.target.value);
                debounceUsername(e.target.value);
              }}
              name="userName"
              value={formik.values.userName}
              error={formik.touched.userName && Boolean(formik.errors.userName) && userError !== 'Available.'}
              helperText={formik.touched.userName && !userError && formik.errors.userName}
            />
            {!loadingUserName && (
              <Typography
                variant="caption"
                sx={{ color: userError !== 'Available.' ? 'red' : 'green', marginLeft: '10px' }}
              >
                {userError}
              </Typography>
            )}
          </Box>
          {privacy && (
            <Box className={styles.selectPrivacyBoxForMobile}>
              <Typography variant="h6" className={styles.formLabel}>
                {t('userDetailsStep.privateAccount')}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" className={styles.formLabel} sx={{ color: '#646464' }}>
                  {formik.values.privacy === 'Private'
                    ? t('userDetailsStep.privateGuidLine')
                    : t('userDetailsStep.switchPublicPrivate')}
                </Typography>
                <Switch
                  checked={formik.values.privacy === 'Private' ? true : false}
                  name="privacy"
                  value={formik.values.privacy}
                  onChange={(e) => {
                    e.target.checked
                      ? formik.setFieldValue('privacy', 'Private')
                      : formik.setFieldValue('privacy', 'Public');
                  }}
                />
              </Box>
            </Box>
          )}
          <Box className={styles.inputFieldBox}>
            <Typography variant="h6" className={styles.formLabel}>
              {t('userDetailsStep.availability')}
            </Typography>
            <Input
              className={styles.usernameInput}
              placeholder="Example: Wednesday only"
              name="availability"
              value={formik.values.availability}
              onChange={formik.handleChange}
              error={formik.touched.availability && Boolean(formik.errors.availability)}
              helperText={formik.touched.dateOfBirth && formik.errors.availability}
            />
          </Box>
          <Box className={styles.birthDetailsBox}>
            <Box className={styles.genderBirthBox}>
              <Typography variant="h6" className={styles.formLabel}>
                {t('userDetailsStep.dateOfBirth')}
              </Typography>
              <DateTimePicker
                disableFuture={true}
                maxDate={dayjs().subtract(18, 'years')}
                placeholder="Date"
                // onChange={(event: Dayjs | null) =>
                //   setProfileData({ ...profileData, dateOfBirth: event ? event : dayjs() })
                // }
                name="dateOfBirth"
                value={dayjs(formik.values.dateOfBirth)}
                onChange={(event) =>
                  event ? formik.setFieldValue('dateOfBirth', event) : formik.setFieldValue('dateOfBirth', dayjs())
                }
                error={Boolean(formik.touched.dateOfBirth) && Boolean(formik.errors.dateOfBirth)}
              />
              {formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth) && (
                <FormHelperText error id="dateOfBirth-error">
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                </FormHelperText>
              )}
            </Box>
            <Box className={styles.genderBirthBox}>
              <Typography variant="h6" className={styles.formLabel}>
                {t('userDetailsStep.height')}
              </Typography>
              <Dropdown
                placeholderText="Choose"
                sx={{ background: '#fff', borderRadius: '100px', width: '100%' }}
                endAdornment={
                  <InputAdornment sx={{ marginRight: '30px' }} position="end">
                    cm
                  </InputAdornment>
                }
                listData={Array(maxHeight - minHeight)
                  .fill(0)
                  .map((_, index) => ({
                    label: `${minHeight + index} cm`,
                    key: `${minHeight + index}`,
                    value: `${minHeight + index}`,
                  }))}
                name="height"
                value={formik.values.height}
                onChange={formik.handleChange}
                error={formik.touched.height && Boolean(formik.errors.height)}
              />
              {/* <OutlinedInput
              fullWidth
              inputProps={{ min: 0, endAdornment: <InputAdornment position="end">cm</InputAdornment> }}
              type="number"
              placeholder="Height"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              className={styles.heightInput}
              name="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              error={formik.touched.height && Boolean(formik.errors.height)}
            /> */}
              {formik.touched.height && Boolean(formik.errors.height) && (
                <FormHelperText error id="height-error">
                  {formik.touched.height && formik.errors.height}
                </FormHelperText>
              )}
            </Box>
          </Box>
          <Box className={styles.birthDetailsBox}>
            <Box className={styles.genderBirthBox}>
              <Typography variant="h6" className={styles.formLabel}>
                {t('userDetailsStep.gender')}
              </Typography>

              <Dropdown
                placeholderText="Gender"
                sx={{ background: '#fff', borderRadius: '100px', width: '100%' }}
                listData={genderData}
                value={
                  genderData.filter((item) => Number(item.value) === Number(formik.values.gender))?.length &&
                  genderData.filter((item) => Number(item.value) === Number(formik.values.gender))[0].label
                }
                name="gender"
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              />
              {formik.touched.gender && Boolean(formik.errors.gender) && (
                <FormHelperText error id="gender-error">
                  {formik.touched.gender && formik.errors.gender}
                </FormHelperText>
              )}
            </Box>
            <Box className={styles.genderBirthBox}>
              <Typography variant="h6" className={styles.formLabel}>
                {t('userDetailsStep.ethnicity')}
              </Typography>
              <Dropdown
                placeholderText="Ethnicity"
                sx={{ background: '#fff', borderRadius: '100px', width: '100%' }}
                listData={raceEnums}
                value={
                  raceEnums.filter((item) => item.value === formik.values.ethnicity)?.length &&
                  raceEnums.filter((item) => item.value === formik.values.ethnicity)[0].label
                }
                name="ethnicity"
                onChange={formik.handleChange}
                error={formik.touched.ethnicity && Boolean(formik.errors.ethnicity)}
              />
              {formik.touched.ethnicity && Boolean(formik.errors.ethnicity) && (
                <FormHelperText error id="ethnicity-error">
                  {formik.touched.ethnicity && formik.errors.ethnicity}
                </FormHelperText>
              )}
            </Box>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
}
