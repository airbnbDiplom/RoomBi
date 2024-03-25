import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type App = {
  isMapPage: boolean;
  location: string;
  messengerDisplayCenterBlock: string;
  messengerDisplayLeftBlock: string;
};

const initialState: App = {
  isMapPage: false,
  location: "en",
  messengerDisplayCenterBlock: "none",
  messengerDisplayLeftBlock: "block",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    isMap(state, action: PayloadAction<boolean>) {
      state.isMapPage = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setMessengerDisplayCenterBlock(state, action: PayloadAction<string>) {
      state.messengerDisplayCenterBlock = action.payload;
    },
    setMessengerDisplayLeftBlock(state, action: PayloadAction<string>) {
      state.messengerDisplayLeftBlock = action.payload;
    },
  },
});

export const {
  isMap,
  setLocation,
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
} = appSlice.actions;
export default appSlice.reducer;
