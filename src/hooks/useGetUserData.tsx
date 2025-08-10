'use client';

import { db } from '@/credentials/firebase';
import { USERS } from '@/keys/firestoreKeys';
import { DocumentData, DocumentSnapshot, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const cache: { [uid: string]: DocumentSnapshot<DocumentData> | undefined } = {};

export const useGetUserData: (uid: string | null | undefined) => {
  loading: boolean;
  error: boolean;
  data: DocumentSnapshot<DocumentData> | undefined;
} = (uid) => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const [data, setData] = useState<DocumentSnapshot<DocumentData> | undefined>(uid ? cache?.[uid] : undefined);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    if (cache?.[uid]) {
      setLoading(false);
      setData(cache?.[uid]);
      // console.log("RETURN")
      // return
    } else {
      setLoading(true);
    }

    const unsubscribe = onSnapshot(
      doc(db, USERS, uid),
      (doc) => {
        if (doc.exists()) {
          setData(doc);
          cache[uid] = doc;
        }

        setLoading(false);
      },
      (err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line
  }, [uid]);

  return { loading, error, data };
};
