import { ChatForApartmentPageDTO } from "@/app/type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type App = {
  isMapPage: boolean;
  location: string;
  messengerDisplayCenterBlock: string;
  messengerDisplayLeftBlock: string;
  messages: ChatForApartmentPageDTO[];
};

const initialState: App = {
  isMapPage: false,
  location: "en",
  messengerDisplayCenterBlock: "none",
  messengerDisplayLeftBlock: "block",
  messages: [],
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
    setMessages(state, action: PayloadAction<ChatForApartmentPageDTO[]>) {
      state.messages = action.payload;
    },
  },
});

export const {
  isMap,
  setLocation,
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
  setMessages,
} = appSlice.actions;
export default appSlice.reducer;
