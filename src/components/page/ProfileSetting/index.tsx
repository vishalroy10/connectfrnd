'use client';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CircularProgress, Snackbar, TextareaAutosize } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import Avatar from '@/components/atoms/avatar';
import Input from '@/components/atoms/input';
import PhoneIcon from '@/components/atoms/icons/phoneIcon';
import Dropdown from '@/components/molecules/dropdown';
import DateTimePicker from '@/components/atoms/datepicker/datepicker';
import EditIcon from '@/components/atoms/icons/editIcon';
import AvatarIcon from '@/components/atoms/icons/avatarIcon';
import SimpleDialog from '@/components/atoms/modal';
import { genderData } from '@/common/utils/data';
import LoadingIcon from '@/components/atoms/icons/loading';
import * as keys from '@/keys/firestoreKeys';

import UserPhoneDetail from './components';
import useProfileSettingHook from './useProfileSettingHook';
import styles from './profileSetting.module.css';

const ProfileSetting = () => {
  const {
    handleChange,
    handleSave,
    handleDeleteModal,
    handleCloseDeleteModal,
    onChangeHandle,
    handleCloseAllModal,
    handleVerifyOTP,
    handleSendVerificationCode,
    deleteClick,
    setToast,
    setProfileData,
    setAddPhoneNumberModal,
    setPhoneNumber,
    setVerificationCode,
    setLoadingUserName,
    data,
    loading,
    error,
    toastMessage,
    openToast,
    profileData,
    uploadImageLoading,
    t,
    debounceUsername,
    userError,
    isLoading,
    isMobile,
    deleteUserLoading,
    deleteModal,
    input,
    verifyOtpLoading,
    phoneNumberInputScreen,
    addPhoneNumberModal,
    phoneNumber,
    loadingUserName,
  } = useProfileSettingHook();

  if (loading || error)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingIcon />
      </Box>
    );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openToast}
        onClose={() => setToast(false)}
        message={toastMessage}
      />
      <Box>
        <Typography variant="h2" className={styles['mainHeadingBox']}>
          {t('profileSetting.settings')}
        </Typography>
        <Box className={styles.profileBox}>
          <Box className={styles.innerBox}>
            <Box className={styles.headerBox}>
              <Typography variant="h5" sx={{ marginRight: '8px' }}>
                {t('profileSetting.basicProfile')}
              </Typography>{' '}
              <InfoOutlinedIcon className={styles.icon} />
            </Box>
            <Box>
              <Typography variant="h5">{t('profileSetting.uploadProfilePicture')}</Typography>
              <Box className={styles.avatarBox}>
                <Box>
                  <Avatar
                    avatars={[
                      {
                        alt: 'cover image',
                        src: profileData?.avatar || <AvatarIcon />,
                      },
                    ]}
                    sx={{
                      maxWidth: '100px',
                      maxHeight: '100px',
                      width: '100px',
                      height: '100px',
                      fontSize: '31px',
                      color: '#646464',
                      marginTop: '8px',
                    }}
                  />
                </Box>
                <Box className={styles.uploadBox}>
                  {!profileData?.avatar.length ? (
                    <Button loading={uploadImageLoading} className={styles.uploadButton} component="label">
                      {t('profileSetting.uploadPhoto')}
                      <input type="file" hidden onChange={handleChange} />
                    </Button>
                  ) : (
                    <>
                      <Button loading={uploadImageLoading} className={styles.uploadButton} component="label">
                        {t('profileSetting.chooseAnotherPhoto')}
                        <input type="file" hidden onChange={handleChange} />
                      </Button>
                      &nbsp;
                      <Button className={styles.uploadButton} component="label">
                        {t('profileSetting.remove')}
                        <input hidden onClick={() => setProfileData({ ...profileData, avatar: '' })} />
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
            <Box className={styles.userDetailBox}>
              <Box className={styles.usernameBox}>
                <Typography variant="h6" className={styles.formLabel}>
                  {t('profileSetting.username')}
                </Typography>
                <Input
                  InputProps={{
                    endAdornment: loadingUserName && <CircularProgress size={18} />,
                  }}
                  className={styles.usernameInput}
                  value={profileData?.userName}
                  onChange={(e: any) => {
                    setLoadingUserName(true);
                    setProfileData({ ...profileData, userName: e.target.value });
                    debounceUsername(e.target.value);
                  }}
                  error={userError.length && userError !== 'Available.'}
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
              <Box className={styles.birthDetailsBox}>
                <Box className={styles.genderBirthBox}>
                  <Typography variant="h6" className={styles.formLabel}>
                    {t('profileSetting.dateOfBirth')}
                  </Typography>
                  <DateTimePicker
                    name="dateOfBirth"
                    disableFuture={true}
                    maxDate={dayjs().subtract(18, 'years')}
                    value={dayjs(profileData?.dateOfBirth)}
                    onChange={(event: Dayjs | null) =>
                      setProfileData({ ...profileData, dateOfBirth: event ? event : dayjs() })
                    }
                  />
                </Box>
                <Box className={styles.genderBirthBox}>
                  <Typography variant="h6" className={styles.formLabel}>
                    {t('profileSetting.gender')}
                  </Typography>
                  <Dropdown
                    placeholderText=""
                    sx={{ background: '#fff', borderRadius: '100px', width: '100%' }}
                    value={
                      genderData.filter((item) => item.value === +profileData?.gender)?.length &&
                      genderData.filter((item) => item.value === +profileData?.gender)[0].label
                    }
                    listData={genderData}
                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                  />
                </Box>
              </Box>
              <Box className={styles.bioBox}>
                <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                  {t('profileSetting.bio')}
                </Typography>
                <TextareaAutosize
                  placeholder="Bio"
                  className={styles.bioTextArea}
                  value={profileData?.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </Box>
            </Box>
            <Button
              loading={isLoading}
              component="label"
              onClick={handleSave}
              variant="contained"
              disabled={
                (userError === 'Available.' || !userError) &&
                profileData?.bio &&
                (+profileData?.gender === 0 || +profileData?.gender === 1) &&
                profileData?.dateOfBirth &&
                profileData?.userName &&
                profileData?.avatar
                  ? false
                  : true
              }
            >
              {t('profileSetting.save')}
            </Button>
          </Box>
        </Box>
        <Box className={styles.newDetailBox}>
          <Box className={styles.phoneBox}>
            <Box className={styles.phoneNumberHeadingText}>
              <Typography variant="h5" sx={{ marginRight: '8px' }}>
                {t('profileSetting.phoneNumber')}
              </Typography>{' '}
            </Box>
            <Box className={styles.phoneIconWithText}>
              <Box className={styles.iconTextBox}>
                <PhoneIcon />
                <Box sx={{ display: 'block', marginLeft: '12px' }}>
                  <Typography variant="h6">{t('profileSetting.phoneNumber')}</Typography>
                  <Typography variant="caption">{profileData?.phone}</Typography>
                </Box>
              </Box>
              <Box>
                {!profileData?.phone ? (
                  <Button className={styles.binButton} onClick={() => setAddPhoneNumberModal(true)}>
                    {t('profileSetting.bind')}
                  </Button>
                ) : !isMobile ? (
                  <Button
                    className={styles.binButton}
                    onClick={() => {
                      setAddPhoneNumberModal(true);
                      setPhoneNumber(data?.get(keys.phoneNumberKey));
                    }}
                  >
                    {t('profileSetting.edit')}
                  </Button>
                ) : (
                  <Button sx={{ display: 'flex', justifyContent: 'end' }}>
                    <EditIcon />
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.newDetailBox}>
          <Typography
            variant="h5"
            sx={{ cursor: 'pointer', fontWeight: 700, color: '#E32D2D', padding: '12px 20px' }}
            onClick={handleDeleteModal}
          >
            {t('profileSetting.deleteAccount')}
          </Typography>
        </Box>
      </Box>
      <SimpleDialog
        modelWidth={!isMobile ? '552px' : 'fit-content'}
        isDeleteModel={true}
        borderRadius={24}
        footer={
          <>
            <Button className={styles.cancelBtn}>
              <Typography variant="subtitle1" onClick={handleCloseDeleteModal}>
                {t('modalButton.cancel')}
              </Typography>
            </Button>
            <Button
              loading={deleteUserLoading}
              className={styles.deleteBtn}
              disabled={input !== 'DELETE'}
              onClick={deleteClick}
            >
              <Typography variant="subtitle1">
                {' '}
                {isMobile ? t('profileSetting.delete') : t('profileSetting.deleteAccount')}
              </Typography>
            </Button>
          </>
        }
        open={deleteModal}
        title={<Typography variant="h3">{t('profileSetting.deleteAccount')}</Typography>}
      >
        {!isMobile && (
          <Typography variant="body1" sx={{ color: '#646464', display: 'flex', marginTop: '16px' }}>
            {t('profileSetting.deleteConfirm')} &nbsp;
            <Typography variant="subtitle1">{t('profileSetting.deleteCaps')}</Typography>
          </Typography>
        )}
        <Input sx={{ width: '100%', marginTop: '16px' }} onChange={onChangeHandle} />
      </SimpleDialog>
      <SimpleDialog
        modelWidth={!isMobile ? '552px' : 'fit-content'}
        isDeleteModel={true}
        borderRadius={24}
        footer={
          <>
            <Button className={styles.cancelBtn} onClick={handleCloseAllModal}>
              <Typography variant="subtitle1"> {t('modalButton.cancel')}</Typography>
            </Button>
            <Button
              loading={verifyOtpLoading}
              sx={phoneNumberInputScreen ? { width: 'fit-content', height: '48px' } : { height: '48px' }}
              variant="contained"
              onClick={() => {
                if (phoneNumberInputScreen) handleVerifyOTP();
                else handleSendVerificationCode();
              }}
            >
              <Typography variant="subtitle1">
                {phoneNumberInputScreen ? t('profileSetting.bindNumber') : t('modalButton.continue')}
              </Typography>
            </Button>
          </>
        }
        open={addPhoneNumberModal}
        title={<Typography variant="h3">{t('profileSetting.bindNumber')}</Typography>}
      >
        <>
          {!isMobile && (
            <Typography variant="body1" sx={{ color: '#646464', display: 'flex', marginTop: '16px' }}>
              {phoneNumberInputScreen
                ? `${t('profileSetting.codeSend')} ${phoneNumber}`
                : t('profileSetting.description')}
            </Typography>
          )}
          <UserPhoneDetail
            phoneNumberInputScreen={phoneNumberInputScreen}
            setPhoneNumber={setPhoneNumber}
            setVerificationCode={setVerificationCode}
            phoneNumber={phoneNumber}
          />
        </>
        <div id="recaptcha-container"></div>
      </SimpleDialog>
    </>
  );
};

export default ProfileSetting;
