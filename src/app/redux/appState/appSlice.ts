import { MessageObj } from "@/app/type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type App = {
  isMapPage: boolean;
  location: string;
  messengerDisplayCenterBlock: string;
  messengerDisplayLeftBlock: string;
  messages: MessageObj | null;
};

const initialState: App = {
  isMapPage: false,
  location: "en",
  messengerDisplayCenterBlock: "none",
  messengerDisplayLeftBlock: "block",
  messages: null,
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
    setMessages(state, action: PayloadAction<MessageObj>) {
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
