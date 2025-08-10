import React, { useEffect, useState } from 'react';
import Box from '@/components/atoms/box';
import Button from '@/components/atoms/button';
import CopyIcon from '@/components/atoms/icons/copy-icon';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import styles from '@/components/page/OnboardingSteps/onboarding.module.css';
import { useMediaQuery } from '@mui/material';
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '@/credentials/firebase';
import {
  INVITE,
  bioKey,
  category,
  joinedKey,
  priceKey,
  senderKey,
  suffixKey,
  timeStampKey,
  typeKey,
} from '@/keys/firestoreKeys';
import { DDInviteLinkExpire } from '@/version/basic';
import { UnitsEnum } from '@/enum/myEnum';
import { InviteProps } from '@/props/commonProps';
import { ServiceTypeEnum } from '@/props/servicesProps';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { handleUpdate } from '@/components/page/OnboardingSteps';

import * as keys from '@/keys/firestoreKeys';
import { useGetUserData } from '@/hooks/useGetUserData';
import { useTranslations } from 'next-intl';

dayjs.extend(duration);
interface inviteUserProps {
  uid: string | null | undefined;
  setOpenInviteUserModal: (arg: boolean) => void;
}

const EXPIRE_TIME_HOURS = 6;

type TimeFormat = {
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
};

const InviteUser = ({ uid, setOpenInviteUserModal }: inviteUserProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const t = useTranslations('profile');

  const [isLoading, setLoading] = useState<boolean>(false);
  const { data } = useGetUserData(uid);
  const endTime = dayjs().add(EXPIRE_TIME_HOURS * 3600 + 15, 'seconds');
  const [timeLeft, setTimeLeft] = useState<TimeFormat>({ hours: '', minutes: '', seconds: '' });
  const [profileData, setProfileData] = useState({
    inviteUrl: '',
    expireTime: '',
  });
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const updateData: Record<string, any> = {};
    updateData[keys.inviteLinkKey] = '';
    updateData[keys.linkExpiredOnKey] = '';
    if (JSON.stringify(timeLeft.seconds).includes('-')) {
      handleUpdate(updateData, uid);
      setOpenInviteUserModal(false);
    }
  });

  useEffect(() => {
    setProfileData({
      inviteUrl: data?.get(keys.inviteLinkKey),
      expireTime: data?.get(keys.linkExpiredOnKey),
    });
  }, [data]);

  const createNewLink = (map: { [key: string]: any }): Promise<any> => {
    return addDoc(collection(db, INVITE), map);
  };

  const onLinkCreate = async () => {
    if (uid) {
      setLoading(true);
      const map: InviteProps = {
        [senderKey]: uid,
        [priceKey]: 1200,
        [bioKey]: 'bioState',
        [timeStampKey]: serverTimestamp(),
        [typeKey]: `${ServiceTypeEnum.eMeet}`,
        [category]: '7',
        [suffixKey]: UnitsEnum.hr,
      };

      try {
        let id = '';
        const snaps = await getDocs(
          query(collection(db, INVITE), where(senderKey, '==', uid), orderBy(timeStampKey, 'desc'), limit(1))
        );
        if (snaps.docs.length > 0) {
          const doc = snaps.docs[0];
          id = doc.id;
          const isAccepted = doc.get(joinedKey) as boolean | undefined;

          if (isAccepted) {
            const add = await createNewLink(map);
            // setExpire(Timestamp.now());
            id = add.id;
          } else {
            const currentPrice = doc.get(priceKey) as number | undefined;
            const currentBio = doc.get(bioKey) as string | undefined;
            const createAt = doc.get(timeStampKey) as Timestamp | undefined;
            const now = new Date();

            if (createAt) {
              const difference = now.getTime() - createAt.toDate().getTime();
              const resultInMinutes = Math.round(difference / 60000);
              // console.log(resultInMinutes)
              const c1 = resultInMinutes > DDInviteLinkExpire - 1;
              const c2 = 1200 !== currentPrice || 'bioState' !== currentBio;
              if (c1 || c2) {
                // 1 more min to expire, lets create a new link
                const add = await createNewLink(map);
                // setExpire(Timestamp.now());
                id = add.id;
              } else {
                // setExpire(createAt);
              }
            } else {
              // can never happen?
              const add = await createNewLink(map);
              // setExpire(Timestamp.now());
              id = add.id;
            }
          }
        } else {
          const add = await createNewLink(map);
          id = add.id;
          // setExpire(Timestamp.now());
        }

        const updateData: Record<string, any> = {};
        updateData[keys.inviteLinkKey] = `${window.location.origin}/invite?id=${id}`;
        updateData[keys.linkExpiredOnKey] = dayjs()
          .add(EXPIRE_TIME_HOURS * 3600 + 15, 'seconds')
          .format();
        await handleUpdate(updateData, uid);
        setProfileData({ ...profileData, inviteUrl: `${window.location.origin}/invite?id=${id}` });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const handleCopyClick = () => {
    if (profileData?.inviteUrl) {
      navigator.clipboard.writeText(profileData?.inviteUrl);
      setLinkCopied(true);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const calculateTimeLeft = () => {
    const now = dayjs();
    // let duration = dayjs.duration(dayjs().add((EXPIRE_TIME_HOURS * 3600) + 15, 'seconds').diff(now));
    let duration = dayjs.duration(endTime.diff(now));

    if (data?.get(keys.linkExpiredOnKey)) {
      duration = dayjs.duration(dayjs(data?.get(keys.linkExpiredOnKey)).diff(now));
    }

    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  };

  useEffect(() => {
    if (timeLeft.hours === '00' && timeLeft.minutes === '00' && timeLeft.seconds === '00') {
      // setCreateLink(false);
    }
  }, [timeLeft]);

  return (
    <>
      <Box sx={{ width: isMobile ? 'fit-content' : '600px' }}>
        <Typography variant="h3" className={styles.heading}>
          {t('servicesCard.inviteLink')}
        </Typography>
        <Typography variant="body1" className={styles.bodyText}>
          {t('servicesCard.joinDescription')}
        </Typography>
        {!profileData?.inviteUrl?.length ? (
          <Button
            loading={isLoading}
            className={styles.createLinkButton}
            variant="contained"
            onClick={() => {
              // setCreateLink(true);
              onLinkCreate();
            }}
          >
            <Typography variant="subtitle1">{t('servicesCard.createLink')}</Typography>
          </Button>
        ) : (
          <>
            <Box className={styles.linkContainer}>
              <Input fullWidth className={styles.linkInput} value={profileData?.inviteUrl || ''} />
              <Button
                className={styles.copyLinkButton}
                variant="contained"
                onClick={handleCopyClick} // Pass the link directly to the handler
              >
                <Typography variant="subtitle1" className={styles.copyLinkText}>
                  <CopyIcon />
                  &nbsp; {linkCopied ? t('servicesCard.copied') : t('servicesCard.copyLink')}
                </Typography>
              </Button>
            </Box>

            <Typography variant="caption" className={styles.linkExpirationText}>{`${t('servicesCard.linkExpire')} ${
              timeLeft.hours
            }h:${timeLeft.minutes}m:${timeLeft.seconds}s`}</Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default InviteUser;
