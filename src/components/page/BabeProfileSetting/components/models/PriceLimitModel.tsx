'use client';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import styles from '../../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import { BabeProfileSettingType } from '../../BabeProfileSettingContext';
import UseBabeProfileSettingHook from '../../useBabeProfileSettingHook';
import SimpleDialog from '@/components/atoms/modal';
import PriceLimitModal from '@/components/organisms/priceLimitModal';
import { operatorKeyKey, priceLimitKey, spendLimitKey, walletLimitKey } from '@/keys/firestoreKeys';

const PriceModel = ({ priceLimit, setPriceLimit }: any) => {
  const { t, uid, data, handleUpdate }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const handleModalClose = () => {
    setPriceLimit(false);
  };

  const [marksVal, setMarksVal] = useState<number | undefined>();
  const [creditAmount, setCreditAmount] = useState<number | undefined>();
  const [selectedRadioValue, setSelectedRadioValue] = useState<number | undefined>();
  const [priceLimitLoading, setPriceLimitLoading] = useState<boolean>(false);

  useEffect(() => {
    setCreditAmount(data?.get(priceLimitKey)?.slmt / 100);
    setSelectedRadioValue(data?.get(priceLimitKey)?.opkey);
    setMarksVal(data?.get(priceLimitKey)?.wlmt / 100);
  }, [data]);

  const handleDone = async () => {
    setPriceLimitLoading(true);
    try {
      const priceData: Record<string, any> = {};
      priceData[operatorKeyKey] = selectedRadioValue;
      priceData[walletLimitKey] = marksVal && marksVal * 100;
      priceData[spendLimitKey] = creditAmount && creditAmount * 100;

      const updateData: Record<string, any> = {};
      updateData[priceLimitKey] = priceData;
      if (!(selectedRadioValue === 0 || selectedRadioValue === 1) && marksVal && creditAmount) {
        console.log('updateData', updateData);
        await handleUpdate(updateData, uid);
      }

      setPriceLimitLoading(false);
      handleModalClose();
    } catch (e) {
      console.log('Error', e);
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
              onClick={() => handleDone()}
              variant="contained"
              className={styles.footerDoneButton}
              loading={priceLimitLoading}
            >
              <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
            </Button>
          </>
        }
        open={priceLimit}
        title=""
        modelWidth="1200px"
        isDeleteModel={true}
        borderRadius={24}
      >
        <PriceLimitModal
          setMarksVal={setMarksVal}
          marksVal={marksVal}
          creditAmount={creditAmount}
          setCreditAmount={setCreditAmount}
          selectedRadioValue={selectedRadioValue}
          setSelectedRadioValue={setSelectedRadioValue}
          handleDone={handleDone}
          isModel={true}
        />
      </SimpleDialog>
    </>
  );
};

export default PriceModel;
