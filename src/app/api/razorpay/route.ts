import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, receipt } = body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
      currency,
      receipt,
      payment_capture: 1, // auto capture
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


