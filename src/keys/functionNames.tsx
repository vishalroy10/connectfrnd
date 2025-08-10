export const isTEST = process.env.NODE_ENV === 'development';

export const stripeConnectFunction = isTEST ? 'stripeConnectTEST' : 'stripeConnect';
export const stripeRetrieveAccountFunction = isTEST ? 'stripeRetrieveAccountTEST' : 'stripeRetrieveAccount';
export const recentlyActiveFunction = 'recentlyActive';
export const recentlyActivePremiumUserFunction = 'recentlyActivePremiumUser';
export const sendTelegramNotificationFunction = 'sendTelegramNotification';
export const sendPushNotificationFunction = 'sendPushNotification';
export const requestRefundFunction = 'requestRefund';
export const lockChatFunction = 'lockChatV1'; // lockChat
export const transferPendingToIncome = 'transferPendingToIncome';
export const moveIncomeToCashFunction = 'moveIncomeToCash3';

export const stripeCreateLoginLinkFunction = isTEST ? 'stripeCreateLoginLinkTEST' : 'stripeCreateLoginLink';

export const sendCreditPaymentV2Function = 'sendCreditPayment4'; // sendCreditPayment2,3

export const refundCreditFunction = 'refundCredit';
export const updateUserReviewFunction = 'updateUserReview';
export const tipUserFunction = 'tipUser';

export const stripeCheckOutV6Function = 'stripeCheckOutV7'; // "stripeCheckOutV6"
// export const stripeCheckOutV5Function = "stripeCheckOutV6"

export const newConversationV2Function = 'newConversationV5'; // "newConversationV4"

// closeBroadcastTEST
export const closeBroadcastFunction = isTEST ? 'closeBroadcastV1' : 'closeBroadcastV1';

export const stripeBuyCustomCreditFunction = isTEST ? 'stripeBuyCustomCredit' : 'stripeBuyCustomCredit';
export const sendBroadcastFunction = isTEST ? 'sendBroadcastV5' : 'sendBroadcastV5'; // sendBroadcastV2
// export const sendBroadcast2Function = isTEST ? "sendBroadcastTEST" : "sendBroadcastV2"

export const inviteDoubleDatesv1Function = 'inviteDoubleDatesv1';
export const removeDoubleDatesv1Function = 'removeDoubleDatesv1';

export const banUserFunction = 'banUser';

export const updateUserProviderDetails = 'updateUserProviderDetails';
