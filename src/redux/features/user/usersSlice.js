import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnectedWallet: false,
  accountAddress: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    connectRequested: (state) => {
      state.isConnectedWallet = false;
    },
    connectionSucceeded: (state, action) => {
      state.isConnectedWallet = true;
      state.accountAddress = action.payload.accountAddress;
    },
    noAccountsFounded: (state) => {
      state.isConnectedWallet = false;
      state.accountAddress = null;
    },
    errorOnAccountsFetched: (state) => {
      state.isConnectedWallet = false;
      state.accountAddress = null;
    },
  },
});

export const isConnectedWalletSelector = (state) =>
  state.users.isConnectedWallet;
export const accountAddressSelector = (state) => state.users.accountAddress;

export const {
  connectionSucceeded,
  connectRequested,
  noAccountsFounded,
  errorOnAccountsFetched,
} = usersSlice.actions;

export default usersSlice.reducer;
