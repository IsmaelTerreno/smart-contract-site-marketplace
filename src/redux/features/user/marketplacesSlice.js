import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contract: null,
};

const marketplacesSlice = createSlice({
  name: "marketplaces",
  initialState,
  reducers: {
    contractConnected: (state, action) => {
      state.contract = action.payload.contract;
    },
  },
});

export const contractSelector = (state) => state.marketplaces.contract;

export const { contractConnected } = marketplacesSlice.actions;

export default marketplacesSlice.reducer;
