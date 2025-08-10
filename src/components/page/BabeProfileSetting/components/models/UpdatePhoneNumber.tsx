'use client';
import React, { useEffect, useState } from 'react';
import { Snackbar, useMediaQuery } from '@mui/material';

import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import SimpleDialog from '@/components/atoms/modal';
import * as keys from '@/keys/firestoreKeys';

import InputPhone from '@/components/molecules/phoneinput';
import { useTranslations } from 'next-intl';
import UseBabeProfileSettingHook from '../../useBabeProfileSettingHook';
import { BabeProfileSettingType } from '../../BabeProfileSettingContext';
import { auth, db, functions } from '@/credentials/firebase';
import { updateUserProviderDetails } from '@/keys/functionNames';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

const UserPhoneDetail = ({ phoneNumberInputScreen, setVerificationCode, setPhoneNumber, phoneNumber }: any) => {
  const t = useTranslations('profile');

  return (
    <>
      <Box sx={{ marginTop: '16px', width: '100%', maxWidth: '552px' }}>
        {phoneNumberInputScreen ? (
          <Input
            type="number"
            placeholder={`${t('profileSetting.verificationCode')}`}
            onChange={(e: any) => setVerificationCode(e.target.value)}
          />
        ) : (
          <InputPhone value={phoneNumber} setValue={setPhoneNumber} />
        )}
      </Box>
    </>
  );
};

export default function UpdatePhoneNumber({ isPhoneUpdate, setIsPhoneUpdate }: any) {
  const t = useTranslations('profile');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { data, uid }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const handleModalClose = () => {
    setIsPhoneUpdate(false);
  };
  const [openToast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [phoneNumberInputScreen, setPhoneNumberInputScreen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState<any>(null);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState<boolean>(false);
  useEffect(() => {
    if (data?.get(keys.phoneNumberKey)) {
      setPhoneNumber(data?.get(keys.phoneNumberKey));
    }
  }, []);

  const sendVerificationCode = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
    try {
      const verificationId = await signInWithPhoneNumber(auth, `+${phoneNumber}`, recaptchaVerifier);
      if (!verificationId) {
        setToast(true);
        setToastMessage('Something went wrong');
      }
      return verificationId;
    } catch (error: any) {
      console.log(error);
      setToast(true);
      setToastMessage('too many requests');
    }
  };

  const handleSendVerificationCode = async () => {
    setVerifyOtpLoading(true);
    const oldPhoneNumber = data?.get(keys.phoneNumberKey);
    console.log('oldPhoneNumberadb', phoneNumber, oldPhoneNumber);
    try {
      await updateDoc(doc(db, keys?.USERS, uid || ''), {
        isPhoneVerified: false,
        oldPhoneNumber,
      });
      const updateProviderDetails = httpsCallable(functions, updateUserProviderDetails);
      const updateUser = await updateProviderDetails({ phoneNumber, uid });
      const updatedData = updateUser?.data as {
        message: string;
        status: number;
        success: boolean;
        error: string;
      };

      if (!updatedData?.success) {
        setToast(true);
        setToastMessage(updatedData?.error);
      }

      if (updatedData?.success && uid) {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
        const id = await sendVerificationCode(phoneNumber, recaptchaVerifier);

        // dispatch(fetchUserData(uid));
        setVerificationId(id);
        if (id) {
          setToast(true);
          setToastMessage('OTP Send Successfully');
        }
        if (id) {
          setPhoneNumberInputScreen(true);
          setPhoneNumber(phoneNumber);
        }
      }
      setVerifyOtpLoading(false);
    } catch (error: any) {
      if (error) {
        setPhoneNumberInputScreen(false);
        setToast(true);
        setToastMessage(error.name);
        setVerifyOtpLoading(false);
      }
      await updateDoc(doc(db, keys?.USERS, uid || ''), {
        isPhoneVerified: true,
        phone: oldPhoneNumber,
      });
      //   if (uid) {
      //     dispatch(fetchUserData(uid));
      //   }

      const updateProviderDetails = httpsCallable(functions, updateUserProviderDetails);
      await updateProviderDetails({ phoneNumber: oldPhoneNumber, uid });
      setVerifyOtpLoading(false);
      handleModalClose();
    }
  };

  const handleVerifyOTP = async () => {
    setVerifyOtpLoading(true);
    const oldPhoneNumber = data?.get(keys.phoneNumberKey);

    try {
      const updateData: any = {};
      const promises = [];
      const otp = verificationCode;

      const check = await verificationId.confirm(otp);

      let update: any;
      if (check) {
        updateData[keys.phoneNumberKey] = phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`;
        updateData['isPhoneVerified'] = true;
        updateData['oldPhoneNumber'] = phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`;
        const updateProviderDetails = httpsCallable(functions, updateUserProviderDetails);
        await updateProviderDetails({ phoneNumber, uid });
        update = await updateDoc(doc(db, keys?.USERS, uid || ''), updateData);
        setToast(true);
        setToastMessage('Phone Number Bind Successfully');
        setVerifyOtpLoading(false);
        handleModalClose();
      } else {
        setToast(true);
        setToastMessage('OTP is invalid - else');
        setVerifyOtpLoading(false);
      }
      //   if (uid) dispatch(fetchUserData(uid));
      promises.push(update);
      await Promise.all(promises);
    } catch (error) {
      updateDoc(doc(db, keys?.USERS, uid || ''), {
        isPhoneVerified: true,
        phone: oldPhoneNumber,
        oldPhoneNumber: null,
      });
      //   if (uid) dispatch(fetchUserData(uid));

      setToast(true);
      setToastMessage('OTP is invalid!');
      setVerifyOtpLoading(false);
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
      <SimpleDialog
        modelWidth={!isMobile ? '552px' : 'fit-content'}
        isDeleteModel={true}
        borderRadius={24}
        footer={
          <>
            <Button
              sx={{ height: '48px', border: '1px solid #CCCCCC', padding: '0px', borderRadius: '100px' }}
              onClick={handleModalClose}
            >
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
        open={isPhoneUpdate}
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
}
