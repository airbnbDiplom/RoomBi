import { ImgBi, newApartment } from '@/app/type/type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: newApartment = {
	boundingbox: [],
	title: '',
	address: '',
	houseNum: '',
	apartNum: '',
	ingMap: '',
	latMap: '',
	numberOfGuests: 0,
	bedrooms: 1,
	bathrooms: 1,
	beds: 1,
	gests: 1,
	pricePerNight: 0,
	objectState: '',
	objectRating: 0,
	typeApartment: undefined,
	location: '',
	house: undefined,
	sport: '',
	country: '',
	countryCode: '',
	city: '',
	cityPlaceId: 0,
	county: '',
	wish: false,
	offeredAmenities: {
		wiFi: false,
		tV: false,
		kitchen: false,
		washingMachine: false,
		freeParking: false,
		paidParking: false,
		airConditioner: false,
		workspace: false,
		pool: false,
		jacuzzi: false,
		innerYard: false,
		bBQArea: false,
		outdoorDiningArea: false,
		firePit: false,
		poolTable: false,
		fireplace: false,
		piano: false,
		gymEquipment: false,
		lakeAccess: false,
		beachAccess: false,
		skiInOut: false,
		outdoorShower: false,
		smokeDetector: false,
		firstAidKit: false,
		fireExtinguisher: false,
		carbonMonoxideDetector: false,
		description: '',
	},
	masterId: '',
	description: '',
	picturesName: [],
	pictures: [],
	pictureFile: [],
}

const updateApartmentSlice = createSlice({
	name: 'updateApartmentStore',
	initialState: initialState,
	reducers: {
		setApartment(state, action: PayloadAction<newApartment>) {
			return { ...state, ...action.payload }
		},
		setDescriptionUpdate(state, action: PayloadAction<string>) {
			state.offeredAmenities.description = action.payload
		},
		setPictureArray(state, action: PayloadAction<ImgBi[]>) {
			state.pictures = action.payload
		},
		setNewFileItemArray(state, action: PayloadAction<string>) {
			state.pictureFile.push(action.payload)
		},
		setNewFileNameArray(state, action: PayloadAction<string>) {
			state.picturesName.push(action.payload)
		},
		setFileArray(state, action: PayloadAction<string[]>) {
			state.pictureFile = action.payload
		},
		setFileNameArray(state, action: PayloadAction<string[]>) {
			state.picturesName = action.payload
		},
	},
})
export const {
	setApartment,
	setDescriptionUpdate,
	setPictureArray,
	setFileArray,
	setFileNameArray,
	setNewFileItemArray,
	setNewFileNameArray,
} = updateApartmentSlice.actions
export default updateApartmentSlice.reducer
