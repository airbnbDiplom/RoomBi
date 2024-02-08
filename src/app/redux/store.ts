import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appState/appSlice";
import apartmentsReducer from "./apartmentsState/apartmentsSlice";

const store = configureStore({
  reducer: {
    appReducer,
    apartmentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
