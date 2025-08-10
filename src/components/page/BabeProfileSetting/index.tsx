'use client';

import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/credentials/firebase';
import { USERS } from '@/keys/firestoreKeys';
import BabeProfileSetting from './BabeProfileSetting';
import { BabeProfileSettingProvider } from './BabeProfileSettingContext';
import { InputProps } from './components/interface';

export const handleUpdate = async (input: InputProps, uid: string | null | undefined) => {
  const promises = [];
  const updateFieldObj: any = input;

  const update = updateDoc(doc(db, USERS, uid || ''), updateFieldObj);
  promises.push(update);
  await Promise.all(promises);
};

const BabeProfile = () => {
  return (
    <>
      <BabeProfileSettingProvider>
        <BabeProfileSetting />
      </BabeProfileSettingProvider>
    </>
  );
};
export default BabeProfile;
