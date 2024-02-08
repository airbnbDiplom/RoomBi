import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type App = {
  isMapPage: boolean;
};

const initialState: App = {
  isMapPage: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    isMap(state, action: PayloadAction<boolean>) {
      state.isMapPage = action.payload;
    },
  },
});

export const { isMap } = appSlice.actions;
export default appSlice.reducer;
