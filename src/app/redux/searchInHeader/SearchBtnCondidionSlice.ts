import {
	SearchBtnSwitcherEnum,
	WhenState,
	WhereState,
	WhoState,
} from '@/app/type/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SearchBtnSwitcherState = {
	bntState: number
}

const initialState: SearchBtnSwitcherState = {
	bntState: SearchBtnSwitcherEnum.DisableAll,
}

const searchSlice = createSlice({
	name: 'btnSearchState',
	initialState,
	reducers: {
		setBtnState(state, action: PayloadAction<number>) {
			state.bntState = action.payload
		},
	},
})
export default searchSlice.reducer
