'use client';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import styles from '../../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import { BabeProfileSettingType } from '../../BabeProfileSettingContext';
import UseBabeProfileSettingHook from '../../useBabeProfileSettingHook';
import SimpleDialog from '@/components/atoms/modal';
import CheckBox from '@/components/atoms/checkbox';
import DragUpload from '@/components/molecules/upload/dragupload';
import UploadIconNew from '@/components/atoms/icons/uploadIconNew';
import { rejectReasonAfterKey, videoVerificationKey } from '@/keys/firestoreKeys';
import { deleteField } from 'firebase/firestore';
import { VERIFICATION } from '@/keys/storageKeys';

const VerificationModel = ({ isVerification, setIsVerification }: any) => {
  const { t, uid, handleImageVideoChange, handleUpdate }: BabeProfileSettingType = UseBabeProfileSettingHook();

  const [loading, isLoading] = useState<boolean>(false);
  const [firstTermAndConditions, setFirstTermAndConditions] = useState<boolean>(false);
  const [secondTermAndConditions, setSecondTermAndConditions] = useState<boolean>(false);
  const [frontImages, setFrontImages] = useState<string[]>([]);
  const [frontViewImages, setFrontViewImages] = useState<string[]>([]);
  const [backImages, setBackImages] = useState<string[]>([]);
  const [backViewImages, setBackViewImages] = useState<string[]>([]);
  const handleModalClose = () => {
    setIsVerification(false);
  };

  const handleDeleteImageFront = (key: number, type: string) => {
    if (type === 'Image') {
      setFrontImages([]);
    } else {
      setFrontViewImages([]);
    }
  };
  const handleDeleteImageBack = (key: number, type: string) => {
    if (type === 'Image') {
      setBackImages([]);
    } else {
      setBackViewImages([]);
    }
  };

  const handleSubmit = async () => {
    try {
      isLoading(true);
      const imageUrls = [];
      if (frontImages.length > 0) {
        const frontImagesUrl = await handleImageVideoChange(frontImages, `${VERIFICATION}/${uid}`);
        imageUrls.push(...frontImagesUrl);
      }
      if (backImages.length > 0) {
        const backImagesUrl = await handleImageVideoChange(backImages);
        imageUrls.push(...backImagesUrl);
      }
      const updateData: Record<string, any> = {
        [rejectReasonAfterKey]: deleteField(),
        [videoVerificationKey]: false,
      };

      await handleUpdate(updateData, uid);
      handleModalClose();
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      isLoading(false);
    }
  };
  return (
    <>
      <SimpleDialog
        footer={
          <>
            <Button onClick={handleModalClose} className={styles.footerCancelButton}>
              <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
            </Button>
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              className={styles.footerDoneButton}
              loading={loading}
              disabled={
                !firstTermAndConditions ||
                !secondTermAndConditions ||
                (frontImages.length === 0 && frontViewImages.length === 0) ||
                (backImages.length === 0 && backViewImages.length === 0)
              }
            >
              <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
            </Button>
          </>
        }
        open={isVerification}
        title=""
        modelWidth="1200px"
        isDeleteModel={true}
        borderRadius={24}
      >
        <Typography variant="h3" mb={2}>
          Upload ID
        </Typography>
        <Grid container spacing={5}>
          <Typography variant="subtitle2" sx={{ marginTop: '20px', marginLeft: '24px' }}>
            Take a clear selfie of you holding your government issued ID (driving license, passport, etc...). You may
            censor any sensitive information on the document except for date of birth and face photo.
          </Typography>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="subtitle1" className={styles.uploadVideos}>
              Front ID
            </Typography>
            <DragUpload
              images={backImages}
              // setImage={setImage}
              setImages={setBackImages}
              fromSteps={true}
              multiple={true}
              isImageViewAuto={false}
              viewImages={backViewImages}
              handleDelete={handleDeleteImageBack}
              maxLimit={1}
              setViewImages={setBackViewImages}
              icon={<UploadIconNew />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="subtitle1" className={styles.uploadVideos}>
              Back ID
            </Typography>
            <DragUpload
              images={frontImages}
              setImages={setFrontImages}
              fromSteps={true}
              multiple={true}
              isImageViewAuto={false}
              viewImages={frontViewImages}
              handleDelete={handleDeleteImageFront}
              maxLimit={1}
              setViewImages={setFrontViewImages}
              icon={<UploadIconNew />}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckBox
              onChange={(e) => setFirstTermAndConditions(e.target.checked)}
              color="primary"
              checked={firstTermAndConditions}
              value=""
              label={
                <Typography variant="subtitle2">
                  I understand that I was informed to censor off all sensitive information on the documents that I had
                  submitted except for <strong>date of birth and face photo.</strong>
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CheckBox
              onChange={(e) => setSecondTermAndConditions(e.target.checked)}
              color="primary"
              checked={secondTermAndConditions}
              value=""
              label={
                <Typography variant="subtitle2">
                  I consent that the platform may collect, use and disclose my date of birth and face photo information
                  to verify my age and to prove my identity, in accordance with the Personal Data Protection Act 2012.
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </SimpleDialog>
    </>
  );
};

export default VerificationModel;
