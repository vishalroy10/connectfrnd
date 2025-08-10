'use client';

import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

import UseBabeProfileSettingHook from './useBabeProfileSettingHook';
import { Tabs as MuiTabs, Tab } from '@mui/material';
import Account from './components/Account';
import Location from './components/Location';
import Media from './components/Media';
import Notification from './components/Notifications';
import Chats from './components/Chats';
import Profile from './components/Profile';
import Security from './components/Security';
import Services from './components/Services';
import ArrowForwardIcon from '@/components/atoms/icons/arrowForwardIcon';
import ChatIcon from '@/components/atoms/icons/chatIcon';
import UserIcon from '@/components/atoms/icons/userIcon';
import GridIcon from '@/components/atoms/icons/gridIcon';
import ImageIcon from '@/components/atoms/icons/imageIcon';
import LockIcon from '@/components/atoms/icons/lockIcon';
import MarkerIcon from '@/components/atoms/icons/markerIcon';
import FaceSmileIcon from '@/components/atoms/icons/faceSmileIcon';
import BellIcon from '@/components/atoms/icons/bellIcon';

const tabsData = [
  {
    label: () => 'Profile',
    value: 'profile',
    icon: <FaceSmileIcon />,
  },
  {
    label: () => 'Account',
    value: 'account',
    icon: <UserIcon />,
  },
  {
    label: () => 'Services',
    value: 'services',
    icon: <GridIcon />,
  },
  {
    label: () => 'Media',
    value: 'media',
    icon: <ImageIcon />,
  },
  {
    label: () => 'Security',
    value: 'security',
    icon: <LockIcon />,
  },
  {
    label: () => 'Location',
    value: 'location',
    icon: <MarkerIcon />,
  },
  {
    label: () => 'Notifications',
    value: 'notifications',
    icon: <BellIcon />,
  },
  {
    label: () => 'Chats',
    value: 'chats',
    icon: <ChatIcon />,
  },
];

const tabContent = (tab: string) => {
  switch (tab) {
    case 'profile':
      return <Profile />;
    case 'account':
      return <Account />;
    case 'services':
      return <Services />;
    case 'media':
      return <Media />;
    case 'security':
      return <Security />;
    case 'location':
      return <Location />;
    case 'notifications':
      return <Notification />;
    case 'chats':
      return <Chats />;
    default:
      return <Profile />;
  }
};
const MobileViewTab = ({ label, icon, onClick }: any) => (
  <Box
    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 8px' }}
    onClick={onClick}
  >
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
        {icon}
      </Box>
      <Box sx={{ display: 'block', marginLeft: '12px' }}>
        <Typography variant="subtitle1">{label()}</Typography>
      </Box>
    </Box>

    <ArrowForwardIcon />
  </Box>
);
const BabeProfileSetting = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { tab, changeTab }: any = UseBabeProfileSettingHook();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
          padding: isMobile ? '16px' : '32px',
          height: '100%',
          marginTop: '60px',
        }}
      >
        {isMobile ? (
          !tab && (
            <Box>
              <Typography variant="h2" mt={2}>
                Settings
              </Typography>
              {tabsData?.map(({ label, icon, value }: any, index: number) => (
                <MobileViewTab key={index} label={label} icon={icon} onClick={(e: any) => changeTab(e, value)} />
              ))}
            </Box>
          )
        ) : (
          <MuiTabs value={tab} onChange={changeTab} scrollButtons="auto" className="main_tabs">
            {tabsData?.map((tab: any, index: number) => (
              <Tab
                key={index}
                sx={{
                  textTransform: 'none',
                  fontFamily: `'Helvetica Neue', sans-serif`,
                }}
                value={tab.value}
                label={tab.label()}
                className="tabs_label"
              />
            ))}
          </MuiTabs>
        )}
        {((isMobile && tab) || !isMobile) && tabContent(tab)}
      </Box>
    </>
  );
};
export default BabeProfileSetting;
