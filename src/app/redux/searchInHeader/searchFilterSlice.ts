import { CardBiProps } from '@/app/type/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type searchFilterState = {
	collection: CardBiProps[] | null
}

const initialState: searchFilterState = {
	collection: null,
}

const searchFilterSlice = createSlice({
	name: 'filterSearchState',
	initialState,
	reducers: {
		setSearchFilterState(state, action: PayloadAction<CardBiProps[] | null>) {
			state.collection = action.payload
		},
		setSearchFilterStateDefault(state) {
			state.collection = []
		},
	},
})
export const { setSearchFilterState } = searchFilterSlice.actions

export default searchFilterSlice.reducer
