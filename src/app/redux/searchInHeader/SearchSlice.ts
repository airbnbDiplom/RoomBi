import { AutoCompleteItem, WhenState, WhoState } from '@/app/type/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DataSearchType = {
	whenObj: WhenState
	whoObj: WhoState
	whereObj: AutoCompleteItem
}
type DataSearchState = {
	DataSearchObj: DataSearchType
}
const initialState: DataSearchState = {
	DataSearchObj: {
		whenObj: {
			dateCome: '',
			dateOut: '',
		},
		whoObj: {
			gestsCount: 0,
			childrenCount: 0,
			babyCount: 0,
			animalsCount: 0,
		},
		whereObj: {} as AutoCompleteItem,
	},
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setWhenObjDateCome(state, action: PayloadAction<string>) {
			state.DataSearchObj.whenObj.dateCome = action.payload
		},
		setWhenObjDateOut(state, action: PayloadAction<string>) {
			state.DataSearchObj.whenObj.dateOut = action.payload
		},
		setWhereObj(state, action: PayloadAction<AutoCompleteItem>) {
			state.DataSearchObj.whereObj = action.payload
		},
		setWhereEmptyObj(state) {
			state.DataSearchObj.whereObj = {} as AutoCompleteItem
		},
		setWhoObjGestCount(state, action: PayloadAction<number>) {
			state.DataSearchObj.whoObj.gestsCount = action.payload
		},
		setWhoObjChildrenCount(state, action: PayloadAction<number>) {
			state.DataSearchObj.whoObj.childrenCount = action.payload
		},
		setWhoObjBabyCount(state, action: PayloadAction<number>) {
			state.DataSearchObj.whoObj.babyCount = action.payload
		},
		setWhoObjAnimalsCount(state, action: PayloadAction<number>) {
			state.DataSearchObj.whoObj.animalsCount = action.payload
		},
	},
})
export const {
	setWhenObjDateCome,
	setWhenObjDateOut,
	setWhereObj,
	setWhereEmptyObj,
	setWhoObjGestCount,
	setWhoObjChildrenCount,
	setWhoObjBabyCount,
	setWhoObjAnimalsCount,
} = searchSlice.actions
export default searchSlice.reducer
