import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type App = {
  isMapPage: boolean;
  location: string;
};

const initialState: App = {
  isMapPage: false,
  location: "en",
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
  },
});

export const { isMap, setLocation } = appSlice.actions;
export default appSlice.reducer;
