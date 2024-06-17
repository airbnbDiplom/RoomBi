import {
	setAddress,
	setCoordinate,
	setCountry,
	setCountryCode,
} from '@/app/redux/addNewApartmentState/addNewApartmentSlice'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { getAddressByLatLng } from '@/app/services/autoCompleteService'
import { autoCompleteObj } from '@/app/type/type'
import L, { LatLng } from 'leaflet'
import React, { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMapEvents } from 'react-leaflet'
interface MapEventsProps {
	location: [number, number] | undefined
}
const MapEventsComponentNew: React.FC<MapEventsProps> = ({ location }) => {
	const [clickedPosition, setClickedPosition] = useState<LatLng | null>(null)
	const [markerPosition, setMarkerPosition] = useState<L.Marker<any> | null>(
		null
	)

	const customIcon = L.icon({
		iconUrl: '/icon/pointOnMap.svg',
		iconSize: [32, 32],
	})
	const stateObj = useAppSelector(state => state.newApartmentReducer)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (stateObj.address && stateObj.address.length > 0) {
			removeMarker()
			if (location) {
				const newMarker = L.marker(location).addTo(map).setIcon(customIcon)
				setMarkerPosition(newMarker)
				popUp(newMarker)
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateObj.address])
	const { t } = useTranslation()
	const popUp = (newMarker: L.Marker<any>) => {
		const popupContent = t('mark')
		newMarker.bindPopup(popupContent).openPopup()
		setTimeout(() => {
			newMarker.closePopup()
		}, 4000)
	}
	const removeMarker = () => {
		if (markerPosition !== null) map.removeLayer(markerPosition)
	}
	const map = useMapEvents({
		locationfound(e) {
			if (location) map.flyTo(location, map.getZoom())
		},
		click(e) {
			if (stateObj.city.length > 0 && stateObj.country.length > 0) {
				setClickedPosition(e.latlng)
				removeMarker()
				const newMarker = L.marker(e.latlng).addTo(map).setIcon(customIcon)
				setMarkerPosition(newMarker)
				map.flyTo(e.latlng, map.getZoom())
				dispatch(
					setCoordinate({
						lat: e.latlng.lat.toString(),
						lon: e.latlng.lng.toString(),
					})
				)
				console.log('stateObj', stateObj)
				//popUp(newMarker)
			}
		},
	})

	useEffect(() => {
		map.locate()
	}, [map, location])
	useEffect(() => {
		if (stateObj.boundingbox && stateObj.boundingbox.length > 0) {
			const bounds = stateObj.boundingbox.map(parseFloat)
			const southWest = L.latLng(bounds[0], bounds[2])
			const northEast = L.latLng(bounds[1], bounds[3])
			const newBounds = L.latLngBounds(southWest, northEast)
			map?.fitBounds(newBounds)
		}
	}, [map, stateObj.boundingbox])
	useEffect(() => {
		if (clickedPosition?.lat && clickedPosition?.lng) {
			getAddressByLatLng(
				clickedPosition?.lat.toFixed(3).toString(),
				clickedPosition?.lng.toFixed(3).toString(),
				t('locale')
			).then(res => {
				if (res) writeToStor(res)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clickedPosition])
	const writeToStor = (res: autoCompleteObj) => {
		if (stateObj.country !== res.address.country) {
			dispatch(setCountry(res.address.country))
			dispatch(setCountryCode(res.address.country_code))
		}
		if (stateObj.city !== res.address.city) {
			dispatch(setCountry(res.address.city))
		}
		//dispatch(setAddress(res.display_name))
	}
	return null
}

export default MapEventsComponentNew
