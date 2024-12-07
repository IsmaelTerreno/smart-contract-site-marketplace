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
    connectRequested: (state) => {
      const onWeb3AccountsLoaded = (accounts) => {
        console.log(accounts);
      };

      loadWeb3App(onWeb3AccountsLoaded)
        .then((result) => {
          console.info("Web3 loaded successfully");
          window.location.reload();
        })
        .catch((error) => console.error("Error loading Web3:", error));

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
