import Box from '@/components/atoms/box';
import { useMediaQuery } from '@mui/material';
import styles from '../babeProfileSetting.module.css';
import Typography from '@/components/atoms/typography';
import React from 'react';
import LeftArrowIcon from '@/components/atoms/icons/left-arrow';
import UseBabeProfileSettingHook from '../useBabeProfileSettingHook';
import { BabeProfileSettingType } from '../BabeProfileSettingContext';

const BackButton = ({ title }: any) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { changeTab }: BabeProfileSettingType = UseBabeProfileSettingHook();

  return (
    <>
      {isMobile && (
        <>
          <Box className={styles.flexContainer} onClick={(e) => changeTab(e, '')}>
            <Box className={styles.iconBox}>
              <LeftArrowIcon />
            </Box>
            <Box className={styles.textBox}>
              <Typography variant="subtitle2">Back</Typography>
            </Box>
          </Box>
          <Typography variant="h2" mb={2}>
            {title}
          </Typography>
        </>
      )}
    </>
  );
};

export default BackButton;
