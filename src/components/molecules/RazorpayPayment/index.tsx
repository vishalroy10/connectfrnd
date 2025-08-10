
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

interface RazorpayPaymentProps {
  amount: number;
  currency: string;
  receipt: string;
  onPaymentSuccess: (response: any) => void;
  onPaymentError: (error: any) => void;
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, currency, receipt, onPaymentSuccess, onPaymentError }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    setLoading(true);
    setMessage('');

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      setMessage('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      const orderResponse = await axios.post('/api/razorpay', {
        amount,
        currency,
        receipt,
      });

      if (!orderResponse.data.success) {
        setMessage(orderResponse.data.message || 'Failed to create Razorpay order.');
        setLoading(false);
        return;
      }

      const { order } = orderResponse.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
        currency: order.currency,
        name: 'RentBabe',
        description: 'Service Payment',
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response: any) {
          onPaymentSuccess(response);
          setMessage('Payment successful!');
        },
        prefill: {
          name: 'John Doe', // Replace with actual user name
          email: 'john.doe@example.com', // Replace with actual user email
          contact: '9999999999', // Replace with actual user contact
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response: any) {
        onPaymentError(response);
        setMessage('Payment failed: ' + response.error.description);
      });

    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error initiating payment.');
      onPaymentError(error);
      console.error('Error initiating Razorpay payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', padding: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Make Payment
      </Typography>
      <Typography>Amount: {amount} {currency}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={displayRazorpay}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay with Razorpay'}
      </Button>
      {message && (
        <Typography variant="body2" color={message.includes('successful') ? 'success.main' : 'error.main'}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default RazorpayPayment;


