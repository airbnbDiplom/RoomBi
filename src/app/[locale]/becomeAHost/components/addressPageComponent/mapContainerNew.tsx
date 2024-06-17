'use client'
import React, { useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import style from '../../addApart.module.css'
import MapEventsComponentNew from './mapEventsComponentNew'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import 'leaflet/dist/leaflet.css'
import { setCoordinate } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'

interface mapProps {}
const MapContainerNew: React.FC<mapProps> = () => {
	const lat = useAppSelector(state => state.newApartmentReducer.latMap)
	const ing = useAppSelector(state => state.newApartmentReducer.ingMap)
	const location: [number, number] | undefined =
		lat && ing ? [parseFloat(ing), parseFloat(lat)] : undefined
	const dispatch = useAppDispatch()
	useEffect(() => {
		if ('geolocation' in navigator) {
			// Get user's current position
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords
					dispatch(
						setCoordinate({
							lat: latitude.toString(),
							lon: longitude.toString(),
						})
					)
				},
				error => {
					console.error("Error getting user's location:", error)
					// Handle error
				}
			)
		} else {
			console.error('Geolocation is not supported by this browser.')
			// Handle unsupported browser
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className={style.mapContainerNew}>
			<MapContainer
				center={location ? location : [51.505, -0.09]}
				zoom={12}
				scrollWheelZoom={true}
				style={{ width: '100%', height: '100%' }}
			>
				<TileLayer
					attribution={`<p class="tileLayer" >RoomBi Map</p>`}
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				<MapEventsComponentNew location={location} />
			</MapContainer>
		</div>
	)
}

export default MapContainerNew
