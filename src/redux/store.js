import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './features/user/usersSlice';
// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  reducer: {
    users: usersSlice
  }
});
