import React, { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useEffect, useState } from 'react';
import { db, storage } from '@/credentials/firebase';
import { USERS } from '@/keys/firestoreKeys';
import { collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { useAppDispatch } from '@/store/useReduxHook';
import { setCurrentUser, useUserStore } from '@/store/reducers/usersReducer';
import fetchUserData from '@/store/thunks/fetchUser';
import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetUserData } from '@/hooks/useGetUserData';
import * as keys from '@/keys/firestoreKeys';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ProfileHelper } from '@/utility/profileHelper';
import { Helper } from '@/utility/helper';
import {
  IEMeetService,
  IGameService,
  IMeetUpService,
  IService,
  ISportService,
  InputProps,
} from '../BabeProfileSetting/components/interface';

type SetStateFunction<T> = Dispatch<SetStateAction<T>>;
type IDropdown = {
  label?: string | JSX.Element;
  value: string;
};

export interface UserProfile {
  privacy: string;
  userName: string;
  availability: string;
  dateOfBirth: dayjs.Dayjs | string;
  height: string;
  gender: number;
  ethnicity: string;
  orientation: string;
  foodPref: string;
}

export interface OnboardingType {
  handleApplyForm: () => void;
  handleUpdate: (input: InputProps, uid: string | null | undefined) => void;
  handleNext: () => void;
  handleChangeLocation: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageVideoChange: (mediaFiles: (File | string)[]) => Promise<string[]>;
  handlePrevious: () => void;
  handleDelete: (key: number, type: string) => void;
  handlePlay: () => void;
  handleReset: () => void;
  handleStopRecording: () => void;
  handleStartRecording: () => void;
  handleClosePopup: () => void;
  handleGoToProfile: () => void;
  handleModalClose: () => void;
  handleSubmitService: () => void;
  getSbyprtValue: (price: number, ratings: number, numberOfRents: number) => void;
  formatTime: (time: number) => string;
  handleDeleteVideo: (key: any, type: string) => void;
  setIsRecording: SetStateFunction<boolean>;
  setDisableNextBtn: SetStateFunction<boolean>;
  setValue: SetStateFunction<IDropdown | undefined>;
  setError: SetStateFunction<string | boolean | null>;
  setChooseServicesModal: SetStateFunction<boolean>;
  setPriceLimitModal: SetStateFunction<boolean>;
  setImage: SetStateFunction<string | any>;
  setImages: SetStateFunction<any[]>;
  setViewImages: SetStateFunction<string[]>;
  setVideoImages: SetStateFunction<string[]>;
  setShowGeneralInformation: SetStateFunction<boolean>;
  setProfileData: SetStateFunction<UserProfile>;
  setShowAdditionalInformation: SetStateFunction<boolean>;
  setService: SetStateFunction<IMeetUpService[]>;
  setBtnDisable: SetStateFunction<boolean>;
  setGamesService: SetStateFunction<IGameService[]>;
  setEMeetService: SetStateFunction<IEMeetService[]>;
  setSportServices: SetStateFunction<ISportService[]>;
  setLoadingDataLoader: SetStateFunction<boolean>;
  setOpenInviteUserModal: SetStateFunction<boolean>;
  setCheck: SetStateFunction<boolean>;
  setOpenTooltip: SetStateFunction<boolean>;
  setLoadingUserName: SetStateFunction<boolean>;
  setRequireMicroPhone: SetStateFunction<boolean>;
  setVoiceDetails: SetStateFunction<RecorderProps | null>;
  setAudioURL: SetStateFunction<string | null>;
  voiceDetails: RecorderProps | null;
  voiceUrl: string;
  t: any;
  data: any;
  loading: any;
  error: string | any;
  isMobile: any;
  isTablet: any;
  currentUser: any;
  loadingDataLoader: boolean;
  getRegionState: string[];
  step: number;
  chooseServicesModal: boolean;
  priceLimitModal: boolean;
  requestStatus: string;
  applyFormLoading: boolean;
  value: IDropdown | undefined;
  images: any[];
  viewImages: string[];
  viewVideoImages: string[];
  videoImages: any[];
  audioURL: string | undefined;
  totalSecondsRef: any;
  isRecording: boolean;
  isPlaying: boolean;
  totalSeconds: number;
  currentAudioValue: number;
  disableNextBtn: boolean;
  profileData: UserProfile;
  showGeneralInformation: boolean;
  debounceUsername: any;
  userError: string | any;
  showAdditionalInformation: boolean;
  goToProfileLoading: boolean;
  openSubmitModal: boolean;
  service: IMeetUpService[];
  uid: string | null | undefined;
  btnDisable: boolean;
  gamesService: IGameService[];
  EMeetService: IEMeetService[];
  sportServices: ISportService[];
  selectedServices: IService[];
  servicesLoading: boolean;
  check: boolean;
  openInviteUserModal: boolean;
  openTooltip: boolean;
  loadingUserName: boolean;
  requireMicroPhone: boolean;
  microphoneError: any;
  goToReviewLoading: boolean;
}

export interface RecorderProps {
  blob: Blob;
  duration: number;
  fileType: string;
  next: boolean;
}

export const handleUpdate = async (input: InputProps, uid: string | null | undefined) => {
  const updateFieldObj: any = input;
  return await updateDoc(doc(db, USERS, uid || ''), updateFieldObj);
};

type Props = {
  children: ReactNode;
};

const OnboardingContext = createContext(undefined);

export const OnboardingProvider = ({ children }: Props) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const t = useTranslations('profile');
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const [uid] = [currentUser?.uid];

  const [chooseServicesModal, setChooseServicesModal] = useState<boolean>(false);
  const [priceLimitModal, setPriceLimitModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState<string>('');
  const [applyFormLoading, setApplyFormLoading] = useState<boolean>(false);
  const [value, setValue] = useState<IDropdown>();
  const [error, setError] = useState<string | boolean | null>(false);
  const [loadingDataLoader, setLoadingDataLoader] = useState(false);
  const [getRegionState, setRegionState] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [setImage] = useState<string | any>();
  const [viewImages, setViewImages] = useState<string[]>([]);
  const [videoImages, setVideoImages] = useState<string[]>([]);
  const [viewVideoImages, setViewVideoImages] = useState<string[]>([]);

  const [voiceDetails, setVoiceDetails] = useState<RecorderProps | null>();
  const [voiceUrl, setVoiceUrl] = useState('');
  const [audioURL, setAudioURL] = useState<string | undefined>(voiceUrl);

  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [goToProfileLoading, setGoToProfileLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    privacy: '',
    userName: '',
    availability: '',
    dateOfBirth: dayjs(),
    height: '',
    gender: 1,
    ethnicity: '',
    orientation: '',
    foodPref: '',
  });
  const [service, setService] = useState<IMeetUpService[]>([]);
  const [gamesService, setGamesService] = useState<IGameService[]>([]);
  const [EMeetService, setEMeetService] = useState<IEMeetService[]>([]);
  const [sportServices, setSportServices] = useState<ISportService[]>([]);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [servicesLoading, setServicesLoading] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [openInviteUserModal, setOpenInviteUserModal] = useState<boolean>(false);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  const [goToReviewLoading, setGoToReviewLoading] = useState<boolean>(false);
  const { loading, data } = useGetUserData(uid);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.push(pathname + '?' + params.toString());
      return;
    },
    [searchParams]
  );

  useEffect(() => {
    setRequestStatus(data?.get(keys.statusKey));
  }, [data]);

  useEffect(() => {
    if (uid) {
      dispatch(fetchUserData(uid));
    }
  }, [uid]);

  useEffect(() => {
    if (currentUser?.completedStep >= 0) {
      if (currentUser?.completedStep === 5) {
        createQueryString('step', currentUser?.completedStep);
      } else {
        createQueryString('step', (Number(currentUser?.completedStep) + 1).toString());
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.encods?.length && typeof currentUser.encods === 'object') {
      setError(false);
      setValue({
        label: currentUser.encods?.join(','),
        value: currentUser.encods?.join(','),
      });
      fetchLocations(currentUser.encods);
    }
  }, [currentUser.encods]);

  useEffect(() => {
    if (data?.get('urls')) {
      setViewImages(data?.get('urls'));
    }
    if (data?.get('cachevid')) {
      setViewVideoImages(data?.get('cachevid'));
    }
    setVoiceUrl(data?.get(keys.voiceUrlKey));
    setAudioURL(data?.get(keys.voiceUrlKey));
  }, [data]);

  useEffect(() => {
    setProfileData({
      ...profileData,
      privacy: data?.get(keys.privacyKey),
      userName: data?.get(keys.nicknameKey),
      availability: data?.get(keys.availabilityKey),
      dateOfBirth: dayjs(data?.get(keys.dateOfBirthKey), 'DD MMMM YYYY at HH:mm:ss [UTC]Z'),
      height: data?.get(keys.heightKey),
      gender: data?.get(keys.genderKey),
      orientation: data?.get(keys.orientationKey),
      foodPref: data?.get(keys.foodPrefKey),
      ethnicity: data?.get(keys.raceKey),
    });
  }, [data]);

  useEffect(() => {
    let validate = true;
    service.map((item: IMeetUpService) => {
      if (item.price && item.bio) {
        validate = false;
      }
    });

    EMeetService.map((item: IEMeetService) => {
      if (item.price && item.bio) {
        validate = false;
      }
    });

    gamesService.map((item: IGameService) => {
      if (item.price && item.bio && item.suffix && item?.profile) {
        validate = false;
      }
    });

    sportServices.map((item: ISportService) => {
      if (item.price && item.bio) {
        validate = false;
      }
    });
    if (service?.length && EMeetService?.length && gamesService?.length && sportServices?.length) {
      setBtnDisable(validate);
    } else {
      setBtnDisable(false);
    }
  }, [service, EMeetService, gamesService, sportServices]);

  const formatTime = (seconds: number | any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleApplyForm = async () => {
    if (!uid) {
      localStorage.setItem('pastUrl', 'onboarding-steps');
      return router.push('/login');
    }
    setApplyFormLoading(true);
    createQueryString('step', '1');
    await handleUpdate(
      {
        completedStep: 0,
      },
      uid
    );
    dispatch(
      setCurrentUser({
        completedStep: '0',
      })
    );
    setApplyFormLoading(false);
  };

  useEffect(() => {
    if (value?.value && getRegionState?.length) {
      if (!getRegionState?.map((item: any) => item?.value)?.includes(value?.value || currentUser?.encods)) {
        setError(true);
        setValue(undefined);
      } else {
        setError(false);
        setValue(value);
      }
    }
  }, [value, getRegionState]);

  const fetchLocations = (value: string) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&types=(cities)&key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then(async (placesResponse) => {
        if (!placesResponse.ok) {
          throw new Error(`HTTP error! Status: ${placesResponse.status}`);
        }
        const placesData = await placesResponse.json();
        const stateList = placesData.predictions.map((prediction: any) => {
          return prediction.description;
        });
        if (stateList?.length) {
          setRegionState(
            stateList?.map((item: string) => {
              return { label: item, value: item };
            })
          );
        } else {
          setError(true);
          setValue(undefined);
        }
      })
      .catch((error) => {
        setError(true);
        setValue(undefined);
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error:', error.message);
        }
      });
  };
  const handleChangeLocation = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    fetchLocations(e.target.value);
  }, []);

  const handleImageVideoChange = async (mediaFiles: (File | string)[]): Promise<string[]> => {
    const updated: string[] = [];

    for (const media of mediaFiles) {
      if (media instanceof File) {
        const name = media?.name;
        const storageRef = ref(storage, `media/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, media);
        try {
          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              () => {},
              (error) => {
                reject(error);
              },
              async () => {
                try {
                  const url = await getDownloadURL(uploadTask?.snapshot?.ref);
                  updated?.push(url);
                  resolve();
                } catch (error) {
                  reject(error);
                }
              }
            );
          });
        } catch (error: any) {
          console.log(error?.message);
        }
      } else {
        updated?.push(media);
        console.log('File not found');
      }
    }
    return updated;
  };

  const handleDelete = async (key: number, type: string) => {
    if (type === 'Image') {
      setImages((prevImages) => prevImages?.filter((item, index) => index !== key));
    } else {
      const newImagesSet = viewImages.filter((item, index) => index !== key);
      const updateData: Record<string, any> = {};
      updateData[keys.urlsKey] = newImagesSet;
      await handleUpdate(
        {
          ...updateData,
        },
        uid
      );
      setViewImages(newImagesSet);
    }
  };

  const handleDeleteVideo = async (key: any, type: string) => {
    if (type === 'Image') {
      setVideoImages((pre) => pre?.filter((item: any, index: any) => index !== key));
    } else {
      const newImagesSet = viewVideoImages.filter((item: any, index: any) => index !== key);
      const updateData: Record<string, any> = {};
      updateData[keys.cacheVideoUrlsKey] = newImagesSet;
      await handleUpdate(
        {
          ...updateData,
        },
        uid
      );
      setViewVideoImages(newImagesSet);
    }
  };

  const handleUserNameValidation = async (value: string) => {
    const nameRegex = /^[a-z]+$/; // eslint-disable-line
    let text = '';
    if (value.match(nameRegex) === null || value.length < 3) {
      text = 'Username Must Contains A-Z. NO Spacing, NO Numbers. Minimum Length Is 3 Characters.';
    } else if (value === 'undefined') {
      text = 'This username is not available. Please try again.';
    } else {
      const snap = await getDocs(query(collection(db, keys.USERS), where(keys.nicknameKey, '==', value), limit(1)));
      if (snap.docs.length !== 0) {
        const myUid = snap.docs[0].id;
        if (uid !== myUid) {
          text = 'This username is not available. Please try again.';
        }
      } else {
        text = 'Available.';
      }
    }
    return text;
  };

  const handleClosePopup = async () => {
    const userError = await handleUserNameValidation(profileData?.userName);
    setGoToReviewLoading(true);

    if (userError === 'Available.' || !userError) {
      try {
        const updateData: Record<string, any> = {};
        updateData[keys.privacyKey] = isMobile && !profileData?.privacy ? 'Public' : profileData?.privacy;
        updateData[keys.nicknameKey] = profileData?.userName;
        updateData[keys.availabilityKey] = profileData?.availability;
        updateData[keys.dateOfBirthKey] = profileData?.dateOfBirth?.format('DD MMMM YYYY [at] HH:mm:ss [UTC]Z');
        updateData[keys.genderKey] = profileData?.gender;
        updateData[keys.heightKey] = profileData?.height;
        updateData[keys.raceKey] = profileData?.ethnicity;
        updateData[keys.orientationKey] = profileData?.orientation;
        updateData[keys.foodPrefKey] = profileData?.foodPref;
        updateData[keys.statusKey] = 'in-review';
        updateData['completedStep'] = 5;

        await handleUpdate(updateData, uid);
        dispatch(
          setCurrentUser({
            completedStep: (Number(currentUser?.completedStep) + 1).toString(),
          })
        );
        // setStep(0);
        createQueryString('step', '0');
        setOpenSubmitModal(false);
        setGoToReviewLoading(true);
      } catch (err) {
        setGoToReviewLoading(true);
      }
    } else {
      setOpenSubmitModal(false);
      setGoToReviewLoading(true);
    }
  };

  const handleGoToProfile = async () => {
    const userError = await handleUserNameValidation(profileData?.userName);
    setGoToProfileLoading(true);
    if (userError === 'Available.' || !userError) {
      try {
        const updateData: Record<string, any> = {};
        updateData[keys.privacyKey] = profileData?.privacy;
        updateData[keys.nicknameKey] = profileData?.userName;
        updateData[keys.availabilityKey] = profileData?.availability;
        updateData[keys.dateOfBirthKey] = profileData?.dateOfBirth?.format('DD MMMM YYYY [at] HH:mm:ss [UTC]Z');
        updateData[keys.genderKey] = profileData?.gender;
        updateData[keys.heightKey] = profileData?.height;
        updateData[keys.raceKey] = profileData?.ethnicity;
        updateData[keys.orientationKey] = profileData?.orientation;
        updateData[keys.foodPrefKey] = profileData?.foodPref;
        updateData[keys.statusKey] = 'in-review';
        updateData['completedStep'] = 5;

        await handleUpdate(updateData, uid);
        dispatch(
          setCurrentUser({
            completedStep: (Number(currentUser?.completedStep) + 1).toString(),
          })
        );
        router.push('/profile-setting');
        setOpenSubmitModal(false);
        setGoToProfileLoading(false);
      } catch (err: any) {
        setGoToProfileLoading(false);
      }
    } else {
      setOpenSubmitModal(false);
      setGoToProfileLoading(false);
    }
  };

  const getSbyprtValue = (price: number, ratings: number, numberOfRents: number) => {
    const sort = Helper.sortByPricesValue(price, ratings, numberOfRents);

    return sort;
  };

  const handleSubmitService = async () => {
    try {
      let validate = false;
      service?.length &&
        service.map((item: IMeetUpService) => {
          if (!item.price || !item.bio) {
            localStorage.setItem('activeTab', 'meetup');
            validate = true;
          }
        });

      EMeetService?.length &&
        EMeetService.map((item: IEMeetService) => {
          if (!item.price || !item.bio) {
            localStorage.setItem('activeTab', 'emeet');
            validate = true;
          }
        });

      gamesService?.length &&
        gamesService.map((item: IGameService) => {
          if (!item.price || !item.bio || !item?.profile) {
            localStorage.setItem('activeTab', 'games');
            validate = true;
          }
        });

      sportServices?.length &&
        sportServices.map((item: ISportService) => {
          if (!item.price || !item.bio) {
            localStorage.setItem('activeTab', 'sport');
            validate = true;
          }
        });
      setBtnDisable(validate);

      if (validate) {
        console.log('validation failed');
        return false;
      }

      const serviceData = Array.from(new Set(service));
      const eMeetData = Array.from(new Set(EMeetService));
      const gameServiceData = Array.from(new Set(gamesService));
      const sportServicesData = Array.from(new Set(sportServices));

      const serviceOfZero = serviceData.reduce((acc: any, obj, index) => {
        acc[index] = obj;
        return acc;
      }, {});

      const EMeetServiceOfZero = eMeetData.reduce((acc: any, obj, index) => {
        acc[index] = obj;
        return acc;
      }, {});

      const gameServiceOfZero = gameServiceData.reduce((acc: any, obj, index) => {
        acc[index] = obj;
        return acc;
      }, {});

      const sportServiceOfZero = sportServicesData.reduce((acc: any, obj, index) => {
        acc[index] = obj;
        return acc;
      }, {});
      const newObj = { '0': serviceOfZero, '1': EMeetServiceOfZero, '2': gameServiceOfZero, '3': sportServiceOfZero };
      setServicesLoading(true);
      await handleUpdate({ services: newObj }, uid);
      setChooseServicesModal(false);
      setServicesLoading(false);
    } catch (error) {
      console.log('Error', error);
    }
  };
  const handleModalClose = () => {
    setChooseServicesModal(false);
    setPriceLimitModal(false);
  };

  const selectedServices: IService[] = [];
  for (const outerKey in data?.get(keys.servicesKey)) {
    const innerObject = data?.get(keys.servicesKey)[outerKey];
    for (const innerKey in innerObject) {
      const item = innerObject[innerKey];
      selectedServices.push(item);
    }
  }

  const handleNext = async () => {
    setLoadingDataLoader(true);

    try {
      const updateData: Record<string, any> = {};
      if (Number(currentUser?.completedStep) === 0) {
        updateData[keys.stateKey] = value?.value?.toString()?.split(',')[0];
        updateData[keys.geoEncodings] = value?.value?.toString()?.split(',');
      } else if (Number(currentUser?.completedStep) === 1) {
        setChooseServicesModal(false);
      } else if (Number(currentUser?.completedStep) === 2) {
        if (images.length > 0) {
          const allImages = await handleImageVideoChange(images);
          setImages([]);
          updateData[keys.urlsKey] = [...viewImages, ...allImages];
          setViewImages([...viewImages, ...allImages]);
        }
        if (videoImages.length > 0) {
          const allVideos = await handleImageVideoChange(videoImages);
          setVideoImages([]);
          updateData[keys.cacheVideoUrlsKey] = [...viewVideoImages, ...allVideos];
          setViewVideoImages([...viewVideoImages, ...allVideos]);
        }
      } else if (Number(currentUser?.completedStep) === 3) {
        if (!uid) {
          window.location.href = '/';
          return;
        }
        const blob = voiceDetails?.blob;
        if (audioURL && blob) {
          const fileType = voiceDetails?.fileType;
          if (!blob) {
            return;
          }

          const uploadRef = ref(storage, `VOICE/${uid}/${Date.now()}.wav`);
          const type = fileType ? { type: fileType } : {};
          const file = new File([blob], 'filename', type);

          const uploadVoice = uploadBytes(uploadRef, file).then(async (uploadTask: any) => {
            const url = (await getDownloadURL(uploadTask.ref)) as string;
            const today = new Date();
            const seconds = voiceDetails.duration as number;
            const voiceUrl = `${url}&t=${today.getTime()}&duration=${seconds}`;
            setVoiceUrl(voiceUrl);
            return voiceUrl;
          });
          try {
            const voiceUrl = await uploadVoice;
            updateData[keys.voiceUrlKey] = voiceUrl;
          } catch (error) {
            console.log(`${error}`);
          }
        } else {
          updateData[keys.voiceUrlKey] = voiceUrl;
        }
      } else if (Number(currentUser?.completedStep) === 4) {
        if (uid) {
          const docRef = doc(db, keys.USERS, uid);
          const snapshot = await getDoc(docRef);
          ProfileHelper.getUserProfile(snapshot);
        }
        setOpenSubmitModal(true);
      }
      if (Number(currentUser?.completedStep) !== 4) {
        await handleUpdate(
          {
            ...updateData,
            completedStep: Number(currentUser?.completedStep) + 1,
          },
          uid
        );
        dispatch(
          setCurrentUser({
            completedStep: (Number(currentUser?.completedStep) + 1).toString(),
            encods: value?.value,
          })
        );
        createQueryString('step', (Number(step) + 1).toString());
      }
      setLoadingDataLoader(false);
    } catch (err) {
      setLoadingDataLoader(false);
      console.log(err);
    }
  };

  const handlePrevious = async () => {
    await handleUpdate(
      {
        completedStep: currentUser?.completedStep - 1,
      },
      uid
    );
    dispatch(
      setCurrentUser({
        completedStep: (currentUser?.completedStep - 1).toString(),
      })
    );
    createQueryString('step', (Number(step) - 1).toString());
  };

  const values: any = {
    handleApplyForm,
    handleUpdate,
    handleNext,
    handleChangeLocation,
    handleImageVideoChange,
    handlePrevious,
    handleDelete,
    handleClosePopup,
    handleGoToProfile,
    handleModalClose,
    handleSubmitService,
    getSbyprtValue,
    formatTime,
    handleDeleteVideo,
    setVoiceDetails,
    setVoiceUrl,
    setAudioURL,
    setValue,
    setError,
    setChooseServicesModal,
    setPriceLimitModal,
    setImage,
    setImages,
    setViewImages,
    setVideoImages,
    setProfileData,
    setService,
    setBtnDisable,
    setGamesService,
    setEMeetService,
    setSportServices,
    setLoadingDataLoader,
    setOpenInviteUserModal,
    setCheck,
    setOpenTooltip,
    t,
    data,
    loading,
    error,
    isMobile,
    isTablet,
    currentUser,
    loadingDataLoader,
    getRegionState,
    step: Number(step),
    chooseServicesModal,
    priceLimitModal,
    requestStatus,
    applyFormLoading,
    value,
    images,
    viewImages,
    viewVideoImages,
    videoImages,
    voiceDetails,
    voiceUrl,
    audioURL,
    profileData,
    goToProfileLoading,
    openSubmitModal,
    service,
    uid,
    btnDisable,
    gamesService,
    EMeetService,
    sportServices,
    selectedServices,
    servicesLoading,
    check,
    openInviteUserModal,
    openTooltip,
    goToReviewLoading,
  };
  return (
    <>
      <OnboardingContext.Provider value={values}>{children}</OnboardingContext.Provider>
    </>
  );
};

export default OnboardingContext;
