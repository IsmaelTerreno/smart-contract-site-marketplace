import { createSlice } from '@reduxjs/toolkit';
import {loadWeb3App} from "../../../lib/web3-utils/client";

const initialState = {
  isConnectedWallet: false,
  account: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    connectionSucceeded: (state, action) => {
      state.isConnectedWallet = true;
    },
    connectRequested: (state) => {
      loadWeb3App(() => {
      }).then(r => console.log('Web3 loaded successfully'));
      state.isConnectedWallet = false;
    }
  }
});


export const { connectionSucceeded, connectRequested } = usersSlice.actions;

export default usersSlice.reducer;
