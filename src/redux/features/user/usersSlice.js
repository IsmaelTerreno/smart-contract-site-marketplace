import { createSlice } from "@reduxjs/toolkit";
import { loadWeb3App } from "../../../lib/web3-utils/client";

const initialState = {
  isConnectedWallet: false,
  accountAddress: null,
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
