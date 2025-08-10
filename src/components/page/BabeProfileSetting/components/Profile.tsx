'use client';
import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from '../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import Avatar from '@/components/atoms/avatar';
import ProfileIcon from '@/components/atoms/icons/profile';
import TelegramIcon from '@/components/atoms/icons/telegram';
import ArrowRightIcon from '@/components/atoms/icons/arrowRight';
import BackButton from './BackButton';
import { BabeProfileSettingType } from '../BabeProfileSettingContext';
import UseBabeProfileSettingHook from '../useBabeProfileSettingHook';
import IAMFreeTodayModel from './models/IAMFreeTodayModel';
import SimpleDialog from '@/components/atoms/modal';
import Input from '@/components/atoms/input';
import CopyIcon from '@/components/atoms/icons/copyIcon';
import { nicknameKey } from '@/keys/firestoreKeys';
import { TelegramLink } from '@/keys/contactList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@/components/atoms/popup/menu';
import MenuItem from '@/components/atoms/popup';
import { setIsOpenProfileModal } from '@/store/reducers/drawerOpenReducer';
import { useAppDispatch } from '@/store/useReduxHook';
import { setSelectedBabe } from '@/store/reducers/babeReducer';

const Profile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t, data, currentUser, isMobile }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const [iAmFreeToday, setIAMFreeToday] = useState(false);
  const [openShareModel, setOpenShareModel] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const options = [
    { label: 'Read Reviews', onClick: () => {} },
    { label: 'Share profile', onClick: () => setOpenShareModel(true) },
    { label: 'Ask a question', onClick: () => window.open(TelegramLink, '_blank') },
  ];
  const handleCopyClick = (value: string) => {
    navigator.clipboard.writeText(value);
    setLinkCopied(true);
  };
  const handleModalClose = () => {
    setOpenShareModel(false);
  };
  const onClickBabeCard = (e: MouseEvent, babeInfo: any) => {
    e.preventDefault();
    dispatch(setSelectedBabe(babeInfo));
    if (isMobile) {
      router.push(`/profile/${babeInfo?.uid}`);
    } else {
      dispatch(setIsOpenProfileModal(true));
    }
  };
  return (
    <>
      <Box className={styles.container}>
        <BackButton title="Profile" />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                avatars={[
                  { src: currentUser?.profileImage ? currentUser.profileImage : <ProfileIcon size={60} />, alt: '' },
                ]}
              />
              <Box sx={{ display: 'block', marginLeft: '12px' }}>
                <Typography variant="subtitle1">@{data?.get(nicknameKey)}</Typography>
                <Typography>{currentUser?.email || ''}</Typography>
                <Typography>{currentUser?.phoneNumber || ''}</Typography>
              </Box>
            </Box>

            <Menu
              open={Boolean(anchorEl)}
              setAnchorEl={setAnchorEl}
              onClose={() => setAnchorEl(null)}
              icon={<MoreVertIcon />}
              anchorEl={anchorEl}
              sx={{ '.MuiPaper-root': { borderRadius: 3 } }}
            >
              {options.map(({ label, onClick }, idx) => (
                <MenuItem key={idx + 1} onClick={() => onClick()}>
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Button
              sx={{ background: '#000', color: '#fff', padding: '8px 16px', width: 'fit-content' }}
              onClick={() => setIAMFreeToday(true)}
            >
              I am free today
            </Button>
            <Button
              sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
              onClick={(e: any) => {
                onClickBabeCard(e, data.data());
              }}
            >
              View Profile
            </Button>
          </Box>
        </Box>

        <Box
          sx={{ padding: '16px 20px', borderRadius: '16px', backgroundColor: '#29A9EA', cursor: 'pointer' }}
          onClick={() => window.open(TelegramLink, '_blank')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '36px',
                  width: '36px',
                  borderRadius: '100%',
                  backgroundColor: '#fff',
                }}
              >
                <TelegramIcon />
              </Box>
              <Typography variant="subtitle1" color="#fff" sx={{ marginLeft: '12px' }}>
                Join RentBabe's Telegram channel
              </Typography>
            </Box>
            <ArrowRightIcon />
          </Box>
        </Box>
      </Box>{' '}
      <IAMFreeTodayModel iAmFreeToday={iAmFreeToday} setIAMFreeToday={setIAMFreeToday} />
      <SimpleDialog
        footer={
          <>
            <Button onClick={handleModalClose} className={styles.footerCancelButton}>
              <Typography variant="subtitle1">{t('modalButton.cancel')}</Typography>
            </Button>
          </>
        }
        open={openShareModel}
        title=""
        modelWidth="1200px"
        isDeleteModel={true}
        borderRadius={24}
      >
        <Typography variant="h3" mb={2}>
          I am free today
        </Typography>
        <Typography variant="body1" mb={2}>
          Copy this link to share your profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item className={styles.inputFieldBox} xl={8} md={8} xs={12}>
            <Input sx={{ width: '100%' }} name="shareLink" value="https://rentbabe.com/invite?id=123456" />
          </Grid>
          <Grid item className={styles.inputFieldBox} xs={4}>
            <Button
              onClick={() => handleCopyClick('https://rentbabe.com/invite?id=123456')}
              variant="contained"
              className={styles.footerDoneButton}
              loading={false}
            >
              <CopyIcon />{' '}
              <Typography sx={{ marginLeft: '8px' }} variant="subtitle1">
                {linkCopied ? 'Copied' : 'Copy link'}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </SimpleDialog>
    </>
  );
};

export default Profile;
