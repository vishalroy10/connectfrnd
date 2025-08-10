'use client';
import React, { useEffect, useState } from 'react';
import { Box, Snackbar, Switch, Typography } from '@mui/material';
import styles from '../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import PhoneIcon from '@/components/atoms/icons/phoneIcon';
import GoogleIcon from '@/components/atoms/icons/googleIcon';
import InstagramIcon from '@/components/atoms/icons/instagramIcon';
import CreditCardIcon from '@/components/atoms/icons/creditCardIcon';
import BackButton from './BackButton';
import UpdatePhoneNumber from './models/UpdatePhoneNumber';
import UseBabeProfileSettingHook from '../useBabeProfileSettingHook';
import { BabeProfileSettingType } from '../BabeProfileSettingContext';
import { phoneNumberKey, privacyKey, timeStampKey, videoVerificationKey } from '@/keys/firestoreKeys';
import VerificationModel from './models/VerificationModel';
import useConnectInstagram from '@/hooks/useConnectInstagram';
import { deleteField, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, fetchSignInMethodsForEmail, linkWithPopup } from 'firebase/auth';
import { auth } from '@/credentials/firebase';

const Security = () => {
  const [isPhoneUpdate, setIsPhoneUpdate] = useState<boolean>(false);
  const [isVerification, setIsVerification] = useState<boolean>(false);
  const [openToast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);
  const { t, data, uid, handleUpdate }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const { connect } = useConnectInstagram();
  const updateProfilePrivacy = async (privacy: string) => {
    try {
      const updateData: Record<string, any> = {};
      updateData[privacyKey] = privacy;

      await handleUpdate(updateData, uid);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkGoogleLink = async () => {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, auth?.currentUser?.email || '');
        setIsGoogleLinked(methods.includes('google.com'));
      } catch (error) {
        console.error('Error checking Google account link:', error);
      }
    };
    if (auth?.currentUser) {
      checkGoogleLink();
    }
  }, [auth.currentUser]);

  const linkGoogleAccount = async () => {
    const provider = new GoogleAuthProvider();
    if (auth.currentUser)
      linkWithPopup(auth.currentUser, provider)
        .then((result) => {
          const user = result.user;
          console.log('Connected Account', user);
        })
        .catch((error) => {
          if (error.code === 'auth/credential-already-in-use') {
            setToastMessage('Google account is already in use.');
            setToast(true);
          } else {
            setToastMessage('Something wents wrong! Please try again!');
            setToast(true);
          }

          setTimeout(() => {
            setToastMessage('');
            setToast(false);
          }, 5000);
        });
  };

  const hideProfile = async (checked: boolean) => {
    try {
      const updateData: Record<string, any> = {};
      if (checked) {
        updateData[timeStampKey] = serverTimestamp();
      } else {
        updateData[timeStampKey] = deleteField();
      }

      await handleUpdate(updateData, uid);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openToast}
        onClose={() => setToast(false)}
        message={toastMessage}
      />
      <Box className={styles.container}>
        <BackButton title="Security" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
          <Box mb={2} className={styles.cardHeading}>
            Privacy
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'block', alignItems: 'center' }}>
              <Typography variant="subtitle1">Private account</Typography>

              <Typography variant="body1">
                {' '}
                {data?.get(privacyKey) === 'Private'
                  ? t('userDetailsStep.privateGuidLine')
                  : t('userDetailsStep.publicGuidLine')}
              </Typography>
            </Box>

            <Switch
              name="privacy"
              value="privacy"
              checked={data?.get(privacyKey) === 'Private' ? true : false}
              onChange={(e) => {
                e.target.checked ? updateProfilePrivacy('Private') : updateProfilePrivacy('Public');
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'block', alignItems: 'center' }}>
              <Typography variant="subtitle1">Hide profile</Typography>
              <Typography variant="body2">Your profile is active.</Typography>
              <Typography variant="body2">
                When you switch your profile to inactive, you can hide your profile from our website immedately.
                However, your account cannot received any request orders and will be auto deleted if 6 of months
                inactive.
              </Typography>
            </Box>

            <Switch
              checked={data?.get(timeStampKey)}
              name="privacy"
              value="privacy"
              onChange={(e) => hideProfile(e.target.checked)}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
          <Box mb={2} className={styles.cardHeading}>
            Phone Number
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '36px',
                  width: '36px',
                  borderRadius: '100%',
                  backgroundColor: '#fff',
                }}
              >
                <PhoneIcon />
              </Box>
              <Box sx={{ display: 'block', marginLeft: '12px' }}>
                <Typography variant="subtitle1">Phone Number</Typography>
                <Typography variant="h6">{data?.get(phoneNumberKey) || ''}</Typography>
              </Box>
            </Box>

            <Button
              sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
              onClick={() => setIsPhoneUpdate(true)}
            >
              Edit
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
          <Box mb={2} className={styles.cardHeading}>
            Accounts
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '36px',
                width: '36px',
                borderRadius: '100%',
                backgroundColor: '#fff',
              }}
            >
              <GoogleIcon />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
                gap: '12px',
              }}
            >
              <Box sx={{ display: 'block', marginLeft: '12px' }}>
                <Typography variant="subtitle1">Google</Typography>
              </Box>

              {!isGoogleLinked ? (
                <Button
                  sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
                  onClick={() => linkGoogleAccount()}
                >
                  Connect to Google
                </Button>
              ) : (
                <Button
                  sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
                  onClick={() => linkGoogleAccount()}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '36px',
                width: '36px',
                borderRadius: '100%',
                backgroundColor: '#fff',
              }}
            >
              <InstagramIcon />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
                gap: '12px',
              }}
            >
              <Box sx={{ display: 'block', marginLeft: '12px' }}>
                <Typography variant="subtitle1">Instagram</Typography>
                <Typography variant="h6">Your username will not be shown</Typography>
              </Box>

              <Button
                sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
                onClick={() => connect()}
              >
                Connect to Instagram
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
          <Box mb={2} className={styles.cardHeading}>
            Verification
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '36px',
                width: '36px',
                borderRadius: '100%',
                backgroundColor: '#fff',
              }}
            >
              <CreditCardIcon />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
                gap: '12px',
              }}
            >
              <Box sx={{ display: 'block', marginLeft: '12px' }}>
                <Typography variant="subtitle1">Government issue ID</Typography>
              </Box>

              {data?.get(videoVerificationKey) === undefined && (
                <Button
                  sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
                  onClick={() => setIsVerification(true)}
                >
                  Edit
                </Button>
              )}
              {data?.get(videoVerificationKey) === true && (
                <Button sx={{ background: '#DBF0DC', padding: '8px 16px', width: 'fit-content' }} onClick={() => {}}>
                  <Typography color="#4CAF4F">Verified</Typography>
                </Button>
              )}
              {data?.get(videoVerificationKey) === false && (
                <Button sx={{ background: '#FEF7ED', padding: '8px 16px', width: 'fit-content' }} onClick={() => {}}>
                  <Typography color="#DD8700">Waiting for approval</Typography>
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <UpdatePhoneNumber isPhoneUpdate={isPhoneUpdate} setIsPhoneUpdate={setIsPhoneUpdate} />
      <VerificationModel isVerification={isVerification} setIsVerification={setIsVerification} />
    </>
  );
};

export default Security;
