import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import { Card, CardContent, InputAdornment, OutlinedInput, TextareaAutosize } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import CheckBox from '@/components/atoms/checkbox';
import Button from '@/components/atoms/button';
import SimpleDialog from '@/components/atoms/modal';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import InviteUser from './components';
import { uniqBy } from 'lodash';
import ToolTip from '@/components/atoms/tooltip';
import InfoIcon from '@/components/atoms/icons/info';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { Helper } from '@/utility/helper';
import { useUserStore } from '@/store/reducers/usersReducer';
import Image from 'next/image';
import { IMeetUpService } from '@/components/page/BabeProfileSetting/components/interface';

interface serviceProps {
  item: IMeetUpService;
  service: IMeetUpService[];
  setService: React.Dispatch<React.SetStateAction<IMeetUpService[]>>;
  currentValue: IMeetUpService | undefined;
  uid: string | null | undefined;
  btnDisable: boolean;
}

const ServiceCard = ({ service = [], item, currentValue, setService, uid, btnDisable }: serviceProps) => {
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const getSbyprtValue = (price: number, ratings: number, numberOfRents: number) => {
    const sort = Helper.sortByPricesValue(price, ratings, numberOfRents);

    return sort;
  };
  const t = useTranslations('profile');
  const currentDate = dayjs();

  const [check, setCheck] = useState<boolean>(!!currentValue);
  const [openInviteUserModal, setOpenInviteUserModal] = useState<boolean>(false);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  useEffect(() => {
    setCheck(!!currentValue);
  }, [currentValue]);

  useEffect(() => {
    setTimeout(() => {
      setOpenTooltip(false);
    }, 5000);
  }, [openTooltip]);

  const fixNumber = (number: number) => {
    const stringWithoutZeros = String(number).replace(/^0+/, '');
    const result = stringWithoutZeros === '' ? 0 : Math.ceil(Number(stringWithoutZeros));
    return result;
  };
  return (
    <>
      <Card className={styles.card}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" gap={4} justifyContent="space-between" width="100%" alignItems="flex-start">
              <Box
                display="flex"
                height={92}
                width={92}
                minWidth={92}
                position={'relative'}
                flexDirection="column"
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
                sx={{ background: '#fff', borderRadius: '12px' }}
              >
                <CheckBox
                  className={styles.checkBox}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setCheck((e.target as HTMLInputElement).checked);
                    if ((e.target as HTMLInputElement).checked) {
                      setService(
                        uniqBy(
                          [
                            ...service,
                            {
                              id: item?.id,
                              category: item?.id,
                              title: item?.type,
                              image: item?.image,
                              description: item?.tooltip,
                              t: currentDate.format('DD MMMM YYYY [at] HH:mm:ss [UTC]Z'),
                            },
                          ],
                          'id'
                        )
                      );
                    } else {
                      setService(service?.filter((i: IMeetUpService) => i?.id !== item?.id));
                    }
                  }}
                  checked={check}
                  sx={{ width: '20px', height: '20px', marginLeft: '8px', marginTop: '8px' }}
                />
                <Image alt="" src={item?.image || ''} width={45} />
              </Box>
              <Box>
                <Typography sx={{ lineHeight: '20px' }}>
                  {item?.type}&nbsp;
                  {item?.tooltip && (
                    <ToolTip title={item?.tooltip} color="#999" placement={'bottom'}>
                      <InfoIcon />
                    </ToolTip>
                  )}
                </Typography>
                <TextareaAutosize
                  placeholder="Intro"
                  className={
                    check && (currentValue?.bio === '' || !currentValue?.bio) && btnDisable
                      ? styles.textAreaWithError
                      : styles.textArea
                  }
                  value={check ? currentValue?.bio : ''}
                  minRows={1.5}
                  disabled={!check}
                  onChange={(e) => {
                    const newService = {
                      ...currentValue,
                      bio: e.target.value,
                    };

                    setService([...service.filter((i: IMeetUpService) => i?.id !== item?.id), newService]);
                  }}
                  style={{ maxWidth: '239px', resize: 'none' }}
                />
                {check && (currentValue?.bio === '' || !currentValue?.bio) && btnDisable && (
                  <Typography variant="h6" sx={{ color: 'red', margin: '-15px 0 5px 0' }}>
                    Required
                  </Typography>
                )}
                <ToolTip title={t('servicesCard.creditSGD')} color="#999" placement={'bottom'} open={openTooltip}>
                  <OutlinedInput
                    type="number"
                    fullWidth
                    inputProps={{ min: 0 }}
                    disabled={!check}
                    placeholder="Price"
                    value={check ? currentValue?.price : ''}
                    endAdornment={<InputAdornment position="end">/hr</InputAdornment>}
                    className={
                      check && (currentValue?.price === '' || !currentValue?.price) && btnDisable
                        ? styles.priceInputWithError
                        : styles.priceInput
                    }
                    sx={{ background: check ? '#FFF' : '#f6f6f6' }}
                    onClick={() => setOpenTooltip(true)}
                    onChange={(e) => {
                      if (Number(e.target.value) < 0) {
                        return false;
                      }
                      const newService = {
                        ...currentValue,
                        price: fixNumber(Number(e.target.value)),
                        sbyprt: getSbyprtValue(
                          fixNumber(Number(e.target.value)) * 100,
                          currentUser.ratings ?? 0,
                          currentUser.numberOfRents ?? 0
                        ),
                        suffix: 1,
                      };
                      setService([...service.filter((i: IMeetUpService) => i?.id !== item?.id), newService]);
                    }}
                  />
                </ToolTip>
                {check && (currentValue?.price === '' || !currentValue?.price) && btnDisable && (
                  <Typography variant="h6" sx={{ color: 'red', margin: '-13px 0 5px 0' }}>
                    Required
                  </Typography>
                )}
                {item.type === 'Double Dates' && (
                  <Button
                    disabled={!check}
                    sx={{ border: '1px solid #CCCCCC', width: 'fit-content', background: '#FFF', marginTop: '12px' }}
                    onClick={() => setOpenInviteUserModal(true)}
                  >
                    <Typography variant="subtitle1">{t('modalButton.inviteUser')}</Typography>
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <SimpleDialog
        open={openInviteUserModal}
        borderRadius={24}
        footer={
          <>
            <Button onClick={() => setOpenInviteUserModal(false)} className={styles.footerCancelButton}>
              <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
            </Button>
          </>
        }
        title=""
        maxWidth={'lg'}
        isDeleteModel={true}
      >
        <InviteUser uid={uid} setOpenInviteUserModal={setOpenInviteUserModal} />
      </SimpleDialog>
    </>
  );
};

export default memo(ServiceCard);
