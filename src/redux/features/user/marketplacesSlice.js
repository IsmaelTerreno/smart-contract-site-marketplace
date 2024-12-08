import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contractAddress: null,
  isLoaded: false,
};

const marketplacesSlice = createSlice({
  name: "marketplaces",
  initialState,
  reducers: {
    contractConnected: (state, action) => {
      state.contract = action.payload.contractAddress;
      state.isLoaded = true;
    },
  },
});

export const contractSelector = (state) => state.marketplaces.contract;

export const { contractConnected } = marketplacesSlice.actions;

export default marketplacesSlice.reducer;
