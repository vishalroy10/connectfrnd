'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../babeProfileSetting.module.css';
import Button from '@/components/atoms/button';
import Avatar from '@/components/atoms/avatar';
import ProfileIcon from '@/components/atoms/icons/profile';

import BackButton from './BackButton';

const Chats = () => {
  return (
    <Box className={styles.container}>
      <BackButton title="Chats" />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={styles.formCard}>
        <Box mb={2} className={styles.cardHeading}>
          Blocked Users
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar avatars={[{ src: <ProfileIcon size={40} />, alt: '' }]} />
            <Typography sx={{ marginLeft: '12px' }}>Mascott</Typography>
          </Box>

          <Button
            sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
            onClick={() => {}}
          >
            Unblock
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar avatars={[{ src: <ProfileIcon size={40} />, alt: '' }]} />
            <Typography sx={{ marginLeft: '12px' }}>Mascott</Typography>
          </Box>

          <Button
            sx={{ background: '#fff', border: '1px solid #CCCCCC', padding: '8px 16px', width: 'fit-content' }}
            onClick={() => {}}
          >
            Unblock
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chats;
