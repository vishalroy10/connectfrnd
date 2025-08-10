"use client";
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const AadhaarVerification: React.FC = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 for Aadhaar input, 2 for OTP input

  const handleAadhaarSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      // In a real scenario, this would trigger an OTP to the user's registered mobile number
      // For this example, we'll simulate success if a valid-looking Aadhaar number is entered
      if (aadhaarNumber.length === 12 && /^[0-9]+$/.test(aadhaarNumber)) {
        setMessage('OTP sent to your registered mobile number.');
        setStep(2);
      } else {
        setMessage('Please enter a valid 12-digit Aadhaar number.');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('/api/aadhaar', {
        aadhaarNumber,
        otp,
      });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Verification failed. Please try again.');
      console.error('Error verifying Aadhaar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', padding: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Aadhaar Verification
      </Typography>
      {step === 1 && (
        <TextField
          label="Aadhaar Number"
          variant="outlined"
          fullWidth
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
          inputProps={{ maxLength: 12, inputMode: 'numeric', pattern: '[0-9]*' }}
          disabled={loading}
        />
      )}
      {step === 2 && (
        <TextField
          label="OTP"
          variant="outlined"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
          disabled={loading}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={step === 1 ? handleAadhaarSubmit : handleOtpSubmit}
        disabled={loading || (step === 1 && aadhaarNumber.length !== 12) || (step === 2 && otp.length !== 6)}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : (step === 1 ? 'Send OTP' : 'Verify OTP')}
      </Button>
      {message && (
        <Typography variant="body2" color={message.includes('successfully') ? 'success.main' : 'error.main'}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AadhaarVerification;


