import { getAddressByLatLng } from '@/app/services/autoCompleteService'
import { LatLng, LatLngBounds, latLng } from 'leaflet'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMapEvents } from 'react-leaflet'
interface MapEventsProps {
	location: {
		lat: number
		lng: number
	}
}

const MapEventsComponentNew: React.FC<MapEventsProps> = ({ location }) => {
	const [clickedPosition, setClickedPosition] = useState<LatLng | null>(null)
	const { t } = useTranslation()
	const map = useMapEvents({
		locationfound(e) {
			if (location) map.flyTo(location, map.getZoom())
		},
		click(e) {
			setClickedPosition(e.latlng)
		},
	})

	useEffect(() => {
		map.locate()
	}, [map, location])
	useEffect(() => {
		console.log(
			'clickedPosition?.lat.toFixed(3)',
			clickedPosition?.lat.toFixed(3)
		)
		console.log(
			'clickedPosition?.lng.toFixed(3)',
			clickedPosition?.lng.toFixed(3)
		)
		if (clickedPosition?.lat && clickedPosition?.lng) {
			getAddressByLatLng(
				clickedPosition?.lat.toFixed(3).toString(),
				clickedPosition?.lng.toFixed(3).toString(),
				t('locale')
			).then(res => console.log(res))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clickedPosition])
	return null
}

export default MapEventsComponentNew
