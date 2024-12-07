import { createSlice } from "@reduxjs/toolkit";
import { loadWeb3App } from "../../../lib/web3-utils/client";

const initialState = {
  isConnectedWallet: false,
  account: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    connectRequested: (state, action) => {
      loadWeb3App(action.payload.callback).then((r) =>
        console.info("Web3 loaded successfully"),
      );
      state.isConnectedWallet = false;
    },
    connectionSucceeded: (state, action) => {
      state.isConnectedWallet = true;
      state.account = action.payload.account;
    },
  },
});

export const { connectionSucceeded, connectRequested } = usersSlice.actions;

export default usersSlice.reducer;
