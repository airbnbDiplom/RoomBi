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
}
export interface CarouselBiProps {
	pictures: ImgBi[]
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export interface FilterObj {
	id: number
	label: string
	name: string
	src: string
	type: string
}
export interface ButtonOnBigDSearch {
	isWhereDropOn?: boolean
	isWhenDropOn?: boolean
	isWhoDropOn?: boolean
	isWhenDDropOn?: boolean

	setWhereDrop: (setWhereDrop: boolean) => void
	setWhenDrop: (setWhenDrop: boolean) => void
	setWhoDrop: (setWhoDrop: boolean) => void
	setWhenDDrop?: (setWhenDDrop: boolean) => void
}
export interface SearchKindSwitch {
	isSmallSearchOn: boolean
	isBigSearchOn: boolean
	isBigSearchOnBySmall: boolean
	setSmallSearchOn: (setWhereDrop: boolean) => void
	setBigSearchOn: (setWhenDrop: boolean) => void
	setBigSearchOnBySmall: (setWhoDrop: boolean) => void
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
