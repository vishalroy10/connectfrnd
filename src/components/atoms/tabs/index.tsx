'use client';
import React, { useEffect, useState } from 'react';
import { Tabs as MuiTabs, Tab, TabsOwnProps } from '@mui/material';
import Box from '../box';
import Typography from '../typography';
import styles from '../../page/FAQ/faq.module.css';

interface ITab extends TabsOwnProps {
  tabsData: any;
  mainClass?: string;
  tabsLabel?: string;
  tabBottomPadding?: any;
  resetTab?: number | string;
  onTabChange?: (arg?: number) => void;
}

type TabContentPanelProps = {
  value: number;
  index: number;
  children: React.ReactNode;
};

function TabContentPanel(props: TabContentPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Tabs = ({ tabsData, tabBottomPadding, resetTab, mainClass, tabsLabel, onTabChange, ...props }: ITab) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };
  useEffect(() => {
    setValue(0);
  }, [resetTab]);

  useEffect(() => {
    if (localStorage.getItem('activeTab') === 'meetup') {
      setValue(0);
      localStorage.removeItem('activeTab');
    } else if (localStorage.getItem('activeTab') === 'emeet') {
      setValue(1);
      localStorage.removeItem('activeTab');
    } else if (localStorage.getItem('activeTab') === 'games') {
      setValue(2);
      localStorage.removeItem('activeTab');
    } else if (localStorage.getItem('activeTab') === 'sport') {
      setValue(3);
      localStorage.removeItem('activeTab');
    }
  }, [localStorage.getItem('activeTab')]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: tabBottomPadding || '0px',
      }}
    >
      <MuiTabs
        {...props}
        value={value}
        onChange={handleChange}
        // variant="scrollable"
        // scrollButtons="auto"
        // allowScrollButtonsMobile
        className={mainClass ? styles[mainClass] : ''}
      >
        {tabsData?.map((tab: any, index: number) => (
          <Tab
            key={index}
            sx={{
              textTransform: 'none',
              fontFamily: `'Helvetica Neue', sans-serif`,
            }}
            label={tab.lable(value)}
            className={tabsLabel ? styles[tabsLabel] : ''}
          />
        ))}
      </MuiTabs>
      {tabsData.map((tab: any, index: number) => (
        <TabContentPanel key={index} value={value} index={index}>
          <Typography sx={{ textTransform: 'none', fontFamily: `'Helvetica Neue', sans-serif` }}>
            {tab.content}
          </Typography>
        </TabContentPanel>
      ))}
    </Box>
  );
};

export default Tabs;
