import React, { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useEffect, useState } from 'react';
import { db, storage } from '@/credentials/firebase';
import { USERS } from '@/keys/firestoreKeys';
import { collection, doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { useUserStore } from '@/store/reducers/usersReducer';
import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetUserData } from '@/hooks/useGetUserData';
import * as keys from '@/keys/firestoreKeys';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import dayjs, { isDayjs } from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  IEMeetService,
  IGameService,
  IMeetUpService,
  IService,
  ISportService,
  InputProps,
} from './components/interface';

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

export interface BabeProfileSettingType {
  handleApplyForm: () => void;
  handleUpdate: (input: InputProps, uid: string | null | undefined) => void;
  handleNext: () => void;
  changeTab: (e: any, tab: string) => void;
  handleChangeLocation: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageVideoChange: (mediaFiles: (File | string)[], folder?: string) => Promise<string[]>;
  handlePrevious: () => void;
  handleDelete: (key: number, type: string) => void;
  handlePlay: () => void;
  handleReset: () => void;
  handleStopRecording: () => void;
  handleStartRecording: () => void;
  saveAccountDetail: (data: UserProfile) => void;
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
  setViewVideoImages: SetStateFunction<string[]>;
  setShowGeneralInformation: SetStateFunction<boolean>;
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
  t: any;
  data: any;
  loading: any;
  error: string | any;
  isMobile: any;
  isTablet: any;
  currentUser: any;
  loadingDataLoader: boolean;
  getRegionState: string[];
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
  setAudioURL?: any;
  voiceDetails?: any;
  setVoiceDetails?: any;
  saveVoiceRecording?: any
  savePhotos?: any;
  saveVideos?: any;
}

export interface RecorderProps {
  blob: Blob;
  duration: number;
  fileType: string;
}

export const handleUpdate = async (input: InputProps, uid: string | null | undefined) => {
  const promises = [];
  const updateFieldObj: any = input;

  const update = updateDoc(doc(db, USERS, uid || ''), updateFieldObj);
  promises.push(update);
  await Promise.all(promises);
};

type Props = {
  children: ReactNode;
};

const BabeProfileSettingContext = createContext(undefined);

export const BabeProfileSettingProvider = ({ children }: Props) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const router = useRouter();

  const t = useTranslations('profile');
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const [uid] = [currentUser?.uid];

  const [chooseServicesModal, setChooseServicesModal] = useState<boolean>(false);
  const [priceLimitModal, setPriceLimitModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState<string>('');
  const [applyFormLoading] = useState<boolean>(false);
  const [value, setValue] = useState<IDropdown>();
  const [error, setError] = useState<string | boolean | null>(false);
  const [loadingDataLoader, setLoadingDataLoader] = useState(false);
  const [getRegionState, setRegionState] = useState<string[]>([]);
  const [setImage] = useState<string | any>();
  const [images, setImages] = useState<string[]>([]);
  const [viewImages, setViewImages] = useState<string[]>([]);
  const [videoImages, setVideoImages] = useState<string[]>([]);
  const [viewVideoImages, setViewVideoImages] = useState<string[]>([]);

  const [voiceDetails, setVoiceDetails] = useState<RecorderProps | null>();
  const [voiceUrl, setVoiceUrl] = useState('');
  const [audioURL, setAudioURL] = useState<string | undefined>(voiceUrl);

  const [openSubmitModal] = useState(false);
  const [goToProfileLoading] = useState(false);
  const [service, setService] = useState<IMeetUpService[]>([]);
  const [gamesService, setGamesService] = useState<IGameService[]>([]);
  const [EMeetService, setEMeetService] = useState<IEMeetService[]>([]);
  const [sportServices, setSportServices] = useState<ISportService[]>([]);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [servicesLoading, setServicesLoading] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [openInviteUserModal, setOpenInviteUserModal] = useState<boolean>(false);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  const { loading, data } = useGetUserData(uid);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.push(pathname + '?' + params.toString());
      return;
    },
    [searchParams]
  );

  const changeTab = (e: any, tab: string) => createQueryString('tab', tab);

  // useEffect(() => {
  //   if (uid) {
  //     dispatch(fetchUserData(uid));
  //   }
  // }, [uid]);

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
    console.log('change in data');
    if (data?.get('urls')) {
      setViewImages(data?.get('urls'));
    }
    if (data?.get('cachevid')) {
      setViewVideoImages(data?.get('cachevid'));
    }
    setVoiceUrl(data?.get(keys.voiceUrlKey));
    setAudioURL(data?.get(keys.voiceUrlKey));
    setRequestStatus(data?.get(keys.statusKey));
  }, [data]);

  const formatTime = (seconds: number | any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
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

  const handleImageVideoChange = async (mediaFiles: (File | string)[], folder: string = 'media'): Promise<string[]> => {
    const updated: string[] = [];

    for (const media of mediaFiles) {
      if (media instanceof File) {
        const name = media?.name;
        const storageRef = ref(storage, `${folder}/${name}`);
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

  const savePhotos = async () => {
    if (images.length > 0) {
      setLoadingDataLoader(true);
      try {
        const updateData: Record<string, any> = {};

        const allImages = await handleImageVideoChange(images);
        setImages([]);
        updateData[keys.urlsKey] = [...viewImages, ...allImages];
        setViewImages([...viewImages, ...allImages]);
        await handleUpdate(updateData, uid);
        setLoadingDataLoader(false);
      } catch (err) {
        setLoadingDataLoader(false);
      }
    }
  };

  const saveVideos = async () => {
    if (videoImages.length > 0) {
      setLoadingDataLoader(true);
      try {
        const updateData: Record<string, any> = {};

        const allVideos = await handleImageVideoChange(videoImages);
        setVideoImages([]);
        updateData[keys.cacheVideoUrlsKey] = [...viewVideoImages, ...allVideos];
        setViewVideoImages([...viewVideoImages, ...allVideos]);
        await handleUpdate(updateData, uid);
        setLoadingDataLoader(false);
      } catch (err) {
        setLoadingDataLoader(false);
      }
    }
  };

  const saveVoiceRecording = async () => {
    setLoadingDataLoader(true);
    try {
      const updateData: Record<string, any> = {};

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
        const voiceUrl = await uploadVoice;
        updateData[keys.voiceUrlKey] = voiceUrl;
      } else {
        updateData[keys.voiceUrlKey] = voiceUrl;
      }
      await handleUpdate(updateData, uid);
      setLoadingDataLoader(false);
    } catch (err) {
      setLoadingDataLoader(false);
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

  const saveAccountDetail = async (profileData: UserProfile) => {
    const userError = await handleUserNameValidation(profileData?.userName);
    setLoadingDataLoader(true);

    if (userError === 'Available.' || !userError) {
      try {
        const updateData: Record<string, any> = {};
        updateData[keys.nicknameKey] = profileData?.userName;
        updateData[keys.availabilityKey] = profileData?.availability;
        updateData[keys.dateOfBirthKey] = isDayjs(profileData?.dateOfBirth)
          ? profileData?.dateOfBirth?.format('DD MMMM YYYY [at] HH:mm:ss [UTC]Z')
          : '';
        updateData[keys.genderKey] = profileData?.gender;
        updateData[keys.heightKey] = profileData?.height;
        updateData[keys.raceKey] = profileData?.ethnicity;
        updateData[keys.orientationKey] = profileData?.orientation || '';
        updateData[keys.foodPrefKey] = profileData?.foodPref || '';

        await handleUpdate(updateData, uid);
        setLoadingDataLoader(false);
      } catch (err) {
        console.log('account data updated error', err);
        setLoadingDataLoader(false);
      }
    }
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

  const values: any = {
    changeTab,
    handleUpdate,
    handleChangeLocation,
    handleImageVideoChange,
    handleSubmitService,
    saveAccountDetail,
    formatTime,
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
    setViewVideoImages,
    setService,
    setBtnDisable,
    setGamesService,
    setEMeetService,
    setSportServices,
    setLoadingDataLoader,
    setOpenInviteUserModal,
    setCheck,
    setOpenTooltip,
    savePhotos,
    saveVideos,
    saveVoiceRecording,
    t,
    tab,
    data,
    loading,
    error,
    isMobile,
    isTablet,
    currentUser,
    loadingDataLoader,
    getRegionState,
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
    goToProfileLoading,
    openSubmitModal,
    service,
    uid,
    btnDisable,
    gamesService,
    EMeetService,
    sportServices,
    servicesLoading,
    check,
    openInviteUserModal,
    openTooltip,
  };
  return (
    <>
      <BabeProfileSettingContext.Provider value={values}>{children}</BabeProfileSettingContext.Provider>
    </>
  );
};

export default BabeProfileSettingContext;
