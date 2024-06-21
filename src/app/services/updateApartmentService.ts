import { DateBooking, OfferedAmenities, newApartment } from '../type/type'
interface Picture {
	PictureName: string
	PictureUrl: string
}
interface TransferDataWithDate {
	apartmentId: number
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
	location?: string | null //*Может быть ''*/
	sport: string | null //*Может быть ''*/
	country: string
	city: string
	cityPlaceId: number
	countryCode: string
	OfferedAmenities: OfferedAmenities
	dateBooking: DateBooking[]
}

export const updateApartmentService = async (
	newApart: newApartment,
	apartmentId: string
) => {
	try {
		const dataForTransfer: TransferDataWithDate = initData(
			newApart,
			apartmentId
		)
		console.log('dataForTransfer', dataForTransfer)
		let url =
			'https://roombiserver.azurewebsites.net/api/RentalApartment/update'
		//'https://localhost:7158/api/RentalApartment/update'

		if (url === undefined) {
			url = 'https://rombiserv.azurewebsites.net/api/RentalApartment/update'
		}
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

			return res
		}
	} catch (e) {
		return null
	}
}
const initData = (
	newApart: newApartment,
	apartmentId: string
): TransferDataWithDate => {
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
		id: parseInt(newApart.offeredAmenities.id),
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
		apartmentId: parseInt(apartmentId),
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
		sport: newApart.sport !== '' ? newApart.sport : null,
		location: newApart.location !== '' ? newApart.location : null,
		country: newApart.country,
		city: newApart.city,
		cityPlaceId: newApart.cityPlaceId,
		countryCode: newApart.countryCode,
		OfferedAmenities: amenities,
		dateBooking: newApart.dateBooking,
	}
}
