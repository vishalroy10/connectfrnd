
import React from 'react';
import AadhaarVerification from '@/components/molecules/AadhaarVerification';
import Box from '@mui/material/Box';

const AadhaarVerifyPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <AadhaarVerification />
    </Box>
  );
};

export default AadhaarVerifyPage;


