import { FieldValue, Timestamp } from 'firebase/firestore';
import {
  annonymousKey,
  appKey,
  bioKey,
  category,
  chatRoomIdKey,
  commentsKey,
  hostKey,
  idKey,
  joinedKey,
  messageIdKey,
  mobileUrlKey,
  nicknameKey,
  operatorKeyKey,
  payLinkKey,
  prefKey,
  priceKey,
  ratings2Key,
  ratingsKey,
  reasonKey,
  rejectReasonKey,
  replyKey,
  senderKey,
  servicesKey,
  shortLinkKey,
  spendLimitKey,
  statusKey,
  suffixKey,
  teleIdKey,
  timeStampKey,
  typeKey,
  uidKey,
  urlKey,
  walletLimitKey,
} from '../keys/firestoreKeys';

import { CancelOrRejectEnum, OperatorEnum } from '../enum/myEnum';
import { ServiceDetails } from './servicesProps';

export interface ClubProps {
  name?: string;
  state?: string;
  t?: Timestamp;
}

export interface InfoProps {
  [idKey]: string | undefined;
  [shortLinkKey]: string | undefined;
  [senderKey]: string | undefined;
  [nicknameKey]: string | undefined;
  [teleIdKey]: string | undefined;
  [urlKey]: string | undefined;
  [rejectReasonKey]: string | undefined;
  [hostKey]: string | undefined;
  [mobileUrlKey]: string | undefined;
}

export interface ClubRBACProps {
  name?: string;
  state?: string;
  rbac?: string;
  t?: Timestamp;
}
export interface ClubsRBAC {
  [club: string]: ClubRBACProps;
}

export interface EmeetsProps {
  [prefKey]: string[] | undefined;
  [appKey]: string[] | undefined;
}

export interface UserInfoProps {
  [uid: string]: InfoProps | undefined;
}

export interface RequestRefundProps {
  [sendBy: string]:
    | {
        [urlKey]: string;
        [reasonKey]: string;
        // [reject_reason]: string
      }
    | undefined;
}

export interface HistoryProps {
  [nicknameKey]?: string | undefined;
  [urlKey]?: string | undefined;
  [uidKey]?: string | undefined;
  [timeStampKey]?: Timestamp | FieldValue | undefined;
}

export interface ReviewsProps {
  [ratingsKey]: number;
  [ratings2Key]: number;
  [commentsKey]: string;
  [timeStampKey]: Timestamp;
  [replyKey]: string | undefined;
  [nicknameKey]: string | undefined;
  [annonymousKey]: boolean;
  [senderKey]: string | undefined;
  [servicesKey]: ServiceDetails | undefined;
}

export interface InviteProps {
  [senderKey]: string | undefined;
  [priceKey]: number | undefined;
  [bioKey]: string | undefined;
  [timeStampKey]: FieldValue | Timestamp | undefined;
  [typeKey]: string | undefined;
  [category]: string | undefined;
  [suffixKey]: number | undefined;
  [joinedKey]?: boolean | undefined;
}

export interface CancelRejectProps {
  [chatRoomIdKey]: string;
  [messageIdKey]: string;
  [payLinkKey]: string | null | undefined;
  [statusKey]: CancelOrRejectEnum;
}

export interface PriceLimitProps {
  [operatorKeyKey]?: OperatorEnum | undefined;
  [walletLimitKey]?: number;
  [spendLimitKey]?: number;
}
