import { useUserStore } from '@/store/reducers/usersReducer';
import React, { useCallback, useMemo } from 'react';
import {
  Timestamp,
  collection,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  doc as firebaseDoc,
  writeBatch,
  QueryDocumentSnapshot,
  DocumentData,
  getDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/credentials/firebase';
import {
  CONVERSATION,
  USERS,
  // MESSAGES,
  chatRoomIdKey,
  clubKey,
  // createdAtKey,
  deleteOnKey,
  infoKey,
  lastSeenKey,
  pushKey,
  recipientLastSeenKey,
  senderKey,
  senderLastSeenKey,
  stateKey,
  updatedAtKey,
  usersKey,
} from '@/keys/firestoreKeys';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import {
  setConversation,
  setSelectedConversation,
  useConversationStore,
  useSelectedConversationStore,
} from '@/store/reducers/conversationReducer';
import { ConversationInfo, User } from './shared/types';
import { ListChildComponentProps } from 'react-window';
import { convertDocToConvo, getRecipientUID } from '../Profile/util/helper';
import { useAppDispatch } from '@/store/useReduxHook';
import SkeletonItem from './components/SideBar/SkeletonItem';
import SideBarItem from './components/SideBar/SideBarItem';
import Box from '@/components/atoms/box';
import { useGetUserData } from '@/hooks/useGetUserData';
import { useEffectCollectionQuery } from './hook/useEffectCollectionQuery';
import dayjs from 'dayjs';
import Badge from '@/components/atoms/badge';
import { notifyLocalKey } from '@/keys/localStorageKeys';
import { Helper } from '@/utility/helper';
import ReactWindowList from '@/components/organisms/list/ReactWindowList';
import styles from './chat.module.css';
import { useMediaQuery } from '@mui/material';
import { setSelectedBabe } from '@/store/reducers/babeReducer';
import { Item } from '@/props/profileProps';
import { InputProps } from '../BabeProfileSetting/components/interface';

export enum conversationType {
  normal,
  deleted,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SetStateFunction<T> = Dispatch<SetStateAction<T>>;

export interface ChatType {
  isMobile: boolean;
  isTablet: boolean;
  tabsData: any; // You might want to replace 'any' with the actual type
  dataConversation: any; // Replace 'any' with the actual type
  errorChat: any; // Replace 'any' with the actual type
  loadingChat: boolean;
  errorArchive: any; // Replace 'any' with the actual type
  loadingArchive: boolean;
  dataArchive: any; // Replace 'any' with the actual type
  chatUUID: string | undefined;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  router: any; // Replace 'any' with the actual type
  // Bottom variable is not use
  size: any; // Replace 'any' with the actual type
  headerSize: any; // Replace 'any' with the actual type
  uid: any;
  isVerified: boolean;
  rejectedReasonAfter: string;
  userRBAC: any; // Replace 'any' with the actual type
  chatRoomID: string | null;
  heightIncrease: number;
  loadNextPage: (type: conversationType) => void;
  calculateSideBarWidth: () => string;
  Row: any; // Replace 'any' with the actual type
  selectedConversation: any; // Replace 'any' with the actual type
  currentUser: any; // Replace 'any' with the actual type
  isUserDataLoading: boolean;
  userData: any; // Replace 'any' with the actual type
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

const ChatContext = createContext(undefined);

export const ChatProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:1024px)');
  const [activeTab, setActiveTab] = useState(0);
  const clubName = sessionStorage.getItem(clubKey);
  const clubState = sessionStorage.getItem(stateKey);
  const headerSize = clubName && clubState ? 44 : 0;

  const { currentUser } = useUserStore();
  // console.log('currentUser', currentUser);
  const { currentConvo } = useConversationStore();
  const { notification: badgeNotification } = currentConvo;
  const [size] = useWindowSize();
  const searchParams = useSearchParams();
  const selectedConversation = useSelectedConversationStore();
  // const chatUUID = selectedConversation?.id ?? window?.location?.href?.getQueryStringValue('cri');
  const chatUUID = selectedConversation?.id;
  const otherUserId = getRecipientUID(currentUser?.uid, selectedConversation);
  const [otherUid, setOtherUid] = useState<string | undefined>(otherUserId);

  const { loading: isUserDataLoading, data: userData } = useGetUserData(otherUid);

  const chatRoomID = searchParams?.get(chatRoomIdKey);

  const defaultSize = Math.ceil(window.innerHeight / 50);

  const [limitCount, setLimitCount] = useState<number>(defaultSize);
  const [limitCount2, setLimitCount2] = useState<number>(defaultSize); //(defaultSize)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [heightIncrease, setHeightIncrease] = useState<number>(0);

  const [uid, isVerified = false, rejectedReasonAfter = '', userRBAC] = [
    currentUser?.uid,
    currentUser?.verified,
    currentUser?.rejectedReasonAfter,
    currentUser?.userRBAC,
  ];

  const {
    loading: loadingChat,
    error: errorChat,
    data: dataConversation,
    hasNextPage: dataHasNextPage,
  } = useEffectCollectionQuery(
    `${uid}-chat`,
    query(
      collection(db, CONVERSATION),
      where(usersKey, 'array-contains', uid),
      orderBy(updatedAtKey, 'desc'),
      limit(limitCount)
    ),
    limitCount
  );

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: errorArchive,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading: loadingArchive,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: dataArchive,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasNextPage: hasNextPageArchive,
  } = useEffectCollectionQuery(
    `${uid}-del`,
    query(collection(db, CONVERSATION), orderBy(`${infoKey}.${uid}.${deleteOnKey}`, 'desc'), limit(limitCount2)),
    limitCount2
  );

  useEffect(() => {
    const value = getRecipientUID(currentUser?.uid, selectedConversation);
    setOtherUid(value);

    if (!dataConversation) return;

    let playSound = false;
    let notification = 0;
    const promises = [];

    for (let index = 0; index < dataConversation.docs.length; index++) {
      const doc = dataConversation.docs[index];

      const info = doc?.get(infoKey) as User | undefined;
      const isUpdatedAt = doc?.get(updatedAtKey) as Timestamp;

      if (!info || !uid || !isUpdatedAt) {
        continue;
      }

      const isSender = (doc.get(senderKey) as string) === uid;
      const myLastSeen =
        info?.[uid]?.[pushKey] ?? (doc.get(isSender ? senderLastSeenKey : recipientLastSeenKey) as Timestamp);
      const hasMessage = !myLastSeen ? true : myLastSeen < isUpdatedAt ? true : false;

      if (hasMessage) {
        playSound = true;
        promises.push(
          updateDoc(firebaseDoc(db, CONVERSATION, doc?.id), {
            [`${infoKey}.${uid}.${pushKey}`]: Timestamp.fromDate(
              dayjs(isUpdatedAt?.toDate())?.add(0.5, 'second')?.toDate()
            ),
          })
        );
      }

      if (doc.id === selectedConversation?.id) {
        const map = convertDocToConvo(doc);
        setSelectedConversation({ data: map });
      }

      if (!myLastSeen || myLastSeen < isUpdatedAt) {
        notification += 1;
      }
    }

    if (playSound) {
      // playSoundEffect(incomingMessageSound);
    }

    if (promises.length > 0) {
      Promise.all(promises);
    }

    localStorage.setItem(notifyLocalKey, `${notification}`);
    dispatch(setConversation({ notification: notification, data: dataConversation }));

    // eslint-disable-next-line
  }, [dataConversation, activeTab, selectedConversation, currentUser, uid]);

  const loadNextPage = (type: conversationType) => {
    switch (type) {
      case conversationType.normal:
        if ((dataConversation?.size as number) >= limitCount && dataHasNextPage) {
          setLimitCount((prev) => {
            return prev + defaultSize;
          });
        }
        break;

      case conversationType.deleted:
        if ((dataArchive?.size as number) >= limitCount2 && hasNextPageArchive) {
          setLimitCount2((prev) => {
            return prev + defaultSize;
          });
        }
        break;
    }
    // if (dataHasNextPage) {
    //   setLimitCount(
    //     (prev) => prev + 10 // calculateChats()  //10
    //   );
    // }
  };

  const calculateSideBarWidth = useCallback(() => {
    console.log('🚀 ~ calculateSideBarWidth ~ calculateSideBarWidth:', size);
    return size?.width > 600 ? '350px' : '100vw';
  }, [size]);

  const setLastSeen = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
    console.log('🚀 ~ setLastSeen ~ setLastSeen:', setLastSeen);

    const conversation = convertDocToConvo(doc);

    const isMine = uid === (doc?.get(senderKey) as string);

    const key = `${infoKey}.${uid}.${lastSeenKey}`;

    const now = Timestamp.now(); // serverTimestamp()

    const batch = writeBatch(db);

    if (conversation?.id) {
      const nowRef = firebaseDoc(db, CONVERSATION, conversation.id);

      batch.update(nowRef, { [isMine ? senderLastSeenKey : recipientLastSeenKey]: now, [key]: now });
    }

    if (selectedConversation?.id) {
      const prevRef = firebaseDoc(db, CONVERSATION, selectedConversation.id);
      batch.update(prevRef, { [isMine ? senderLastSeenKey : recipientLastSeenKey]: now, [key]: now });
    }

    batch?.commit();
  };
  const onClickConversation = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
    if (selectedConversation?.id === doc?.id) return;

    const conversation = convertDocToConvo(doc);

    if (!conversation) return;

    setLastSeen(doc);
    openChat(conversation);
  };
  const openChat = (conversation: ConversationInfo) => {
    dispatch(setSelectedConversation({ data: conversation }));
    try {
      const getUserId = conversation?.users?.find((item) => item !== currentUser?.uid) ?? '';

      getDoc(doc(db, USERS, getUserId)).then((docs) => {
        const newData = Helper.createItemFromDocument(docs);

        dispatch(setSelectedBabe(newData as Item));
      });
    } catch (error) {
      console.log('OnClick Chat sidebar get babeData Error ==> ', error);
    }
    if (size?.width <= 600) {
      // push chat box
      router?.push(`/chatbox?${chatRoomIdKey}=${conversation?.id}`);
    }
  };

  const Row = ({ index, style }: ListChildComponentProps) => {
    const doc = dataConversation?.docs[index];

    if (!doc) return <SkeletonItem style={style} index={index} />;

    const isSender = (doc?.get(senderKey) as string) === uid;
    const user = doc?.get(infoKey) as User;
    const isUpdatedAt = doc?.get(updatedAtKey) as Timestamp;

    const myLastSeen =
      user?.[uid!]?.[lastSeenKey] ?? (doc?.get(isSender ? senderLastSeenKey : recipientLastSeenKey) as Timestamp);

    const badge = !myLastSeen ? ' ' : myLastSeen < isUpdatedAt ? ' ' : 0;

    return (
      <Box key={index} style={{ ...style, marginTop: `${index * 8}px` }}>
        <SideBarItem
          uid={uid!}
          otherUid={getRecipientUID(uid, convertDocToConvo(doc))}
          isSelected={selectedConversation?.id === doc?.id}
          badge={badge}
          doc={doc}
          time={dayjs(Helper?.timeStempToDate(isUpdatedAt))?.format('hh:mm A')}
          index={index}
          onClick={() => onClickConversation(doc)}
        />
      </Box>
    );
  };
  const RowDeletedChats = ({ index, style }: ListChildComponentProps) => {
    const doc = dataArchive?.docs[index];

    if (!doc) return <SkeletonItem style={style} index={index} />;

    return (
      <div style={style} key={index}>
        <SideBarItem
          isArchive={true}
          uid={uid!}
          otherUid={getRecipientUID(uid, convertDocToConvo(doc))}
          isSelected={selectedConversation?.id === doc.id}
          doc={doc}
          index={index}
        />
      </div>
    );
  };

  const calculatedWidth = useMemo(() => calculateSideBarWidth(), [size]);
  const tabsData = [
    {
      lable: (value: number) => (
        <span
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <span>Conversations</span>

          {badgeNotification?.toString() != '0' && (
            <span>
              <Badge
                badgeContent={badgeNotification}
                sx={{
                  '.MuiBadge-badge': {
                    color: value === 0 ? '#fff' : '',
                    background: value === 0 ? '#E32D2D' : '#F0F0F0',
                  },
                }}
              />
            </span>
          )}
        </span>
      ),
      content: (
        <Box className={styles.userListArr}>
          {/* {(dataConversation?.size as number) > 0 ? ( */}
          <ReactWindowList
            height={size?.height - 56}
            width={calculatedWidth}
            hasNextPage={dataHasNextPage}
            dataSize={dataConversation?.size as number}
            loadNextPage={() => loadNextPage(conversationType.normal)}
            component={Row}
            itemSize={73}
          />
          {/* ) : (
            <Box
              sx={{
                flex: '1 0 0',
                display: 'flex',
                maxWidth: '600px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <EmptyData icon={<EmptyBoxIcon />} msg="You have no messages yet" />
            </Box>
          )} */}
        </Box>
      ),
    },
    {
      lable: (value: number) => (
        <span
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <span>Archived chats</span>
          <span>
            <Badge
              badgeContent={0}
              sx={{
                '.MuiBadge-badge': {
                  color: value === 1 ? '#fff' : '',
                  background: value === 1 ? '#E32D2D' : '#F0F0F0',
                },
              }}
            />
          </span>
        </span>
      ),
      content: (
        // (dataArchive?.size as number) > 0 ? (
        <Box className={styles.userListArr}>
          <ReactWindowList
            height={size?.height - 56}
            width={calculateSideBarWidth()}
            hasNextPage={hasNextPageArchive}
            dataSize={dataArchive?.size as number}
            loadNextPage={() => loadNextPage(conversationType.deleted)}
            component={RowDeletedChats}
            itemSize={73}
          />
        </Box>
      ),
      // ) : (
      //   <Box
      //     className="veer"
      //     sx={{
      //       height: '100%',
      //       minHeight: '100%',
      //       display: 'flex',
      //       maxWidth: '600px',
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //     }}
      //   >
      //     <EmptyData icon={<EmptyBoxIcon />} msg="You have no messages yet" />
      //   </Box>
      // ),
    },
  ];

  const values: any = {
    isMobile,
    isTablet,
    tabsData,
    dataConversation,
    errorChat,
    loadingChat,
    errorArchive,
    loadingArchive,
    dataArchive,
    chatUUID,
    activeTab,
    setActiveTab,
    router,
    // Bottom variable is not use
    size,
    headerSize,
    uid,
    isVerified,
    rejectedReasonAfter: rejectedReasonAfter || '',
    userRBAC,
    chatRoomID,
    heightIncrease,
    loadNextPage,
    calculateSideBarWidth,
    Row,
    selectedConversation,
    currentUser,
    isUserDataLoading,
    userData,
  };
  return (
    <>
      <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
    </>
  );
};

export default ChatContext;
