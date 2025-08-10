import { instagramAccessTokenUrl, instagramAuthUrl } from '@/keys/endpoints';
import axios, { AxiosError } from 'axios';

export const getInstagramLongLivedAccessToken = async (params?: any) => {
  try {
    const response = await axios.get(instagramAccessTokenUrl, { params });
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { error: axiosError.response.data };
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

export const getInstagramShortLivedAccessToken = async (payload?: any) => {
  try {
    const response = await axios.post(instagramAuthUrl, payload);
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { error: axiosError.response.data };
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};
