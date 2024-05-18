import { OfferedAmenities, newApartment } from '../type/type'
interface Picture {
	PictureName: string
	PictureUrl: string
}
interface TransferData {
	title: string // Заголовок
	address: string // Адрес
	masterId: number // Хозяин
	pictures: Picture[]
	ingMap: string // Долгота на карте
	latMap: string // Широта на карте
	numberOfGuests: number
	bedrooms: number // Количество спален
	bathrooms: number // Количество ванных комнат
	beds: number // Количество кроватей
	pricePerNight: number
	typeApartment: string //*спросить*/
	house: string //*спросить*/
	location: string
	sport: string
	country: string
	city: string
	cityPlaceId: number
	countryCode: string
	OfferedAmenities: OfferedAmenities
}

export const addNewApartServes = async (newApart: newApartment) => {
	try {
		const dataForTransfer: TransferData = initData(newApart)
		console.log('dataForTransfer', dataForTransfer)
		const url =
			'https://roombiserver.azurewebsites.net/api/RentalApartment/create'

		if (url) {
			const res = await fetch(url, {
				method: 'POST',
				cache: 'no-store',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataForTransfer),
			})

			if (!res.ok) {
				return null
			}

			return res.status
		}
	} catch (e) {
		return null
	}
}
const initData = (newApart: newApartment): TransferData => {
	const picture: Picture[] = newApart.picturesName.map(item => {
		return {
			PictureName: item,
			PictureUrl: `${item}`,
		}
	})

	const amenities: OfferedAmenities = {
		id: 0,
		wiFi: newApart.offeredAmenities.wiFi,
		tV: newApart.offeredAmenities.tV,
		kitchen: newApart.offeredAmenities.kitchen,
		washingMachine: newApart.offeredAmenities.washingMachine,
		freeParking: newApart.offeredAmenities.freeParking,
		paidParking: newApart.offeredAmenities.paidParking,
		airConditioner: newApart.offeredAmenities.airConditioner,
		workspace: newApart.offeredAmenities.workspace,
		specialFeatures: '',
		pool: newApart.offeredAmenities.pool,
		jacuzzi: newApart.offeredAmenities.jacuzzi,
		innerYard: newApart.offeredAmenities.innerYard,
		bBQArea: newApart.offeredAmenities.bBQArea,
		outdoorDiningArea: newApart.offeredAmenities.outdoorDiningArea,
		firePit: newApart.offeredAmenities.firePit,
		poolTable: newApart.offeredAmenities.poolTable,
		fireplace: newApart.offeredAmenities.fireplace,
		piano: newApart.offeredAmenities.piano,
		gymEquipment: newApart.offeredAmenities.gymEquipment,
		lakeAccess: newApart.offeredAmenities.lakeAccess,
		beachAccess: newApart.offeredAmenities.beachAccess,
		skiInOut: newApart.offeredAmenities.skiInOut,
		outdoorShower: newApart.offeredAmenities.outdoorShower,
		smokeDetector: newApart.offeredAmenities.smokeDetector,
		firstAidKit: newApart.offeredAmenities.firstAidKit,
		fireExtinguisher: newApart.offeredAmenities.fireExtinguisher,
		carbonMonoxideDetector: newApart.offeredAmenities.carbonMonoxideDetector,
		description: newApart.description.trim(),
	}
	return {
		title: newApart.title.trim(),
		address: `${newApart.address} ${newApart.houseNum} ${newApart.apartNum}`,
		masterId: parseInt(newApart.masterId),
		pictures: picture,
		ingMap: newApart.ingMap,
		latMap: newApart.latMap,
		numberOfGuests: newApart.gests,
		bedrooms: newApart.bedrooms,
		bathrooms: newApart.bathrooms,
		beds: newApart.beds,
		pricePerNight: newApart.pricePerNight,
		typeApartment: newApart.typeApartment!.ukName,
		house: newApart.house!.nameUa,
		sport: '',
		location: '',
		country: newApart.country,
		city: newApart.city,
		cityPlaceId: newApart.cityPlaceId,
		countryCode: newApart.countryCode,
		OfferedAmenities: amenities,
	}
}
