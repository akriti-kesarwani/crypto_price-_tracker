import { configureStore } from '@reduxjs/toolkit';
import type { ThunkAction, Action } from '@reduxjs/toolkit';
import cryptoReducer from '@/features/crypto/cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export type RootState = {
  crypto: ReturnType<typeof cryptoReducer>;
};

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
