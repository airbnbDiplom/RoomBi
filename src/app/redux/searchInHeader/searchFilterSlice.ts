import { CardBiProps } from '@/app/type/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type searchFilterState = {
	collection: CardBiProps[]
}

const initialState: searchFilterState = {
	collection: [],
}

const searchFilterSlice = createSlice({
	name: 'filterSearchState',
	initialState,
	reducers: {
		setSearchFilterState(state, action: PayloadAction<CardBiProps[]>) {
			state.collection = action.payload
		},
	},
})
export const { setSearchFilterState } = searchFilterSlice.actions

export default searchFilterSlice.reducer
