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
      state.contractAddress = action.payload.contractAddress;
      state.isLoaded = true;
    },
    itemsForSaleLoaded: (state, action) => {
      state.itemsForSale = action.payload.items;
    },
  },
});

export const contractAddressSelector = (state) =>
  state.marketplaces.contractAddress;

export const isLoadedSelector = (state) => state.marketplaces.isLoaded;

export const itemsForSaleSelector = (state) => state.marketplaces.itemsForSale;

export const { contractConnected, itemsForSaleLoaded } =
  marketplacesSlice.actions;

export default marketplacesSlice.reducer;
