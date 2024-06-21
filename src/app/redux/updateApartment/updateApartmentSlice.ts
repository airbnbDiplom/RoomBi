import {
	DateBi,
	DateBooking,
	FilterLngObj,
	ImgBi,
	newApartment,
} from '@/app/type/type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ApartmentsVariant } from '@/app/[locale]/becomeAHost/components/apartmentsVariantList'
import {
	setCity,
	setCountry,
} from '../addNewApartmentState/addNewApartmentSlice'

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
		id: '',
		wiFi: false,
		tv: false,
		kitchen: false,
		washingMachine: false,
		freeParking: false,
		paidParking: false,
		airConditioner: false,
		workspace: false,
		pool: false,
		jacuzzi: false,
		innerYard: false,
		bbqArea: false,
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
	dateBooking: [],
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
		setDateBooking(state, action: PayloadAction<DateBooking>) {
			state.dateBooking.push(action.payload)
		},
		setDeleteAmenity(state, action: PayloadAction<string>) {
			state.offeredAmenities[action.payload] = false
		},
		setAmenityInEdit(state, action: PayloadAction<string>) {
			state.offeredAmenities[action.payload] = true
		},
		setGestsEdit(state, action: PayloadAction<number>) {
			state.gests = action.payload
		},
		setBedroomsEdit(state, action: PayloadAction<number>) {
			state.bedrooms = action.payload
		},
		setBedsEdit(state, action: PayloadAction<number>) {
			state.beds = action.payload
		},
		setBathroomsEdit(state, action: PayloadAction<number>) {
			state.bathrooms = action.payload
		},
		setApartmentPartEdit(state, action: PayloadAction<ApartmentsVariant>) {
			state.typeApartment = action.payload
		},
		setHouseEdit(state, action: PayloadAction<FilterLngObj>) {
			state.house = action.payload
		},
		setSportsEdit(state, action: PayloadAction<FilterLngObj>) {
			state.sport = action.payload.nameUa === 'Нет' ? '' : action.payload.nameUa
		},
		setLocationEdit(state, action: PayloadAction<FilterLngObj>) {
			state.location =
				action.payload.nameUa === 'Нет' ? '' : action.payload.nameUa
		},
		setCountryEdit(state, action: PayloadAction<string>) {
			state.country = action.payload
		},
		setCountryCodeEdit(state, action: PayloadAction<string>) {
			state.countryCode = action.payload
		},
		setCityEdit(state, action: PayloadAction<string>) {
			state.city = action.payload
		},
		setPlaceIdEdit(state, action: PayloadAction<number>) {
			state.cityPlaceId = action.payload
		},
		setCoordinateEdit(
			state,
			action: PayloadAction<{ lat: string; lon: string }>
		) {
			;(state.ingMap = action.payload.lat), (state.latMap = action.payload.lon)
		},
		setAddressEdit(state, action: PayloadAction<string>) {
			state.address = action.payload
		},
		setMasterIdForEdit(state, action: PayloadAction<string>) {
			state.masterId = action.payload
		},
		setPriceEditEdit(state, action: PayloadAction<number>) {
			state.pricePerNight = action.payload
		},
	},
})
export const {
	setPriceEditEdit,
	setMasterIdForEdit,
	setAddressEdit,
	setCoordinateEdit,
	setCityEdit,
	setPlaceIdEdit,
	setCountryCodeEdit,
	setCountryEdit,
	setApartmentPartEdit,
	setLocationEdit,
	setSportsEdit,
	setHouseEdit,
	setApartment,
	setDescriptionUpdate,
	setPictureArray,
	setFileArray,
	setFileNameArray,
	setNewFileItemArray,
	setNewFileNameArray,
	setDateBooking,
	setDeleteAmenity,
	setAmenityInEdit,
	setGestsEdit,
	setBedroomsEdit,
	setBedsEdit,
	setBathroomsEdit,
} = updateApartmentSlice.actions
export default updateApartmentSlice.reducer
