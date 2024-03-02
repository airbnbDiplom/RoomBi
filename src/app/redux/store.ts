import searchReducer from "./searchInHeader/SearchSlice";
import searchBtnStateReducer from "./searchInHeader/SearchBtnStateSlice";
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appState/appSlice";
import apartmentsReducer from "./apartmentsState/apartmentsSlice";
import reservReducer from "./reservState/reservSlice";

const store = configureStore({
  reducer: {
    appReducer,
    apartmentsReducer,
    searchReducer,
    searchBtnStateReducer,
    reservReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
