import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const saveBtnSlice = createSlice({
	name: 'saveBtn',
	initialState: {
		btnState: false,
	},
	reducers: {
		saveBtnToggle(state, action: PayloadAction<boolean>) {
			state.btnState = action.payload
		},
	},
})
export const { saveBtnToggle } = saveBtnSlice.actions
export default saveBtnSlice.reducer
