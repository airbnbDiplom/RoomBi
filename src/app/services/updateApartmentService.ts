import { DateBooking, OfferedAmenities, newApartment } from '../type/type'
interface Picture {
	PictureName: string
	PictureUrl: string
}
interface TransferDataWithDate {
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
	typeApartment: string
	house: string
	location: string //*Может быть ''*/
	sport: string //*Может быть ''*/
	country: string
	city: string
	cityPlaceId: number
	countryCode: string
	OfferedAmenities: OfferedAmenities
	dateBooking: DateBooking[]
}

export const updateApartmentService = async (newApart: newApartment) => {
	try {
		const dataForTransfer: TransferDataWithDate = initData(newApart)
		console.log('dataForTransfer', dataForTransfer)
		let url = process.env.NEXT_ADD_APARTMENT
		// 'https://roombiserver.azurewebsites.net/api/RentalApartment/create'
		//'https://rombiserv.azurewebsites.net/api/RentalApartment/create'
		if (url === undefined) {
			url = 'https://roombiserver.azurewebsites.net/api/RentalApartment/create'
			//'https://rombiserv.azurewebsites.net/api/RentalApartment/create'
		}
		if (url) {
			const res = await fetch(url, {
				method: 'POST',
				cache: 'no-store',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newApart),
			})

			if (!res.ok) {
				return null
			}

			return res.statusText
		}
	} catch (e) {
		return null
	}
}
const initData = (newApart: newApartment): TransferDataWithDate => {
	const picture: Picture[] = newApart.pictures.map((item, index) => {
		if (index === 1) {
			return {
				PictureName: 'bedroom',
				PictureUrl: `${item.pictureName}`,
			}
		}
		return {
			PictureName: item.pictureName,
			PictureUrl: `${item.pictureUrl}`,
		}
	})
	newApart.picturesName.map((item, index) => {
		if (index === 1) {
			picture.push({
				PictureName: 'bedroom',
				PictureUrl: `${item}`,
			})
		} else
			picture.push({
				PictureName: item,
				PictureUrl: `${item}`,
			})
	})

	const amenities: OfferedAmenities = {
		id: 0,
		wiFi: newApart.offeredAmenities.wiFi,
		tv: newApart.offeredAmenities.tv,
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
		bbqArea: newApart.offeredAmenities.bbqArea,
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
		description: newApart.offeredAmenities.description.trim(),
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
		typeApartment: newApart.typeApartment as any,
		house: newApart.house as any,
		sport: newApart.sport,
		location: newApart.location,
		country: newApart.country,
		city: newApart.city,
		cityPlaceId: newApart.cityPlaceId,
		countryCode: newApart.countryCode,
		OfferedAmenities: amenities,
		dateBooking: newApart.dateBooking,
	}
}
