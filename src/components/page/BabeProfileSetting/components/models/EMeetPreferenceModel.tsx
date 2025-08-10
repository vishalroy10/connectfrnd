'use client';
import React from 'react';
import { Grid, Typography } from '@mui/material';
import styles from '../../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import { BabeProfileSettingType } from '../../BabeProfileSettingContext';
import UseBabeProfileSettingHook from '../../useBabeProfileSettingHook';
import SimpleDialog from '@/components/atoms/modal';
import { useFormik } from 'formik';
import { iAmFreeTodaySchema } from '../ProfileSetting.validation';
import CheckBox from '@/components/atoms/checkbox';

const applications = [
  { label: 'Whatsapp', value: 'Whatsapp' },
  { label: 'Telegram', value: 'Telegram' },
  { label: 'Discord', value: 'Discord' },
  { label: 'Viber', value: 'Viber' },
  { label: 'Facebook Messenger', value: 'Facebook Messenger' },
  { label: 'Line', value: 'Line' },
  { label: 'Wechat', value: 'Wechat' },
  { label: 'Kakaotalk', value: 'Kakaotalk' },
];

const serviceType = [
  { label: 'Text', value: 'Text' },
  { label: 'Audio', value: 'Audio' },
  { label: 'Video', value: 'Video' },
];
const EMeetPreferenceModel = ({ eMeetPreference, setEMeetPreference }: any) => {
  const { t }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const handleModalClose = () => {
    setEMeetPreference(false);
  };
  const formikInitialValues = {
    from: '',
    to: '',
    area: '',
    services: '',
    remarks: '',
  };
  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: iAmFreeTodaySchema,
    onSubmit: () => {
      handleModalClose();
    },
  });
  return (
    <>
      <SimpleDialog
        footer={
          <>
            <Button onClick={handleModalClose} className={styles.footerCancelButton}>
              <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
            </Button>
            <Button
              onClick={() => formik.handleSubmit()}
              variant="contained"
              className={styles.footerDoneButton}
              loading={false}
            >
              <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
            </Button>
          </>
        }
        open={eMeetPreference}
        title=""
        modelWidth="1200px"
        isDeleteModel={true}
        borderRadius={24}
      >
        <Typography variant="h3" mb={2}>
          E-Meet Preferences
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: '8px' }}>
          Types
        </Typography>
        <Grid container>
          {serviceType.map(({ label, value }, idx) => (
            <Grid sx={{ paddingLeft: '6px' }} item xs={12} sm={12} md={6} lg={6} key={idx + 1}>
              <CheckBox
                // onChange={}
                color="primary"
                value={value}
                label={<Typography variant="body1">{label}</Typography>}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" sx={{ marginTop: '8px' }}>
          Applications
        </Typography>
        <Grid container>
          {applications.map(({ label, value }, idx) => (
            <Grid sx={{ paddingLeft: '6px' }} item xs={12} sm={12} md={6} lg={6} key={idx + 1}>
              <CheckBox
                // onChange={}
                color="primary"
                value={value}
                label={<Typography variant="subtitle2">{label}</Typography>}
              />
            </Grid>
          ))}
        </Grid>
      </SimpleDialog>
    </>
  );
};

export default EMeetPreferenceModel;
