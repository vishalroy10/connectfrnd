import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Box from '@/components/atoms/box';
import Button from '@/components/atoms/button';
import LeftArrowIcon from '@/components/atoms/icons/left-arrow';
import Typography from '@/components/atoms/typography';
import SimpleDialog from '@/components/atoms/modal';
import ServicesModal from '@/components/organisms/servicesModal';
import PriceLimitModal from '@/components/organisms/priceLimitModal';
import LoadingIcon from '@/components/atoms/icons/loading';
import * as keys from '@/keys/firestoreKeys';

import styles from '../onboarding.module.css';
import UseOnboardingHook from '../useOnboardingHook';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/credentials/firebase';
import { OnboardingType } from '../OnboardingContext';
import Image from 'next/image';

const Step2 = () => {
  const {
    handleNext,
    handlePrevious,
    handleModalClose,
    setService,
    setGamesService,
    setEMeetService,
    setSportServices,
    setBtnDisable,
    setChooseServicesModal,
    setPriceLimitModal,
    handleSubmitService,
    t,
    loading,
    isMobile,
    uid,
    data,
    service,
    gamesService,
    EMeetService,
    sportServices,
    btnDisable,
    chooseServicesModal,
    priceLimitModal,
    loadingDataLoader,
    selectedServices,
    servicesLoading,
  }: OnboardingType = UseOnboardingHook();
  const [marksVal, setMarksVal] = useState<number | undefined>();
  const [creditAmount, setCreditAmount] = useState<number | undefined>();
  const [selectedRadioValue, setSelectedRadioValue] = useState<number | undefined>();
  const [priceLimitLoading, setPriceLimitLoading] = useState<boolean>(false);

  useEffect(() => {
    setCreditAmount(data?.get(keys.priceLimitKey)?.slmt / 100);
    setSelectedRadioValue(data?.get(keys.priceLimitKey)?.opkey);
    setMarksVal(data?.get(keys.priceLimitKey)?.wlmt / 100);
  }, [data]);

  const handleDone = async () => {
    setPriceLimitLoading(true);
    try {
      const priceData: Record<string, any> = {};
      priceData[keys.operatorKeyKey] = selectedRadioValue;
      priceData[keys.walletLimitKey] = marksVal && marksVal * 100;
      priceData[keys.spendLimitKey] = creditAmount && creditAmount * 100;

      const updateData: Record<string, any> = {};
      updateData[keys.priceLimitKey] = priceData;
      const promises = [];
      if (!(selectedRadioValue === 0 || selectedRadioValue === 1) && marksVal && creditAmount) {
        const update = updateDoc(doc(db, keys.USERS, uid || ''), updateData);
        promises.push(update);
        await Promise.all(promises);
      }

      setPriceLimitModal(!priceLimitModal);
      setPriceLimitLoading(false);
    } catch (e) {
      console.log('Error', e);
    }
  };

  if (loading)
    return (
      <Box className={styles.loader}>
        <LoadingIcon />
      </Box>
    );
  return (
    <>
      <Box className={styles.container}>
        {isMobile && (chooseServicesModal || priceLimitModal) ? (
          <>
            <Box
              className={styles.flexContainer}
              onClick={() => {
                setChooseServicesModal(false);
                setPriceLimitModal(false);
              }}
              sx={{ marginBottom: '20px' }}
            >
              <Box className={styles.iconBox}>
                <LeftArrowIcon />
              </Box>
              <Box className={styles.textBox}>
                <Typography variant="subtitle2">{t('servicesCard.back')}</Typography>
              </Box>
            </Box>
            {chooseServicesModal && (
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
            )}
            {priceLimitModal && (
              <Box sx={{ height: 'calc(100vh - 300px)', overflow: 'scroll' }}>
                <PriceLimitModal
                  setMarksVal={setMarksVal}
                  marksVal={marksVal}
                  creditAmount={creditAmount}
                  setCreditAmount={setCreditAmount}
                  selectedRadioValue={selectedRadioValue}
                  setSelectedRadioValue={setSelectedRadioValue}
                  handleDone={handleDone}
                />
              </Box>
            )}
          </>
        ) : (
          <>
            <Box className={styles.flexContainer} onClick={handlePrevious}>
              <Box className={styles.iconBox}>
                <LeftArrowIcon />
              </Box>
              <Box className={styles.textBox}>
                <Typography variant="subtitle2">{t('servicesCard.back')}</Typography>
              </Box>
            </Box>
            <Box className={styles.servicesContainer}>
              <Typography variant="h2" className={styles.centerText}>
                {t('servicesCard.chooseYourServices')}
              </Typography>
              <Box className={styles.infoBox}>
                <Typography variant="body2" sx={{ color: '#37aaf2' }}>
                  {t('servicesCard.virtualCurrency')} <br /> {t('servicesCard.creditSGD')}
                </Typography>
              </Box>
              <Box className={styles.servicesBox}>
                <Box sx={{ borderBottom: '1px solid #CCCCCC' }}>
                  <Box className={styles.serviceHeader}>
                    <Typography variant="h5">{t('servicesCard.services')}</Typography>
                    <Button className={styles.button} onClick={() => setChooseServicesModal(true)}>
                      <Typography variant="subtitle1">
                        {selectedServices.length ? t('servicesCard.editServices') : t('servicesCard.chooseServices')}
                      </Typography>
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
                <Box className={styles.serviceHeader} sx={{ borderTop: '1px solid #CCCCCC' }}>
                  {!creditAmount ? <Typography variant="h5">{t('servicesCard.priceLimit')}</Typography> : ''}
                  {creditAmount ? (
                    <Box>
                      <Typography variant="h5">{t('servicesCard.priceLimit')}</Typography>
                      <Typography variant="body2" sx={{ color: '#646464' }}>
                        {t('servicesCard.restrictByWalletLimit')} <b>{marksVal && marksVal > 0 ? marksVal : 0}</b>{' '}
                        {t('servicesCard.credit')} <b>{t('servicesCard.or')}</b>
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#646464' }}>
                        {t('servicesCard.spendLimit')} <b>{creditAmount}</b>
                      </Typography>
                    </Box>
                  ) : (
                    ''
                  )}
                  <Button className={styles.button} onClick={() => setPriceLimitModal(true)}>
                    <Typography variant="subtitle1">
                      {marksVal && creditAmount ? t('servicesCard.editPriceLimit') : t('servicesCard.setPriceLimit')}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Button
              onClick={handleNext}
              disabled={selectedServices.length ? false : true}
              variant="contained"
              className={styles.nextButtonInner}
              loading={loadingDataLoader}
            >
              <Typography variant="subtitle1">{t('servicesCard.next')}</Typography>
            </Button>
          </>
        )}
      </Box>
      {!isMobile && (
        <SimpleDialog
          footer={
            <>
              <Button onClick={handleModalClose} className={styles.footerCancelButton}>
                <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
              </Button>
              <Button
                onClick={() => {
                  chooseServicesModal && handleSubmitService();
                  priceLimitModal && handleDone();
                }}
                disabled={
                  btnDisable ||
                  (!chooseServicesModal
                    ? creditAmount
                      ? !(selectedRadioValue === 0 || selectedRadioValue === 1)
                      : false
                    : false)
                }
                variant="contained"
                className={styles.footerDoneButton}
                loading={servicesLoading || priceLimitLoading}
              >
                <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
              </Button>
            </>
          }
          open={chooseServicesModal || priceLimitModal}
          title=""
          maxWidth={'lg'}
          isDeleteModel={true}
          borderRadius={24}
        >
          {chooseServicesModal ? (
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
          ) : (
            <PriceLimitModal
              setMarksVal={setMarksVal}
              marksVal={marksVal}
              creditAmount={creditAmount}
              setCreditAmount={setCreditAmount}
              selectedRadioValue={selectedRadioValue}
              setSelectedRadioValue={setSelectedRadioValue}
              handleDone={handleDone}
            />
          )}
        </SimpleDialog>
      )}
    </>
  );
};

export default Step2;
