import searchReducer from './searchInHeader/SearchSlice'
import searchBtnStateReducer from './searchInHeader/SearchBtnStateSlice'
import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appState/appSlice'
import apartmentsReducer from './apartmentsState/apartmentsSlice'
import newApartmentReducer from './addNewApartmentState/addNewApartmentSlice'
import reservReducer from './reservState/reservSlice'
import searchFilterReducer from './searchInHeader/searchFilterSlice'
import searchPriviesSearchObjectReducer from './searchInHeader/searchPriviesSearchObjectSliec'
import updateApartmentSlice from './updateApartment/updateApartmentSlice'
import saveBtnSlice from './updateApartment/saveBtnSlice'
const store = configureStore({
	reducer: {
		appReducer,
		apartmentsReducer,
		searchReducer,
		searchBtnStateReducer,
		reservReducer,
		searchFilterReducer,
		searchPriviesSearchObjectReducer,
		newApartmentReducer,
		updateApartmentSlice,
		saveBtnSlice,
	},
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
