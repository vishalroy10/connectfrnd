import { auth, db, functions, storage } from '@/credentials/firebase';
import { useGetUserData } from '@/hooks/useGetUserData';
import { updateUserProviderDetails } from '@/keys/functionNames';
import { useUserStore } from '@/store/reducers/usersReducer';
import fetchUserData from '@/store/thunks/fetchUser';
import { useAppDispatch } from '@/store/useReduxHook';
import { useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';
import { RecaptchaVerifier, onAuthStateChanged, signInWithPhoneNumber } from 'firebase/auth';
import { collection, deleteField, doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import * as keys from '@/keys/firestoreKeys';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { debounce } from 'lodash';

const useProfileSettingHook = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const [deleteModal, setDeleteModal] = useState(false);
  const userStore = useUserStore();
  const currentUser = userStore?.currentUser;
  const [uid] = [currentUser?.uid];
  const t = useTranslations('profile');

  const { loading, error, data } = useGetUserData(uid);
  const [input, setInput] = useState<string>();
  const [userError, setUserError] = useState<any>('');
  const [addPhoneNumberModal, setAddPhoneNumberModal] = useState<boolean>(false);
  const [phoneNumberInputScreen, setPhoneNumberInputScreen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState<any>(null);
  const [setUser] = useState<any>();
  const [openToast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState<boolean>(false);
  const [deleteUserLoading, setDeleteUserLoading] = useState<boolean>(false);
  const [uploadImageLoading, setUploadImageLoading] = useState<boolean>(false);
  const [loadingUserName, setLoadingUserName] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (uid) {
      dispatch(fetchUserData(uid));
    }
  }, [uid]);
  const [profileData, setProfileData] = useState({
    userName: '',
    dateOfBirth: dayjs(),
    gender: '',
    bio: '',
    avatar: '',
    phone: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });
  });

  useEffect(() => {
    if (currentUser && !currentUser?.isPhoneVerified) {
      const updateProviderDetails = httpsCallable(functions, updateUserProviderDetails);
      updateProviderDetails({ phoneNumber: currentUser?.oldPhoneNumber, uid })?.then(() => {
        updateDoc(doc(db, keys?.USERS, uid || ''), {
          isPhoneVerified: true,
          phone: currentUser?.oldPhoneNumber ? currentUser?.oldPhoneNumber : null,
        });
      });
    }
  }, []);

  useEffect(() => {
    setProfileData({
      ...profileData,
      userName: data?.get(keys.nicknameKey),
      dateOfBirth: dayjs(data?.get(keys.dateOfBirthKey), 'DD MMMM YYYY at HH:mm:ss [UTC]Z'),
      gender: data?.get(keys.genderKey),
      bio: data?.get(keys.bioKey),
      avatar: data?.get(keys.mobileUrlKey) || '',
      phone: data?.get(keys.phoneNumberKey),
    });
  }, [data]);

  useEffect(() => {
    if (data?.get(keys.phoneNumberKey)) {
      setPhoneNumber(data?.get(keys.phoneNumberKey));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToast(false);
      setToastMessage('');
    }, 2000);
  }, [openToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.length && e.target.files[0];
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          switch (snapshot.state) {
            case 'paused':
              setUploadImageLoading(false);
              console.log('Upload is paused');
              break;
            case 'running':
              setUploadImageLoading(true);
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          setUploadImageLoading(false);
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setProfileData({ ...profileData, avatar: url });
          });
          setUploadImageLoading(false);
        }
      );
      setUploadImageLoading(false);
    } else {
      setUploadImageLoading(false);
      console.log('File not found');
    }
  };

  const handleDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleSave = async () => {
    setLoading(true);
    await handleUserNameValidation(profileData?.userName);

    if (!userError.length) {
      const promises = [];

      const updateData: any = {};

      updateData[keys.genderKey] = profileData?.gender;
      updateData[keys.nicknameKey] = profileData?.userName;
      updateData[keys.bioKey] = profileData?.bio;
      updateData[keys.dateOfBirthKey] = profileData?.dateOfBirth?.format('DD MMMM YYYY [at] HH:mm:ss [UTC]Z');
      updateData[keys.mobileUrlKey] = profileData?.avatar;

      const update = updateDoc(doc(db, keys?.USERS, uid || ''), updateData);

      promises.push(update);

      await Promise.all(promises);
      setToast(true);
      setToastMessage('Update user details successfully');
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setInput(value);
  };

  const deleteClick = async () => {
    setDeleteUserLoading(true);
    await updateDoc(doc(db, keys.USERS, uid || ''), {
      [keys.mobileUrlKey]: deleteField(),
      [keys.bioKey]: deleteField(),
      [keys.nicknameKey]: deleteField(),
      [keys.genderKey]: deleteField(),
      [keys.dateOfBirthKey]: deleteField(),
      [keys.phoneNumberKey]: deleteField(),
      [keys.availabilityKey]: deleteField(),
      [keys.cacheVideoUrlsKey]: deleteField(),
      [keys.geoEncodingsKey]: deleteField(),
      [keys.foodPrefKey]: deleteField(),
      [keys.heightKey]: deleteField(),
      [keys.orientationKey]: deleteField(),
      [keys.raceKey]: deleteField(),
      [keys.servicesKey]: deleteField(),
      [keys.stateKey]: deleteField(),
      [keys.urlsKey]: deleteField(),
      [keys.voiceUrlKey]: deleteField(),
      ['completedstep']: deleteField(),
    });

    await auth.signOut();
    setDeleteModal(false);
    setDeleteUserLoading(false);
    setTimeout(() => {
      window.location.href = '';
    }, 1800);
  };

  const handleUserNameValidation = async (value: string) => {
    setLoadingUserName(true);

    const nameRegex = /^[a-z]+$/; // eslint-disable-line
    let text = '';
    if (value.match(nameRegex) === null || value.length < 3) {
      text = 'Username Must Contains A-Z. NO Spacing, NO Numbers. Minimum Length Is 3 Characters.';
      setLoadingUserName(false);
    } else if (value === 'undefined') {
      text = 'This username is not available. Please try again.';
      setLoadingUserName(false);
    } else {
      const snap = await getDocs(query(collection(db, keys.USERS), where(keys.nicknameKey, '==', value), limit(1)));
      if (snap.docs.length !== 0) {
        const myUid = snap.docs[0].id;
        if (uid !== myUid) {
          text = 'This username is not available. Please try again.';

          setLoadingUserName(false);
        }
      } else {
        text = 'Available.';

        setLoadingUserName(false);
      }
    }
    setUserError(text);
    setLoadingUserName(false);
  };
  const debounceUsername = debounce(handleUserNameValidation, 500);

  const sendVerificationCode = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
    try {
      const verificationId = await signInWithPhoneNumber(auth, `+${phoneNumber}`, recaptchaVerifier);
      if (!verificationId) {
        setToast(true);
        setToastMessage('Something went wrong');
      }
      return verificationId;
    } catch (error: any) {
      console.log(error);
      setToast(true);
      setToastMessage('too many requests');
    }
  };

  const handleSendVerificationCode = async () => {
    setVerifyOtpLoading(true);
    try {
      await updateDoc(doc(db, keys?.USERS, uid || ''), {
        isPhoneVerified: false,
        oldPhoneNumber: currentUser?.phoneNumber,
      });
      const updateProviderDetails = httpsCallable(functions, updateUserProviderDetails);
      const updateUser = await updateProviderDetails({ phoneNumber, uid });
      const data = updateUser?.data as {
        message: string;
        status: number;
        success: boolean;
        error: string;
      };

      if (!data?.success) {
        setToast(true);
        setToastMessage(data?.error);
      }

      if (data?.success && uid) {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
        const id = await sendVerificationCode(phoneNumber, recaptchaVerifier);

        dispatch(fetchUserData(uid));
        setVerificationId(id);
        if (id) {
          setToast(true);
          setToastMessage('OTP Send Successfully');
        }
        if (id) {
          setPhoneNumberInputScreen(true);
          setPhoneNumber(phoneNumber);
        }
      }
      setVerifyOtpLoading(false);
    } catch (error: any) {
      if (error) {
        setPhoneNumberInputScreen(false);
        setToast(true);
        setToastMessage(error.name);
        setVerifyOtpLoading(false);
      }
      await updateDoc(doc(db, keys?.USERS, uid || ''), {
        isPhoneVerified: true,
        phone: currentUser?.oldPhoneNumber,
      });
      if (uid) {
        dispatch(fetchUserData(uid));
      }

      const updateProviderDetails = httpsCallable(functions, updateUserProviderDetails);
      await updateProviderDetails({ phoneNumber: currentUser?.oldPhoneNumber, uid });
      setVerifyOtpLoading(false);
      setPhoneNumberInputScreen(false);
    }
  };

  const handleVerifyOTP = async () => {
    setVerifyOtpLoading(true);
    try {
      const updateData: any = {};
      const promises = [];
      const otp = verificationCode;

      const check = await verificationId.confirm(otp);

      let update: any;
      if (check) {
        updateData[keys.phoneNumberKey] = phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`;
        updateData['isPhoneVerified'] = true;
        updateData['oldPhoneNumber'] = phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`;
        const updateProviderDetails = httpsCallable(functions, updateUserProviderDetails);
        await updateProviderDetails({ phoneNumber, uid });
        update = await updateDoc(doc(db, keys?.USERS, uid || ''), updateData);
        setToast(true);
        setToastMessage('Phone Number Bind Successfully');
        setVerifyOtpLoading(false);
        handleCloseAllModal();
      } else {
        setToast(true);
        setToastMessage('OTP is invalid - else');
        setVerifyOtpLoading(false);
      }
      if (uid) dispatch(fetchUserData(uid));
      promises.push(update);
      await Promise.all(promises);
    } catch (error) {
      updateDoc(doc(db, keys?.USERS, uid || ''), {
        isPhoneVerified: true,
        phone: currentUser?.oldPhoneNumber,
        oldPhoneNumber: null,
      });
      if (uid) dispatch(fetchUserData(uid));

      setToast(true);
      setToastMessage('OTP is invalid!');
      setVerifyOtpLoading(false);
    }
  };

  const handleCloseAllModal = () => {
    setPhoneNumberInputScreen(false);
    setAddPhoneNumberModal(false);
    setVerificationId('');
    setVerificationCode('');
    setPhoneNumber('');
    setVerifyOtpLoading(false);
    setDeleteUserLoading(false);
    setUploadImageLoading(false);
  };

  return {
    handleChange,
    handleSave,
    handleDeleteModal,
    handleCloseDeleteModal,
    onChangeHandle,
    handleCloseAllModal,
    handleVerifyOTP,
    handleSendVerificationCode,
    deleteClick,
    setToast,
    setProfileData,
    setAddPhoneNumberModal,
    setPhoneNumber,
    setVerificationCode,
    setLoadingUserName,
    data,
    loading,
    error,
    toastMessage,
    openToast,
    profileData,
    uploadImageLoading,
    t,
    debounceUsername,
    userError,
    isLoading,
    isMobile,
    deleteUserLoading,
    deleteModal,
    input,
    verifyOtpLoading,
    phoneNumberInputScreen,
    addPhoneNumberModal,
    phoneNumber,
    loadingUserName,
  };
};

export default useProfileSettingHook;
