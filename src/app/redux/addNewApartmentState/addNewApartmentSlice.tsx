import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	FilterLngObj,
	newApartment,
	NewApartmentOfferedAmenities,
} from '@/app/type/type'
import { ApartmentsVariant } from '@/app/[locale]/becomeAHost/components/apartmentsVariantList'

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
	pictureFile: [],
	pictures: [],
	dateBooking: [],
}

const newApartmentsSlice = createSlice({
	name: 'newApartments',
	initialState,
	reducers: {
		setHouse(state, action: PayloadAction<FilterLngObj | undefined>) {
			state.house = action.payload
		},
		setTypeApartment(state, action: PayloadAction<ApartmentsVariant>) {
			state.typeApartment = action.payload
		},
		setCountry(state, action: PayloadAction<string>) {
			state.country = action.payload
		},
		setCountryCode(state, action: PayloadAction<string>) {
			state.countryCode = action.payload
		},
		setCounty(state, action: PayloadAction<string>) {
			state.county = action.payload
		},
		setCity(state, action: PayloadAction<string>) {
			state.city = action.payload
		},
		setAddress(state, action: PayloadAction<string>) {
			state.address = action.payload
		},
		setCoordinate(state, action: PayloadAction<{ lat: string; lon: string }>) {
			;(state.ingMap = action.payload.lat), (state.latMap = action.payload.lon)
		},
		setBoundingbox(state, action: PayloadAction<string[]>) {
			state.boundingbox = action.payload
		},
		setHouseNum(state, action: PayloadAction<string>) {
			state.houseNum = action.payload
		},
		setApartNum(state, action: PayloadAction<string>) {
			state.apartNum = action.payload
		},
		setCityPlaceId(state, action: PayloadAction<number>) {
			state.cityPlaceId = action.payload
		},
		setGests(state, action: PayloadAction<number>) {
			state.gests = action.payload
		},
		setBedrooms(state, action: PayloadAction<number>) {
			state.bedrooms = action.payload
		},
		setBeds(state, action: PayloadAction<number>) {
			state.beds = action.payload
		},
		setBathrooms(state, action: PayloadAction<number>) {
			state.bathrooms = action.payload
		},
		setOfferedAmenities(
			state,
			action: PayloadAction<NewApartmentOfferedAmenities>
		) {
			state.offeredAmenities = action.payload
		},
		setPhotoFile(state, action: PayloadAction<string>) {
			state.pictureFile.push(action.payload)
		},
		setPhotoName(state, action: PayloadAction<string>) {
			state.picturesName.push(action.payload)
		},
		removePhotoFile(state, action: PayloadAction<number>) {
			state.pictureFile.splice(action.payload, 1)
		},
		removePhotoName(state, action: PayloadAction<number>) {
			state.picturesName.splice(action.payload, 1)
		},
		setTitle(state, action: PayloadAction<string>) {
			state.title = action.payload
		},
		setDescription(state, action: PayloadAction<string>) {
			state.description = action.payload
		},
		setPrice(state, action: PayloadAction<number>) {
			state.pricePerNight = action.payload
		},
		serMasterId(state, action: PayloadAction<string>) {
			state.masterId = action.payload
		},
		resetState(state) {
			return initialState
		},
	},
})

export const {
	setGests,
	setBedrooms,
	setBathrooms,
	setBeds,
	setHouse,
	setTypeApartment,
	setCountry,
	setCountryCode,
	setCounty,
	setCity,
	setCoordinate,
	setAddress,
	setBoundingbox,
	setHouseNum,
	setApartNum,
	setCityPlaceId,
	setOfferedAmenities,
	setPhotoFile,
	setPhotoName,
	removePhotoFile,
	removePhotoName,
	setTitle,
	setDescription,
	setPrice,
	serMasterId,
	resetState,
} = newApartmentsSlice.actions
export default newApartmentsSlice.reducer
