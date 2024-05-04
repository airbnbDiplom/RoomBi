import {
  MessageObj,
  ChatForApartmentPageDTORedax,
  CardBiProps,
} from "@/app/type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type App = {
  isMapPage: boolean;
  location: string;
  messengerDisplayCenterBlock: string;
  messengerDisplayLeftBlock: string;
  messages: MessageObj | null;
  messageObjList: MessageObj[];
  wishList: CardBiProps[];
};

const initialState: App = {
  isMapPage: false,
  location: "en",
  messengerDisplayCenterBlock: "none",
  messengerDisplayLeftBlock: "block",
  messages: null,
  messageObjList: [],
  wishList: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    isMap(state, action: PayloadAction<boolean>) {
      state.isMapPage = action.payload;
    },

    sendMessageRedax(
      state,
      action: PayloadAction<ChatForApartmentPageDTORedax>
    ) {
      const ms = action.payload;
      const updatedMessageObjList = [...state.messageObjList];
      const index = updatedMessageObjList.findIndex(
        (item) => item.message[0].rentalApartmentId === ms.rentalApartmentId
      );
      if (index !== -1) {
        updatedMessageObjList[index].message.push(ms);
      }
      state.messageObjList = updatedMessageObjList;
      state.messages = state.messageObjList[index];
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setWishList(state, action: PayloadAction<CardBiProps[]>) {
      state.wishList = action.payload;
    },
    setMessageObjList(state, action: PayloadAction<MessageObj[]>) {
      state.messageObjList = action.payload;
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
    removeItemByIdWishList(state, action: PayloadAction<number>) {
      state.wishList = state.wishList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  isMap,
  setLocation,
  setMessengerDisplayCenterBlock,
  setMessengerDisplayLeftBlock,
  setMessages,
  setMessageObjList,
  sendMessageRedax,
  setWishList,
  removeItemByIdWishList,
} = appSlice.actions;
export default appSlice.reducer;
