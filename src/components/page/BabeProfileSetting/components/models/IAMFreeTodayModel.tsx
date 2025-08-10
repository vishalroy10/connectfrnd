'use client';
import React from 'react';
import { FormHelperText, Grid, Typography } from '@mui/material';
import styles from '../../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import { BabeProfileSettingType } from '../../BabeProfileSettingContext';
import UseBabeProfileSettingHook from '../../useBabeProfileSettingHook';
import SimpleDialog from '@/components/atoms/modal';
import { useFormik } from 'formik';
import { iAmFreeTodaySchema } from '../ProfileSetting.validation';
import Input from '@/components/atoms/input';
import RadioButtons from '@/components/atoms/radio';

const servicesOptions = [
  { label: 'Meetup', value: 'Meetup' },
  { label: 'E-Meet', value: 'E-Meet' },
  { label: 'Games', value: 'Games' },
  { label: 'Sports', value: 'Sports' },
];
const IAMFreeTodayModel = ({ iAmFreeToday, setIAMFreeToday }: any) => {
  const { t }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const handleModalClose = () => {
    setIAMFreeToday(false);
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
        open={iAmFreeToday}
        title=""
        modelWidth="1200px"
        isDeleteModel={true}
        borderRadius={24}
      >
        <Typography variant="h3" mb={2}>
          I am free today
        </Typography>
        <Grid container spacing={2}>
          <Grid item className={styles.inputFieldBox} xs={6}>
            <Typography variant="subtitle1" className={styles.formLabel}>
              From
            </Typography>
            <Input
              className={styles.usernameInput}
              type="time"
              placeholder="HH:MM"
              name="from"
              value={formik.values.from}
              onChange={formik.handleChange}
              error={formik.touched.from && Boolean(formik.errors.from)}
              helperText={formik.touched.from && formik.errors.from}
            />
          </Grid>

          <Grid item className={styles.inputFieldBox} xs={6}>
            <Typography variant="subtitle1" className={styles.formLabel}>
              To
            </Typography>
            <Input
              className={styles.usernameInput}
              type="time"
              placeholder="HH:MM"
              name="to"
              value={formik.values.to}
              onChange={formik.handleChange}
              error={formik.touched.to && Boolean(formik.errors.to)}
              helperText={formik.touched.to && formik.errors.to}
            />
          </Grid>

          <Grid item className={styles.inputFieldBox} xs={12}>
            <Typography variant="subtitle1" className={styles.formLabel}>
              Which area are you coming from?
            </Typography>
            <Input
              className={styles.usernameInput}
              type="text"
              placeholder="Which area are you coming from?"
              name="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              error={formik.touched.area && Boolean(formik.errors.area)}
              helperText={formik.touched.area && formik.errors.area}
            />
          </Grid>
          <Grid item className={styles.inputFieldBox} xs={12}>
            <Typography variant="subtitle1" className={styles.formLabel}>
              Services
            </Typography>
            <RadioButtons
              label="Services"
              options={servicesOptions}
              value={formik.values.services}
              name="service"
              onChange={formik.handleChange}
            />
            {formik.touched.services && Boolean(formik.errors.services) && (
              <FormHelperText error id="services-error">
                {formik.touched.services && formik.errors.services}
              </FormHelperText>
            )}
          </Grid>
          <Grid item className={styles.inputFieldBox} xs={12}>
            <Typography variant="subtitle1" className={styles.formLabel}>
              Remarks (options)
            </Typography>
            <Input
              className={styles.usernameInput}
              type="text"
              placeholder="Enter remark"
              name="remarks"
              multiline
              maxRows={4}
              value={formik.values.remarks}
              onChange={formik.handleChange}
              error={formik.touched.remarks && Boolean(formik.errors.remarks)}
              helperText={formik.touched.remarks && formik.errors.remarks}
            />
          </Grid>
        </Grid>
      </SimpleDialog>
    </>
  );
};

export default IAMFreeTodayModel;
