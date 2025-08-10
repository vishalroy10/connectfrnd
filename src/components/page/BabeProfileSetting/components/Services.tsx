'use client';
import React, { useMemo, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import styles from '../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import UseBabeProfileSettingHook from '../useBabeProfileSettingHook';
import { BabeProfileSettingType } from '../BabeProfileSettingContext';
import BackButton from './BackButton';
import SimpleDialog from '@/components/atoms/modal';
import ServicesModal from '@/components/organisms/servicesModal';
import { priceLimitKey, servicesKey } from '@/keys/firestoreKeys';
import LeftArrowIcon from '@/components/atoms/icons/left-arrow';
import PriceModel from './models/PriceLimitModel';
import { OperatorEnum } from '@/enum/myEnum';
import EMeetPreferenceModel from './models/EMeetPreferenceModel';
import Image from 'next/image';
import { IService } from './interface';

const Services = () => {
  const [priceLimit, setPriceLimit] = useState(false);
  const [eMeetPreference, setEMeetPreference] = useState(false);

  const {
    setService,
    setGamesService,
    setEMeetService,
    setSportServices,
    setBtnDisable,
    setChooseServicesModal,
    t,
    uid,
    isMobile,
    data,
    service,
    gamesService,
    EMeetService,
    sportServices,
    btnDisable,
    chooseServicesModal,
    servicesLoading,
  }: BabeProfileSettingType = UseBabeProfileSettingHook();

  const selectedServices = useMemo(() => {
    const selectedServices: IService[] = [];
    for (const outerKey in data?.get(servicesKey)) {
      const innerObject = data?.get(servicesKey)[outerKey];
      for (const innerKey in innerObject) {
        const item = innerObject[innerKey];
        selectedServices.push(item);
      }
    }
    return selectedServices;
  }, [data]);
  return (
    <>
      {isMobile && chooseServicesModal ? (
        <>
          <Box className={styles.flexContainer} onClick={() => setChooseServicesModal(false)}>
            <Box className={styles.iconBox}>
              <LeftArrowIcon />
            </Box>
            <Box className={styles.textBox}>
              <Typography variant="subtitle2">Back</Typography>
            </Box>
          </Box>
          <Typography variant="h2" mb={2}>
            Choose Service
          </Typography>
          <ServicesModal
            service={service}
            setService={setService}
            uid={uid}
            btnDisable={btnDisable}
            setBtnDisable={setBtnDisable}
            gamesService={gamesService}
            setGamesService={setGamesService}
            EMeetService={EMeetService}
            setEMeetService={setEMeetService}
            sportServices={sportServices}
            setSportServices={setSportServices}
            setChooseServicesModal={setChooseServicesModal}
          />
        </>
      ) : (
        <>
          <Box className={styles.container}>
            <BackButton title={isMobile && chooseServicesModal ? 'Choose Service' : 'Services'} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box className={styles.cardHeading}>Services</Box>

                <Button
                  sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
                  onClick={() => setChooseServicesModal(true)}
                >
                  Edit
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {selectedServices.map((item: any, key: any) => {
                    return (
                      <>
                        <Grid item xs={12} sm={6} md={6} key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              marginRight: '12px',
                              width: '36px',
                              height: '36px',
                              background: '#fff',
                              borderRadius: '50%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image alt="" src={item?.image || ''} width={24} height={24} />
                          </Box>
                          <Box>
                            <Typography variant="h5">{item?.title}</Typography>
                            <Typography variant="body2" sx={{ color: '#999999' }}>
                              {item?.price} {item?.suffix === 0 ? '/15min' : item?.suffix === 1 ? '/1hr' : '/game'}
                            </Typography>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
              <Box className={styles.cardHeading}>Price Limit</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'block', alignItems: 'center' }}>
                  <Typography variant="body1">
                    Restrict by wallet limit: <strong>{data?.get(priceLimitKey)?.wlmt / 100 || 0}</strong> credit{' '}
                    <strong>
                      {data?.get(priceLimitKey)?.opkey !== undefined &&
                        `${data?.get(priceLimitKey)?.opkey === OperatorEnum.both ? ' AND ' : ' OR '}`}
                    </strong>
                  </Typography>
                  <Typography variant="body1">
                    spend limit: <strong>{data?.get(priceLimitKey)?.slmt / 100 || 0}</strong>
                  </Typography>
                </Box>

                <Button
                  sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
                  onClick={() => setPriceLimit(true)}
                >
                  Edit
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
              <Box className={styles.cardHeading}>E-Meet perferences</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'block', alignItems: 'center' }}>
                  <Typography variant="body1">
                    Types of call: <strong>Text, Audio</strong>
                  </Typography>
                  <Typography variant="body1">
                    Application: <strong>Viber, Telegram, Instagram</strong>
                  </Typography>
                </Box>

                <Button
                  sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
                  onClick={() => setEMeetPreference(true)}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
      {!isMobile && (
        <SimpleDialog
          footer={
            <>
              <Button onClick={() => setChooseServicesModal(false)} className={styles.footerCancelButton}>
                <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
              </Button>
              <Button
                onClick={() => {
                  // handleSubmitService();
                }}
                variant="contained"
                className={styles.footerDoneButton}
                loading={servicesLoading}
              >
                <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
              </Button>
            </>
          }
          open={chooseServicesModal}
          title=""
          maxWidth={'lg'}
          isDeleteModel={true}
          borderRadius={24}
        >
          <ServicesModal
            service={service}
            setService={setService}
            uid={uid}
            btnDisable={btnDisable}
            gamesService={gamesService}
            setGamesService={setGamesService}
            EMeetService={EMeetService}
            setEMeetService={setEMeetService}
            sportServices={sportServices}
            setSportServices={setSportServices}
            setChooseServicesModal={setChooseServicesModal}
            setBtnDisable={setBtnDisable}
          />
        </SimpleDialog>
      )}
      <PriceModel priceLimit={priceLimit} setPriceLimit={setPriceLimit} />
      <EMeetPreferenceModel eMeetPreference={eMeetPreference} setEMeetPreference={setEMeetPreference} />
    </>
  );
};

export default Services;
