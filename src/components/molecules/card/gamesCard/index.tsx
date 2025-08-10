import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';
import { Card, CardContent, Checkbox, OutlinedInput, TextareaAutosize } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/button';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import Dropdown from '../../dropdown';
import { uniqBy } from 'lodash';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/credentials/firebase';
import Avatar from '@/components/atoms/avatar';
import AvatarIcon from '@/components/atoms/icons/avatarIcon';
import ToolTip from '@/components/atoms/tooltip';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { UnitsEnum } from '@/enum/myEnum';
import { useUserStore } from '@/store/reducers/usersReducer';
import { Helper } from '@/utility/helper';
import Image from 'next/image';
import { IGameService } from '@/components/page/BabeProfileSetting/components/interface';

const selectGamePrice = [
  {
    label: (
      <Typography variant="body1" fontWeight={500} color="#1A1A1A" mr={2}>
        /15 min
      </Typography>
    ),
    key: '15min',
    value: UnitsEnum.min,
  },
  {
    label: (
      <Typography variant="body1" fontWeight={500} color="#1A1A1A" mr={2}>
        /1 hour
      </Typography>
    ),
    key: '1hour',
    value: UnitsEnum.hr,
  },
  {
    label: (
      <Typography variant="body1" fontWeight={500} color="#1A1A1A" mr={2}>
        /Game
      </Typography>
    ),
    key: 'game',
    value: UnitsEnum.game,
  },
];

interface gamesProps {
  item: IGameService;
  uid: string | null | undefined;
  btnDisable: boolean;
  setGamesService: React.Dispatch<React.SetStateAction<IGameService[]>>;
  currentValue: IGameService | undefined;
  gamesService: IGameService[];
  setBtnDisable: (arg: boolean) => void;
}

const GameCard = ({
  item,
  currentValue,
  gamesService = [],
  setGamesService,
  btnDisable,
  setBtnDisable,
}: gamesProps) => {
  const [check, setCheck] = useState(!!currentValue);
  const [loading, setLoading] = useState(false);
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const getSbyprtValue = (price: number, ratings: number, numberOfRents: number) => {
    const sort = Helper.sortByPricesValue(price, ratings, numberOfRents);

    return sort;
  };
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  const [suffixState, setSuffixState] = useState('/game');
  const t = useTranslations('profile');
  const currentDate = dayjs();

  useEffect(() => {
    setCheck(!!currentValue);
  }, [currentValue]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(false);
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const imageFile = e.target.files?.length && e.target.files[0];
    if (imageFile && allowedTypes.includes(imageFile.type)) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          switch (snapshot.state) {
            case 'paused':
              setLoading(false);
              console.log('Upload is paused');
              break;
            case 'running':
              setLoading(true);
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const newService = {
              ...currentValue,
              profile: url,
            };
            setGamesService([...gamesService.filter((i: IGameService) => i?.id !== item?.id), newService]);
          });
          setLoading(false);
        }
      );
      setLoading(false);
    } else {
      setLoading(false);
      console.log('File not found');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenTooltip(false);
    }, 2500);
  }, [openTooltip]);

  useEffect(() => {
    if (currentValue?.suffix === 0) {
      setSuffixState('/15min');
    } else if (currentValue?.suffix === 1) {
      setSuffixState('/1hr');
    } else {
      setSuffixState('/game');
    }
  }, [currentValue]);

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
                height={92}
                width={92}
                minWidth={92}
                position={'relative'}
                sx={{ background: 'transparent', borderRadius: '12px' }}
              >
                <Image alt="" src={item?.image || ''} width={92} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '2px',
                    left: '5px',
                  }}
                >
                  <Checkbox
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      setCheck((e.target as HTMLInputElement).checked);
                      if ((e.target as HTMLInputElement).checked) {
                        setGamesService(
                          uniqBy(
                            [
                              ...gamesService,
                              {
                                id: item?.id,
                                category: item?.id,
                                title: item?.type,
                                image: item?.image,
                                t: currentDate.format('DD MMMM YYYY [at] HH:mm:ss [UTC]Z'),
                                suffix: 1,
                              },
                            ],
                            'id'
                          )
                        );
                      } else {
                        setGamesService(gamesService?.filter((i: IGameService) => i?.id !== item?.id));
                      }
                    }}
                    checked={check}
                    className={styles.gamesCheckBox}
                  />
                </Box>
              </Box>
              <Box>
                <Typography sx={{ lineHeight: '20px' }}>{item?.type}</Typography>
                <TextareaAutosize
                  placeholder="Intro"
                  className={
                    check && (currentValue?.bio === '' || !currentValue?.bio) && btnDisable
                      ? styles.textAreaWithError
                      : styles.textArea
                  }
                  minRows={1.5}
                  value={check ? currentValue?.bio : ''}
                  disabled={!check}
                  onChange={(e) => {
                    const newService = {
                      ...currentValue,
                      bio: e.target.value,
                    };

                    setGamesService([...gamesService.filter((i: IGameService) => i?.id !== item?.id), newService]);
                  }}

                  style={{ maxWidth: '239px' }}
                />
                {check && (currentValue?.bio === '' || !currentValue?.bio) && btnDisable && (
                  <Typography variant="h6" sx={{ color: 'red', margin: '-15px 0 5px 0' }}>
                    Required
                  </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '-10px' }}>
                  <Box sx={{ display: 'block' }}>
                    <ToolTip title={t('servicesCard.creditSGD')} color="#999" placement={'bottom'} open={openTooltip}>
                      <OutlinedInput
                        type="number"
                        disabled={!check}
                        inputProps={{ min: 0 }}
                        placeholder="Price"
                        value={check ? currentValue?.price : ''}
                        className={styles.priceInput}
                        sx={{ background: check ? '#FFF' : '#f6f6f6' }}
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
                          };
                          setGamesService([
                            ...gamesService.filter((i: IGameService) => i?.id !== item?.id),
                            newService,
                          ]);
                        }}
                        onClick={() => setOpenTooltip(true)}
                      />
                    </ToolTip>
                    {check && (currentValue?.price === '' || !currentValue?.price) && btnDisable && (
                      <Typography variant="h6" sx={{ color: 'red', margin: '-15px 0 5px 0' }}>
                        Required
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'block' }}>
                    <Box className={styles.gameGroupBox}>
                      <Dropdown
                        disabled={!check}
                        placeholderText="/Game"
                        className={styles.gameTimeSelect}
                        value={check ? suffixState : ''}
                        listData={selectGamePrice}
                        onChange={(e) => {
                          const newService = {
                            ...currentValue,
                            // gameTime: e.target.value,
                            suffix: e.target.value,
                          };
                          setGamesService([
                            ...gamesService.filter((i: IGameService) => i?.id !== item?.id),
                            newService,
                          ]);
                          setSuffixState(e.target.value === 0 ? '/15min' : e.target.value === 1 ? '/1hr' : '/game');
                        }}
                      />
                    </Box>
                    {currentValue?.suffixState === '' && btnDisable && (
                      <Typography variant="h6" sx={{ color: 'red', marginLeft: '10px' }}>
                        Required
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: 'block' }}>
                  <Box sx={{ display: 'flex' }}>
                    {currentValue?.profile && (
                      <Box sx={{ marginRight: '12px' }}>
                        <Avatar
                          avatars={[
                            {
                              alt: 'cover image',
                              src: currentValue?.profile || <AvatarIcon />,
                            },
                          ]}
                          sx={{
                            maxWidth: '100px',
                            maxHeight: '80px',
                            width: '100px',
                            height: '80px',
                            fontSize: '31px',
                            color: '#646464',
                            borderRadius: '12px',
                          }}
                        />
                      </Box>
                    )}
                    <Box className={styles.uploadBox}>
                      {!currentValue?.profile ? (
                        <Button loading={loading} disabled={!check} className={styles.uploadButton} component="label">
                          {t('servicesCard.uploadPhoto')}
                          <input type="file" hidden onChange={handleChange} accept="image/jpg, image/jpeg, image/png" />
                        </Button>
                      ) : (
                        <>
                          <Button loading={loading} disabled={!check} className={styles.uploadButton} component="label">
                            {t('servicesCard.updatePhoto')}
                            <input
                              type="file"
                              hidden
                              onChange={handleChange}
                              accept="image/jpg, image/jpeg, image/png"
                            />
                          </Button>
                          &nbsp;
                          <Button
                            disabled={!check}
                            className={styles.uploadButton}
                            sx={{ marginTop: '12px' }}
                            component="label"
                            onClick={() => {
                              const newService = {
                                ...currentValue,
                              };
                              delete newService?.profile;
                              setGamesService([
                                ...gamesService.filter((i: IGameService) => i?.id !== item?.id),
                                newService,
                              ]);
                              setBtnDisable(true);
                              setLoading(false);
                            }}
                          >
                            {t('servicesCard.remove')}
                            <input hidden />
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                  {check && (currentValue?.profile === '' || !currentValue?.profile) && btnDisable && (
                    <Typography variant="h6" sx={{ color: 'red', marginLeft: '10px' }}>
                      Required
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default GameCard;
