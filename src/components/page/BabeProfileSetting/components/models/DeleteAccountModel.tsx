'use client';
import React, { useState } from 'react';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import SimpleDialog from '@/components/atoms/modal';
import UseBabeProfileSettingHook from '../../useBabeProfileSettingHook';
import { BabeProfileSettingType } from '../../BabeProfileSettingContext';
import styles from '../../babeProfileSetting.module.css';
import * as keys from '@/keys/firestoreKeys';
import { auth, db } from '@/credentials/firebase';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

const DeleteAccountModel = ({ isDeleteAccount, setIsDeleteAccount }: any) => {
  const { t, uid, isMobile }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const [deleteUserLoading, setDeleteUserLoading] = useState<boolean>(false);
  const [deleteInput, setDeleteInput] = useState<string | undefined>(undefined);
  const handleModalClose = () => {
    setIsDeleteAccount(false);
  };
  const deleteClick = async () => {
    setDeleteUserLoading(true);
    await updateDoc(doc(db, keys.USERS, uid || ''), {
      [keys.mobileUrlKey]: deleteField(),
      [keys.bioKey]: deleteField(),
      [keys.nicknameKey]: deleteField(),
      [keys.genderKey]: deleteField(),
      [keys.dateOfBirthKey]: deleteField(),
      [keys.phoneNumberKey]: deleteField(),
      [keys.availabilityKey]: deleteField(),
      [keys.cacheVideoUrlsKey]: deleteField(),
      [keys.geoEncodingsKey]: deleteField(),
      [keys.foodPrefKey]: deleteField(),
      [keys.heightKey]: deleteField(),
      [keys.orientationKey]: deleteField(),
      [keys.raceKey]: deleteField(),
      [keys.servicesKey]: deleteField(),
      [keys.stateKey]: deleteField(),
      [keys.urlsKey]: deleteField(),
      [keys.voiceUrlKey]: deleteField(),
      ['completedstep']: deleteField(),
    });

    await auth.signOut();
    setDeleteUserLoading(false);
    setTimeout(() => {
      window.location.href = '';
    }, 1800);
  };
  return (
    <>
      <SimpleDialog
        modelWidth={!isMobile ? '552px' : 'fit-content'}
        isDeleteModel={true}
        borderRadius={24}
        footer={
          <>
            <Button className={styles.cancelBtn}>
              <Typography variant="subtitle1" onClick={handleModalClose}>
                {t('modalButton.cancel')}
              </Typography>
            </Button>
            <Button
              loading={deleteUserLoading}
              className={styles.deleteBtn}
              disabled={deleteInput !== 'DELETE'}
              onClick={deleteClick}
            >
              <Typography variant="subtitle1">
                {' '}
                {isMobile ? t('profileSetting.delete') : t('profileSetting.deleteAccount')}
              </Typography>
            </Button>
          </>
        }
        open={isDeleteAccount}
        title={<Typography variant="h3">{t('profileSetting.deleteAccount')}</Typography>}
      >
        {!isMobile && (
          <Typography variant="body1" sx={{ color: '#646464', display: 'flex', marginTop: '16px' }}>
            {t('profileSetting.deleteConfirm')} &nbsp;
            <Typography variant="subtitle1">{t('profileSetting.deleteCaps')}</Typography>
          </Typography>
        )}
        <Input sx={{ width: '100%', marginTop: '16px' }} onChange={(e) => setDeleteInput(e.target.value)} />
      </SimpleDialog>
    </>
  );
};

export default DeleteAccountModel;
