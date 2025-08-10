'use client';

import { getInstagramLongLivedAccessToken, getInstagramShortLivedAccessToken } from '@/apis/instagram';
import { instagramAuthorizeUrl } from '@/keys/endpoints';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useConnectInstagram = () => {
  const clientId = process.env.NEXT_PUBLIC_INSTA_APP_ID as string;
  const clientSecret = process.env.NEXT_PUBLIC_INSTA_APP_SECRET as string;
  const redirectUri = process.env.NEXT_PUBLIC_AUTH_REDIRECT as string;

  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  const getShortLivedAccessToken = async (code: string) => {
    try {
      const payload = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code,
      };
      const { data, error } = await getInstagramShortLivedAccessToken(payload);
      if (error) {
        throw new Error('Failed to fetch access token');
      }
      return data.access_token;
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const getLongLivedAccessToken = async (accessToken: string) => {
    try {
      const queryData = { grant_type: 'ig_exchange_token', client_secret: clientSecret, access_token: accessToken };
      const { data, error } = await getInstagramLongLivedAccessToken(queryData);
      if (error) {
        throw new Error('Failed to fetch access token');
      }
      return data.access_token;
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    (async () => {
      const code = searchParams.get('code');
      if (code) {
        setLoading(true);
        try {
          const shortAccessToken = await getShortLivedAccessToken(code);
          const accessToken = await getLongLivedAccessToken(shortAccessToken);
          console.log('Insta accessToken', accessToken);
        } catch (error) {
          console.log('Error: ', error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [searchParams]);

  const getAuthorizationUrl = () => {
    return `${instagramAuthorizeUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
  };

  const connect = () => {
    const authorizationUri = getAuthorizationUrl();
    window.location.href = authorizationUri;
  };

  return {
    loading,
    connect,
    getAuthorizationUrl,
  };
};

export default useConnectInstagram;
