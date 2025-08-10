'use client';

import LoadingIcon from '@/components/atoms/icons/loading';
import BabeProfile from '@/components/page/BabeProfileSetting';
import ProfileSetting from '@/components/page/ProfileSetting';
import { useGetUserData } from '@/hooks/useGetUserData';
import { adminKey } from '@/keys/firestoreKeys';
import { useUserStore } from '@/store/reducers/usersReducer';
import { Box } from '@mui/material';
import React from 'react';

const page = () => {
  return <Render />;
};

const Render = () => {
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const [uid] = [currentUser?.uid];
  const { loading, data } = useGetUserData(uid);
  return <BabeProfile />;
  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingIcon />
      </Box>
    );
  if (data?.get(adminKey) === undefined) {
    return <ProfileSetting />;
  }
  return <BabeProfile />;
};

export default page;
