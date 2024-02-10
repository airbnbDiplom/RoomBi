import { WhenState, WhereState, WhoState } from '@/app/type/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DataSearchType = {
	whenObj: WhenState
	whoObj: WhoState
	whereObj: WhereState
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
		whereObj: {
			continent: '',
			country: '',
			city: '',
			district: '',
			street: '',
		},
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
	},
})
export const { setWhenObjDateCome, setWhenObjDateOut } = searchSlice.actions
export default searchSlice.reducer
