import React, { useEffect, useMemo, useState } from 'react';
import { useGetUserData } from '@/hooks/useGetUserData';

import Box from '@/components/atoms/box';
import Tabs from '@/components/atoms/tabs';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import LoadingIcon from '@/components/atoms/icons/loading';
import { handleUpdate } from '@/components/page/OnboardingSteps';

import Meetup from './components/meetup';
import EMeet from './components/eMeet';
import Games from './components/games';
import Sports from './components/Sports';
import { servicesKey } from '@/keys/firestoreKeys';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@mui/material';
import { IEMeetService, IGameService, IMeetUpService, ISportService } from '@/components/page/BabeProfileSetting/components/interface';

interface IServiceModalProps {
  uid: string | null | undefined;
  btnDisable: boolean;
  setBtnDisable: React.Dispatch<React.SetStateAction<boolean>>;
  service: IMeetUpService[];
  setService: React.Dispatch<React.SetStateAction<IMeetUpService[]>>;
  EMeetService: IEMeetService[];
  setEMeetService: React.Dispatch<React.SetStateAction<IEMeetService[]>>;
  gamesService: IGameService[];
  setGamesService: React.Dispatch<React.SetStateAction<IGameService[]>>;
  sportServices: ISportService[];
  setSportServices: React.Dispatch<React.SetStateAction<ISportService[]>>;
  setChooseServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServicesModal: React.FC<IServiceModalProps> = ({
  service,
  setService,
  uid,
  btnDisable,
  setGamesService,
  gamesService,
  EMeetService,
  setEMeetService,
  sportServices,
  setSportServices,
  setBtnDisable,
  setChooseServicesModal,
}: IServiceModalProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const t = useTranslations('profile');
  const [loading, setLoading] = useState<boolean>(false);
  const { loading: isLoading, error, data } = useGetUserData(uid);
  useEffect(() => {
    const profileData: IEMeetService[] = [];
    for (const outerKey in data?.get(servicesKey)) {
      if (outerKey == '1') {
        const innerObject = data?.get(servicesKey)[outerKey];
        for (const innerKey in innerObject) {
          const item = innerObject[innerKey];
          profileData.push(item);
        }
      }
    }

    setEMeetService(EMeetService?.length ? EMeetService : profileData);

    const iGameData: IGameService[] = [];
    for (const outerKey in data?.get(servicesKey)) {
      if (outerKey == '2') {
        const innerObject = data?.get(servicesKey)[outerKey];
        for (const innerKey in innerObject) {
          const item = innerObject[innerKey];
          iGameData.push(item);
        }
      }
    }

    setGamesService(gamesService?.length ? gamesService : iGameData);

    const iMeetUpData: IMeetUpService[] = [];
    for (const outerKey in data?.get(servicesKey)) {
      if (outerKey === '0') {
        const innerObject = data?.get(servicesKey)[outerKey];
        for (const innerKey in innerObject) {
          const serviceItem: IMeetUpService = innerObject[innerKey];
          iMeetUpData.push(serviceItem);
        }
      }
    }

    setService(service?.length ? service : iMeetUpData);

    const iSportData: ISportService[] = [];
    for (const outerKey in data?.get(servicesKey)) {
      if (outerKey == '3') {
        const innerObject = data?.get(servicesKey)[outerKey];
        for (const innerKey in innerObject) {
          const item = innerObject[innerKey];
          iSportData.push(item);
        }
      }
    }

    setSportServices(sportServices?.length ? sportServices : iSportData);
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

  const handleSubmitService = async () => {
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
        if (!item.price || !item.bio || !item.suffix || !item?.profile) {
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
    setLoading(false);
    await handleUpdate({ services: newObj }, uid);
    setLoading(false);
    setChooseServicesModal(false);
  };

  const SERVICES_TABS = useMemo(
    () => [
      {
        content: (
          <Box sx={isMobile ? { height: 'calc(100vh - 42vh)', overflowY: 'scroll' } : {}}>
            <Meetup service={service} setService={setService} uid={uid} btnDisable={btnDisable} />
          </Box>
        ),
        lable: () => t('serviceTab.meetup'),
      },
      {
        content: (
          <Box sx={isMobile ? { height: 'calc(100vh - 42vh)', overflowY: 'scroll' } : {}}>
            <EMeet EMeetService={EMeetService} setEMeetService={setEMeetService} uid={uid} btnDisable={btnDisable} />
          </Box>
        ),
        lable: () => t('serviceTab.emeet'),
      },
      {
        content: (
          <Box sx={isMobile ? { height: 'calc(100vh - 42vh)', overflowY: 'scroll' } : {}}>
            <Games
              setGamesService={setGamesService}
              gamesService={gamesService}
              uid={uid}
              btnDisable={btnDisable}
              setBtnDisable={setBtnDisable}
            />
          </Box>
        ),
        lable: () => t('serviceTab.games'),
      },
      {
        content: (
          <Box sx={isMobile ? { height: 'calc(100vh - 42vh)', overflowY: 'scroll' } : {}}>
            <Sports
              sportServices={sportServices}
              setSportServices={setSportServices}
              uid={uid}
              btnDisable={btnDisable}
            />
          </Box>
        ),
        lable: () => t('serviceTab.sports'),
      },
    ],
    [service, EMeetService, gamesService, sportServices]
  );

  if (isLoading || error)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingIcon />
      </Box>
    );

  return (
    <>
      <Box>
        <Typography variant="h3">{t('servicesCard.services')}</Typography>
        <Tabs tabsData={SERVICES_TABS} mainClass={'main_tabs'} tabsLabel={'tabs_label'} />
      </Box>
      {isMobile && (
        <Button
          loading={loading}
          disabled={btnDisable}
          variant="contained"
          sx={{ width: '100%', height: '48px' }}
          onClick={() => {
            handleSubmitService();
          }}
        >
          <Typography variant="subtitle1">{t('modalButton.done')}</Typography>
        </Button>
      )}
    </>
  );
};

export default ServicesModal;
