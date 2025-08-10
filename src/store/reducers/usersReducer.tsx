/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import type { RootState } from '../index';
import { UserProps } from '../../props/userProps';
import { RBACEnum } from '../../enum/myEnum';
import { useAppSelector } from '../useReduxHook';
import fetchUserData from '../thunks/fetchUser';

// Define a type for the slice state
export interface UserState {
  currentUser: UserProps | undefined;
  firebaseUser: User | null;
  loading?: boolean;
  error?: any;
}

// Define the initial state using that type
const initialState: UserState = {
  currentUser: {
    gender: '0',
    isPremium: false,
    clientRecords: 0,
    verified: false,
    stripeApproved: false,
    isActive: false,
    balance: 0,
    isBlock: false,
    email: '',
    isAdmin: undefined,
    blockBroadcast: false,
    userRBAC: RBACEnum.user,
    numberOfRents: 0,
    points: 0,
    pendingCredits: 0,
    incomeCredits: 0,
    penaltyCredits: 0,
    ratings: 0,
    isPhoneVerified: false,
    oldPhoneNumber: null,
  },
  firebaseUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserProps | null>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setFirebaseUser: (state, action: PayloadAction<User | null>) => {
      state.firebaseUser = action.payload;
    },
    logoutAction: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.loading = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { setCurrentUser, setFirebaseUser, logoutAction } = userSlice.actions;

export const useUserStore = () => useAppSelector((state: RootState) => state?.user);
export const useFirebaseUser = () => useAppSelector((state: RootState) => state?.user?.firebaseUser);

export default userSlice.reducer;
