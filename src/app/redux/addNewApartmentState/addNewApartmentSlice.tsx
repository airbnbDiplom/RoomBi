import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	CardBiProps,
	FilterLngObj,
	MarkerBi,
	newApartment,
} from '@/app/type/type'
import { ApartmentsVariant } from '@/app/[locale]/becomeAHost/components/apartmentsVariantList'

const initialState: newApartment = {
	title: '',
	address: '',
	ingMap: '',
	latMap: '',
	numberOfGuests: 0,
	bedrooms: 0,
	bathrooms: 0,
	beds: 0,
	pricePerNight: 0,
	objectState: '',
	objectRating: 0,
	typeApartment: undefined,
	location: { lat: 46.563328, lng: 30.7888128 },
	house: undefined,
	sport: '',
	country: '',
	countryCode: '',
	city: '',
	county: '',
	wish: false,
	offeredAmenities: {
		wiFi: false, // Наличие WiFi
		tV: false, // Наличие телевизора
		kitchen: false, // Наличие кухни
		washingMachine: false, // Наличие стиральной машины
		freeParking: false, // Бесплатная парковка
		paidParking: false, // Платная парковка
		airConditioner: false, // Наличие кондиционера
		workspace: false, // Наличие рабочей зоны
		specialFeatures: '', // Особенные характеристики
		pool: false, // Наличие бассейна
		jacuzzi: false, // Наличие джакузи
		innerYard: false, // Наличие внутреннего двора
		bBQArea: false, // Наличие зоны для барбекю
		outdoorDiningArea: false, // Наличие обеденной зоны на улице
		firePit: false, // Наличие костровища
		poolTable: false, // Наличие стола для игры в бильярд
		fireplace: false, // Наличие камина
		piano: false, // Наличие пианино
		gymEquipment: false, // Наличие тренажеров
		lakeAccess: false, // Доступ к озеру
		beachAccess: false, // Доступ к пляжу
		skiInOut: false, // Доступ к лыжным трассам
		outdoorShower: false, // Наличие уличного душа
		smokeDetector: false, // Наличие датчика дыма
		firstAidKit: false, // Наличие аптечки
		fireExtinguisher: false, // Наличие огнетушителя
		carbonMonoxideDetector: false, // Наличие датчика угарного газа
	},
	master: {
		id: '',
		name: '',
	},
	description: '',
	pictures: [],
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
			state.location = {
				lat: parseFloat(action.payload.lat),
				lng: parseFloat(action.payload.lon),
			}
		},
	},
})

export const {
	setHouse,
	setTypeApartment,
	setCountry,
	setCountryCode,
	setCounty,
	setCity,
	setCoordinate,
	setAddress,
} = newApartmentsSlice.actions
export default newApartmentsSlice.reducer
