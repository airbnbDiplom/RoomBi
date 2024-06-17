'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setCoordinateEdit } from '@/app/redux/updateApartment/updateApartmentSlice'
import L, { LatLng } from 'leaflet'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMapEvents } from 'react-leaflet'

interface ImapEvent {
	location: [number, number] | undefined
	icon: L.Icon<L.IconOptions>
}

const MapEvent: React.FC<ImapEvent> = ({ location, icon }) => {
	const stateObj = useAppSelector(state => state.updateApartmentSlice)
	const dispatch = useAppDispatch()
	const [markerPosition, setMarkerPosition] = useState<L.Marker<any> | null>(
		null
	)

	const removeMarker = () => {
		if (markerPosition !== null) map.removeLayer(markerPosition)
	}
	const [clickedPosition, setClickedPosition] = useState<LatLng | null>(null)

	const map = useMapEvents({
		locationfound(e) {
			if (location) {
				map.flyTo(location, map.getZoom())
			}
		},
		click(e) {
			removeMarker()
			setClickedPosition(e.latlng)
			const newMarker = L.marker(e.latlng).addTo(map).setIcon(icon)
			setMarkerPosition(newMarker)
			map.flyTo(e.latlng, map.getZoom())
			dispatch(
				setCoordinateEdit({
					lat: e.latlng.lat.toString(),
					lon: e.latlng.lng.toString(),
				})
			)
			console.log('stateObj', stateObj)
		},
	})

	useEffect(() => {
		map.locate()
	}, [map, location])
	return null
}

export default MapEvent
