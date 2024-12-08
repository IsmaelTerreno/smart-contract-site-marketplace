import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contractAddress: null,
  isLoaded: false,
  itemsForSale: [],
};

const marketplacesSlice = createSlice({
  name: "marketplaces",
  initialState,
  reducers: {
    contractConnected: (state, action) => {
      state.contract = action.payload.contractAddress;
      state.isLoaded = true;
    },
    itemsForSaleLoaded: (state, action) => {
      state.itemsForSale = action.payload.items;
    },
  },
});

export const contractSelector = (state) => state.marketplaces.contract;

export const { contractConnected, itemsForSaleLoaded } =
  marketplacesSlice.actions;

export default marketplacesSlice.reducer;
