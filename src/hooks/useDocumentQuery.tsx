import { useEffect, useState } from 'react';
import { DocumentData, DocumentReference, DocumentSnapshot, onSnapshot } from 'firebase/firestore';

const cache: { [key: string]: DocumentSnapshot<DocumentData> | undefined } = {};

export const useDocumentQuery: (
  key: string,
  document: DocumentReference<DocumentData> | undefined
) => {
  loading: boolean;
  error: boolean;
  data: DocumentSnapshot<DocumentData> | null;
} = (key, document) => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const [data, setData] = useState<DocumentSnapshot<DocumentData> | null>(cache[key] || null);

  useEffect(() => {
    if (!document) return () => {};

    const unsubscribe = onSnapshot(
      document,
      (snapshot) => {
        setData(snapshot);
        setLoading(false);
      },
      () => {
        setData(null);
        setLoading(false);
        setError(true);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [key]);

  return { loading, error, data };
};
