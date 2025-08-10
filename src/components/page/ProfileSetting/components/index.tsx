import React from 'react';
import Box from '@/components/atoms/box';
import Input from '@/components/atoms/input';
import InputPhone from '@/components/molecules/phoneinput';
import { useTranslations } from 'next-intl';

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

export default UserPhoneDetail;
