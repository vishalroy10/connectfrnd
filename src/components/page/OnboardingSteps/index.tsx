import React from 'react';
import { OnboardingProvider as OnboardProvider } from './OnboardingContext';
import Onboarding from './Onboarding';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/credentials/firebase';
import { USERS } from '@/keys/firestoreKeys';
import { InputProps } from '../BabeProfileSetting/components/interface';

export const handleUpdate = async (input: InputProps, uid: string | null | undefined) => {
  const promises = [];
  const updateFieldObj: any = input;

  const update = updateDoc(doc(db, USERS, uid || ''), updateFieldObj);
  promises.push(update);
  await Promise.all(promises);
};

const OnboardingSteps = () => {
  return (
    <>
      <OnboardProvider>
        <Onboarding />
      </OnboardProvider>
    </>
  );
};
export default OnboardingSteps;
