export interface CardBiProps {
	id: number
	title: string
	country: string
	date: string
	src: string[]
	price: number
	rating: number
	choiceGuests: boolean
}
export interface CarouselBiProps {
	src: string[]
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
	isWhereDropOn: boolean
	isWhenDropOn: boolean
	isWhoDropOn: boolean
	setWhereDrop: (setWhereDrop: boolean) => void
	setWhenDrop: (setWhenDrop: boolean) => void
	setWhoDrop: (setWhoDrop: boolean) => void
}
export interface SearchKindSwitch {
	isSmallSearchOn: boolean
	isBigSearchOn: boolean
	isBigSearchOnBySmall: boolean
	setSmallSearchOn: (setSmallSearchOn: boolean) => void
	setBigSearchOn: (serBigSearchOn: boolean) => void
	setBigSearchOnBySmall: (setBigSearchOnBySmall: boolean) => void
}
