
'use client';
import React from 'react';
import RazorpayPayment from '@/components/molecules/RazorpayPayment';

const Credit = () => {
  // You would typically get the amount, currency, and receipt from your application logic
  // For demonstration, using dummy values
  const amount = 1000; // Example amount in smallest currency unit (e.g., 1000 paise = 10 INR)
  const currency = 'INR';
  const receipt = 'order_receipt_123';

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    // Handle successful payment, e.g., update user credits
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    // Handle payment failure
  };

  return (
    <RazorpayPayment
      amount={amount}
      currency={currency}
      receipt={receipt}
      onPaymentSuccess={handlePaymentSuccess}
      onPaymentError={handlePaymentError}
    />
  );
};

export default Credit;


