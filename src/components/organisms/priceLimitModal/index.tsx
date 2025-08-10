import Box from '@/components/atoms/box';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import { FormControlLabel, Radio, RadioGroup, Slider, useMediaQuery } from '@mui/material';
import React, { ChangeEvent } from 'react';
import styles from '../../page/OnboardingSteps/onboarding.module.css';
import Button from '@/components/atoms/button';
import { OperatorEnum } from '@/enum/myEnum';
import { useUserStore } from '@/store/reducers/usersReducer';
import { useTranslations } from 'next-intl';
import { priceLimitModalProps } from '@/components/page/OnboardingSteps/components/interface';

const DiscreteSliderMarks = ({ ...props }) => {
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 200,
      label: '200',
    },
  ];

  return (
    <Box width={300} padding={2}>
      <Slider {...props} color="secondary" step={5} valueLabelDisplay="auto" marks={marks} min={0} />
    </Box>
  );
};

const PriceLimitModal = ({
  creditAmount,
  setCreditAmount,
  selectedRadioValue,
  setSelectedRadioValue,
  handleDone,
  marksVal,
  setMarksVal,
  isModel=false
}: priceLimitModalProps) => {
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const isMobile = useMediaQuery('(max-width: 600px)');
  const t = useTranslations('profile');
  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    setSelectedRadioValue(parseInt(value));
  };

  return (
    <>
      <Box sx={{ width: isMobile ? 'fit-content' : '600px' }}>
        <Box>
          <Typography variant="h3" sx={{ marginBottom: '16px' }}>
            {t('servicesCard.priceLimit')}
          </Typography>
        </Box>
        {(selectedRadioValue === 0 || selectedRadioValue === 1) && (
          <Box className={styles.infoBox} sx={{ marginBottom: '20px' }}>
            <Typography variant="body2" sx={{ color: '#37aaf2' }}>
              {t('servicesCard.virtualCurrency')} &nbsp;
              {t('servicesCard.creditSGD')}
            </Typography>
          </Box>
        )}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '12px' }}>
            {t('servicesCard.creditInWalletBalance')}
          </Typography>

          <DiscreteSliderMarks
            defaultValue={marksVal && marksVal}
            getAriaValueText={(value: any) => {
              setMarksVal(value);
            }}
            max={currentUser?.encods && currentUser?.encods?.includes('Indonesia' || 'Malaysia') ? 50 : 200}
          />
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <Typography variant="body2" sx={{ marginBottom: '12px' }}>
            {t('servicesCard.totalCreditSpentPlatform')}
          </Typography>
          <Input
            type="number"
            placeholder="Credit"
            fullWidth
            onChange={(e) => setCreditAmount(parseInt(e.target.value))}
            value={creditAmount && creditAmount}
          />
        </Box>
        {creditAmount ? (
          <>
            <Box sx={{ marginBottom: '20px' }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={onChangeHandle}
                value={selectedRadioValue}
              >
                <FormControlLabel value={OperatorEnum.either} control={<Radio />} label={t('servicesCard.criteria')} />
                <FormControlLabel
                  value={OperatorEnum.both}
                  control={<Radio />}
                  label={t('servicesCard.bothCriteria')}
                />
              </RadioGroup>
              {!(selectedRadioValue === 0 || selectedRadioValue === 1) && (
                <Typography sx={{ color: 'red' }}>Required*</Typography>
              )}
            </Box>
          </>
        ) : (
          ''
        )}
        <Box>
          <Typography>
            Hi {currentUser?.nickname ? currentUser?.nickname.capitalize() : '[client]'} 👋🏻
            <br />
            <br />I have set certain restriction to my profile to prevent spammed messages.&nbsp;
            {marksVal ? (
              <>
                You will need at least <b>{marksVal.toFixed(2)}</b> credit balance in your wallet
              </>
            ) : (
              ''
            )}
            <b>
              {selectedRadioValue !== undefined && `${selectedRadioValue === OperatorEnum.both ? ' AND ' : ' OR '}`}
            </b>
            {creditAmount ? (
              <>
                you will need to spend at least <b>{creditAmount.toFixed(2)}</b> credit on the platform
              </>
            ) : (
              ''
            )}
            &nbsp;in order to start a conversation with me.
            <br />
            <br />
            Thank you,
            <br />
            {currentUser?.nickname ? currentUser?.nickname.capitalize() : '[nickname]'}
          </Typography>
        </Box>
      </Box>
      {isMobile && !isModel && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '36px',
            width: '-webkit-fill-available',
            margin: '0 30px 0 0',
          }}
        >
          <Button
            disabled={!!creditAmount && selectedRadioValue !== 0 && selectedRadioValue !== 1}
            variant="contained"
            sx={{ width: '100%', height: '48px', margin: '16px 0' }}
            onClick={handleDone}
          >
            <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
          </Button>
        </Box>
      )}
    </>
  );
};

export default PriceLimitModal;
