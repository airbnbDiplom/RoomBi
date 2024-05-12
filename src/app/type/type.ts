import { ApartmentsVariant } from '../[locale]/becomeAHost/components/apartmentsVariantList'

export interface HomeParams {
	locale: string
}
export interface ImgBi {
	id: number
	pictureName: string
	pictureUrl: string
	rentalApartmentId: string
}
export interface CardBiProps {
	id: number
	title: string
	country: string
	bookingFree: string
	pictures: ImgBi[]
	pricePerNight: number
	objectRating: number
	choiceGuests: boolean
	ingMap: string
	latMap: string
	house: string
	sport: string
	location: string
	wish: boolean
}
export interface RentalApartmentDTOForStartPage {
	id: number
	title?: string
	pricePerNight: number
	objectRating: number
	country?: string
	bookingFree?: string
	pictures?: ImgBi[]
	ingMap?: string
	latMap?: string
	wish: boolean
	location?: string // Example: "Arctic", can be null
	house?: string // Example: "Apartment", can be null
	sport?: string // Example: "Surfing", can be null
}
// interface DateBookingAlex {
// 	Start: string
// 	End: string
// }
// export interface searchCardBiProps extends CardBiProps {
// 	dateBooking: DateBookingAlex[]
// }
export interface CarouselBiProps {
	pictures: ImgBi[]
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export interface FilterObj {
	id: number
	label: string
	name: string
	name2: string
	src: string
	type: string
}

export interface FilterLngObj {
	id: number
	label: string
	nameUa: string
	nameEn: string
	src: string
	type: string
}

export enum SearchBtnEnum {
	DisableAll = 0,
	Where = 1,
	WhenCome = 2,
	WhenDeparture = 3,
	Who = 4,
	SearchBtn = 5,
}

export interface SearchKindSwitch {
	isSmallSearchOn?: boolean
	isBigSearchOn?: boolean
	isBigSearchOnBySmall?: boolean
	setSmallSearchOn: React.Dispatch<React.SetStateAction<boolean>>
	setBigSearchOn: React.Dispatch<React.SetStateAction<boolean>>
	setBigSearchOnBySmall: React.Dispatch<React.SetStateAction<boolean>>
}
export interface ThemProps {
	isTeamBlack: boolean
}
export interface WhoState {
	gestsCount: number
	childrenCount: number
	babyCount: number
	animalsCount: number
}
export interface WhereState {
	// TODO: сделать объект по приходящим данным
	continent: string
	country: string
	city: string
	district: string
	street: string
}
export interface SearchDataState {
	whoObj: WhoState
	whereObj: WhereState
}

export interface MarkerBi {
	id: number
	pricePerNight: number
	ingMap: string
	latMap: string
}
export interface WhenState {
	dateCome: string
	dateOut: string
}
// ---autoComplete---
export interface AutoCompleteList {
	type: 'AutoCompleteList'
	licence: string
	features: AutoCompleteItem[]
}

export interface AutoCompleteItem {
	address: Address
	addresstype: string
	boundingbox: string[]
	category: string
	display_name: string
	importance: number
	lat: string
	licence: string
	lon: string
	name: string
	osm_id: number
	osm_type: string
	place_id: number
	place_rank: number
	type: string
}
interface Address {
	'ISO3166-2-lvl4': string
	'ISO3166-2-lvl6': string
	borough: string
	city: string
	country: string
	country_code: string
	postcode: string
	district: string
}

// end  ---autoComplete---

export interface DataSearchForSorting {
	where?: {
		type: string
		countryCode: string
		placeId: number
	} | null
	when?: {
		start: string
		end: string
	}
	why?: number
}

//page info

export interface RentalApartmentDTO {
	id: number
	title?: string // Заголовок
	address?: string // Адрес
	ingMap?: string // Долгота на карте
	latMap?: string // Широта на карте
	numberOfGuests: number // Количество гостей
	bedrooms: number // Количество спален
	bathrooms: number // Количество ванных комнат
	beds: number // Количество кроватей
	pricePerNight: number // Цена за ночь
	objectState?: string // Состояние объекта
	objectRating: number // Рейтинг объекта
	typeApartment?: string // Тип апартаментов
	location?: string
	house?: string
	sport?: string
	country?: string
	wish: boolean
	offeredAmenities: OfferedAmenitiesDTO // Предлагаемые удобства
	master: MasterForApartmentPage // Хозяин
	dateBooking: DateBooking[] // Бронирование
	guestComments: GuestCommentsForApartmentPage[] // Комментарии гостей
	pictures: ImgBi[]
}

export interface MasterForApartmentPage {
	id: number
	name?: string
	dateOfBirth?: Date // Дата рождения
	hostingGuests?: number // Сколько лет принимает гостей
	joiningTheCommunity?: string // Дата вступления в сообщество
	profilePicture?: string // Аватар профиля
	currentStatus: boolean // Текущий статус
	language?: string // Язык
	country?: string // Страна
}

export interface OfferedAmenitiesDTO {
	id: number
	wiFi: boolean // Наличие WiFi
	tV: boolean // Наличие телевизора
	kitchen: boolean // Наличие кухни
	washingMachine: boolean // Наличие стиральной машины
	freeParking: boolean // Бесплатная парковка
	paidParking: boolean // Платная парковка
	airConditioner: boolean // Наличие кондиционера
	workspace: boolean // Наличие рабочей зоны
	specialFeatures: string // Особенные характеристики
	pool: boolean // Наличие бассейна
	jacuzzi: boolean // Наличие джакузи
	innerYard: boolean // Наличие внутреннего двора
	bBQArea: boolean // Наличие зоны для барбекю
	outdoorDiningArea: boolean // Наличие обеденной зоны на улице
	firePit: boolean // Наличие костровища
	poolTable: boolean // Наличие стола для игры в бильярд
	fireplace: boolean // Наличие камина
	piano: boolean // Наличие пианино
	gymEquipment: boolean // Наличие тренажеров
	lakeAccess: boolean // Доступ к озеру
	beachAccess: boolean // Доступ к пляжу
	skiInOut: boolean // Доступ к лыжным трассам
	outdoorShower: boolean // Наличие уличного душа
	smokeDetector: boolean // Наличие датчика дыма
	firstAidKit: boolean // Наличие аптечки
	fireExtinguisher: boolean // Наличие огнетушителя
	carbonMonoxideDetector: boolean // Наличие датчика угарного газа
	description: string // Описание
	[key: string]: boolean | string | number
}

export interface BookingForApartmentPageDTO {
	checkInDate: Date // Дата заезда
	checkOutDate: Date // Дата выезда
}
export interface GuestCommentsForApartmentPage {
	id: number
	guestIdUser: number
	userName: string // Имя пользователя
	userCountry: string // Страна пользователя
	userAvatar: string // Аватар пользователя
	comment: string // Текст комментария
	dateTime: Date // Дата и время комментария
	rating: number // Рейтинг
}

export interface DateBi {
	day: number
	month: number
	year: number
}

export interface DateBooking {
	start: DateBi
	end: DateBi
}

export interface Booking {
	apartmentId: number
	checkInDate: DateBi
	checkOutDate: DateBi
	totalPrice: number
	payment: Payment
}

export interface Payment {
	cardNumber: string
	expirationDate: string
	cvv: string
	cardType: string
}

///Фільтер

export interface Filter {
	typeAccommodation: string //Any,FullHouses,Room
	minimumPrice: number //мінімальна ціна
	maximumPrice: number //максимальна ціна
	bedrooms: number //Спальні
	beds: number //Ліжка
	bathrooms: number //Ванні кімнати
	rating: boolean //рейтинг
	typeOfHousing: string[] //Тип житла (houses,Rooms,Countryhouses,Floatinghouses)
	offeredAmenitiesDTO: string[] //Найнеобхідніше
	hostsLanguage: string[] //Англійська
}
export interface FilterCheckboxAmenities {
	value: string
	keyLocale: string
	isChecked: boolean
}

//Повідомлення
export interface MessageObj {
	fotoFrom: string
	fotoTo: string
	fotoApartment: string
	nameApartment: string
	nameFrom: string
	nameTo: string
	booking: Booking
	message: ChatForApartmentPageDTORedax[]
}
export interface ChatForApartmentPageDTO {
	comment: string
	rentalApartmentId: number
	fromId: number
	toId: number
	dateTime: Date
}
export interface ChatForApartmentPageDTORedax {
	comment: string
	rentalApartmentId: number
	fromId: number
	toId: number
	dateTime: string
}
export interface MessageStart {
	message: ChatForApartmentPageDTO
	booking: Booking
}
export interface MessageListProps {
	messages: MessageObj[]
}
export interface MessageObjNotRedax {
	fotoFrom: string
	fotoTo: string
	fotoApartment: string
	nameApartment: string
	nameFrom: string
	nameTo: string
	booking: Booking
	message: ChatForApartmentPageDTO[]
}
export interface MessageListProps {
	messages: MessageObj[]
}
export interface WeatherDay {
	date: string
	temperature: {
		min: string
		max: string
	}
	precipitation: {
		amount: string
		probability: string
	}
	wind: {
		speed: string
		direction: string
	}
}

export interface PlacesGemini {
	name: string // The name of the place
	distance: number // The distance in kilometers
	category: string // The category of the place (e.g., restaurant, museum, park, etc.)
}

export interface LayRoute {
	type: string //          Тип маршруту (літак, потяг, автомобіль)
	description: string //   Опис маршруту
	estimatedTime: string // Приблизний час подорожі
}
export interface newApartment {
	boundingbox: string[]
	title: string // Заголовок
	address: string // Адрес
	houseNum: string
	apartNum: string
	ingMap: string // Долгота на карте
	latMap: string // Широта на карте
	numberOfGuests: number // Количество гостей
	bedrooms: number // Количество спален
	bathrooms: number // Количество ванных комнат
	beds: number // Количество кроватей
	gests: number
	pricePerNight: number // Цена за ночь
	objectState: string // Состояние объекта
	objectRating: number // Рейтинг объекта
	typeApartment: ApartmentsVariant | undefined // Тип апартаментов
	location: string
	house: FilterLngObj | undefined
	sport: string
	country: string
	city: string
	cityPlaceId: number
	county: string
	countryCode: string
	wish: boolean
	offeredAmenities: NewApartmentOfferedAmenities // Предлагаемые удобства
	masterId: string // Хозяин
	description: string // Описание'

	picturesName: string[]
	pictureFile: string[]
}

export interface AmenitiesObj {
	existence: boolean
	type: string
}
export interface NewApartmentOfferedAmenities {
	[key: string]: boolean
	wiFi: boolean // Наличие WiFi
	tV: boolean // Наличие телевизора
	kitchen: boolean // Наличие кухни
	washingMachine: boolean // Наличие стиральной машины
	freeParking: boolean // Бесплатная парковка
	paidParking: boolean // Платная парковка
	airConditioner: boolean // Наличие кондиционера
	workspace: boolean // Наличие рабочей зоны
	// specialFeatures: string // Особенные характеристики
	pool: boolean // Наличие бассейна
	jacuzzi: boolean // Наличие джакузи
	innerYard: boolean // Наличие внутреннего двора
	bBQArea: boolean // Наличие зоны для барбекю
	outdoorDiningArea: boolean // Наличие обеденной зоны на улице
	firePit: boolean // Наличие костровища
	poolTable: boolean // Наличие стола для игры в бильярд
	fireplace: boolean // Наличие камина
	piano: boolean // Наличие пианино
	gymEquipment: boolean // Наличие тренажеров
	lakeAccess: boolean // Доступ к озеру
	beachAccess: boolean // Доступ к пляжу
	skiInOut: boolean // Доступ к лыжным трассам
	outdoorShower: boolean // Наличие уличного душа
	smokeDetector: boolean // Наличие датчика дыма
	firstAidKit: boolean // Наличие аптечки
	fireExtinguisher: boolean // Наличие огнетушителя
	carbonMonoxideDetector: boolean // Наличие датчика угарного газа
}

export interface autoCompleteObj {
	address: Address
	place_id: number
	licence: string
	osm_type: string
	osm_id: number
	lat: string
	lon: string
	class: string
	type: string
	place_rank: number
	importance: number
	addresstype: string
	name: string
	display_name: string
	boundingbox: string[]
}
