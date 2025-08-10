import CircleHeartIcons from '@/components/atoms/icons/circleHeartIcons';
import DollerIcon from '@/components/atoms/icons/dollarIcon';
import PercentageIcon from '@/components/atoms/icons/percentageIcon';
import { json } from '@/components/molecules/card/subcriptionCard/subscriptionData';
import { db } from '@/credentials/firebase';
import { PREMIUM, PROMO, USERS, customerIdKey, descriptionKey, discountKey, premiumKey } from '@/keys/firestoreKeys';
import { isTEST } from '@/keys/functionNames';
import { useUserStore } from '@/store/reducers/usersReducer';
import { useMediaQuery } from '@mui/material';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const useSubscribeFormHook = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { currentUser } = useUserStore();

  const uid = currentUser?.uid;
  const [activePlan, setActivePlan] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [varifyPromo, setVarifyPromo] = useState({
    isVarify: false,
    valid: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [promoDescription, setDescription] = useState<string | undefined>('');
  const [checkPromoloading, setCheckPromoloading] = useState(false);
  const [check, setCheck] = useState(false);
  const [getDiscount, setDiscount] = useState<{ [id: number]: any }>();
  const finalPriceID = useRef<string>(isTEST ? 'price_1LVZn0FwkTcpylgWh0MHO79J' : 'price_1LjaN2FwkTcpylgWqsEqWlD7');
  const [finalPrice, setFinalPrice] = useState<any>((Math.round((json[1] / 1) * 100) / 100).toFixed(2));
  const [customerIdState, setCustomerId] = useState<string>();
  const offerTypes = [
    {
      icon: <DollerIcon />,
      label: 'No transaction fees',
    },
    {
      icon: <CircleHeartIcons />,
      label: 'Access to private profile',
    },
    {
      icon: <PercentageIcon />,
      label: '10% more credit',
    },
  ];
  const onChangePlan = (index: number, priceId: string, totalPrice: any) => {
    setActivePlan(index);
    finalPriceID.current = priceId;
    setFinalPrice(totalPrice);
  };

  const handlePromoCodeChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPromoCode(e?.target?.value);
  };

  const getDocument = async (userUUID: string) => {
    const document = await getDoc(doc(db, USERS, userUUID));
    const customerId = document.get(customerIdKey) as string;
    setCustomerId(customerId);

    const snapShot = await getDoc(doc(db, PREMIUM, userUUID));
    const isPremium = snapShot.get(premiumKey) as boolean;

    // setIsPremium(isPremium);

    if (isPremium) {
      try {
        // This part would be replaced by Razorpay subscription management if applicable
        const result = await fetch('https://us-central1-rent-a-date-81735.cloudfunctions.net/goToPortal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON?.stringify({
            customer: customerId,
            return_url: window?.location?.origin,
          }),
        });

        const data = await result?.json();
        window?.location?.assign(data?.sessionId);
      } catch (error) {
        console.log('SubScription Error Premium User s==> ', error);

        // error occur
      }
    } else {
      // check if got discount ?

      const snapShots = await getDocs(query(collection(db, PROMO), where('default', '==', true), limit(1)));

      if (snapShots?.docs?.length === 1) {
        const promoDocument = snapShots.docs[0];
        const discount = promoDocument.get(discountKey) as { [id: number]: any } | undefined;
        const description = promoDocument.get(descriptionKey) as string | undefined;

        setDescription(description);
        setDiscount(discount);
        setPromoCode(promoDocument.id.trim().toUpperCase());

        if (discount && Object.keys(discount).length > 2) {
          const cost = (Math.round(json[1] * discount[1] * 100) / 100).toFixed(2);

          setFinalPrice(cost);
        }
      }
    }

    setLoading(false);

    // if (isCancel === 'cancel') {
    //   openToast('Unsuccessful subcription. Try again.');
    // }
  };
  useEffect(() => {
    if (uid) getDocument(uid);
  }, []);

  const onClickPromoVarify = async () => {
    setCheckPromoloading(true);

    try {
      if (!promoCode) return;

      const snapShot = await getDoc(doc(db, PROMO, promoCode));

      if (snapShot.exists()) {
        const discount = snapShot.get(discountKey) as { [id: number]: any } | undefined;
        const description = snapShot.get(descriptionKey) as string | undefined;

        setDescription(description);
        setDiscount(discount);
      } else {
        console.log('check promo varify not found');
      }

      setCheckPromoloading(false);
    } catch (error) {
      console.log('Promo Varify try catch error => ', error);
    }
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const orderResponse = await axios.post('/api/razorpay', {
        amount: parseFloat(finalPrice), // Ensure amount is in correct format
        currency: 'INR', // Assuming INR for India-first
        receipt: `subscription_${uid}_${Date.now()}`,
      });

      if (orderResponse.data.success) {
        const { order } = orderResponse.data;
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
          amount: order.amount, 
          currency: order.currency,
          name: 'RentBabe Subscription',
          description: 'Subscription Payment',
          order_id: order.id, 
          handler: function (response: any) {
            console.log('Razorpay Payment successful:', response);
            // Handle successful payment, e.g., update user subscription status in Firebase
          },
          prefill: {
            name: currentUser?.nickname || '', 
            email: currentUser?.email || '', 
            contact: currentUser?.phoneNumber || '', 
          },
          theme: {
            color: '#3399cc',
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();

        paymentObject.on('payment.failed', function (response: any) {
          console.error('Razorpay Payment failed:', response);
          // Handle payment failure
        });

      } else {
        console.error('Failed to create Razorpay order:', orderResponse.data.message);
      }
    } catch (error) {
      console.error('Upgrade Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const planArr = [
    {
      discount: getDiscount?.[0],
    },
    {
      discount: getDiscount?.[1],
    },
    {
      discount: getDiscount?.[2],
    },
  ];

  return {
    isMobile,
    offerTypes,
    activePlan,
    promoCode,
    varifyPromo,
    checkPromoloading,
    check,
    promoDescription,
    getDiscount,
    planArr,
    loading,
    finalPrice,
    onChangePlan,
    handlePromoCodeChanges,
    onClickPromoVarify,
    handleCheck,
    setVarifyPromo,
    handleUpgrade,
  };
};

export default useSubscribeFormHook;


