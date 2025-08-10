'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../babeProfileSetting.module.css';
import TelegramIcon from '@/components/atoms/icons/telegram';
import Button from '@/components/atoms/button';
import BackButton from './BackButton';
import { teleIdKey } from '@/keys/firestoreKeys';
import UseBabeProfileSettingHook from '../useBabeProfileSettingHook';
import { BabeProfileSettingType } from '../BabeProfileSettingContext';
import { TelegramNotificationBotLink } from '@/keys/contactList';

const Notification = () => {
  const { data }: BabeProfileSettingType = UseBabeProfileSettingHook();
  const subscribeNotification = () => {
    window.open(TelegramNotificationBotLink, '_blank');
  };
  return (
    <Box className={styles.container}>
      <BackButton title="Notification" />
      <Box className={styles.formCard}>
        <Box mb={2} className={styles.cardHeading}>
          Notification
        </Box>
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              width: '100%',
              gap: '12px',
            }}
          >
            <Box sx={{ display: 'block', marginLeft: '12px' }}>
              <Typography variant="subtitle1">Telegram</Typography>
              <Typography variant="h6">Connect to Telegram to receive notifications</Typography>
            </Box>

            <Button
              sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
              onClick={() => subscribeNotification()}
            >
              {data?.get(teleIdKey) ? 'Connect to Telegram' : 'Reconnect to Telegram'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
