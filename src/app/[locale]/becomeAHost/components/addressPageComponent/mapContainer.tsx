'use client'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import style from '../../addApart.module.css'

const MapContainerComponent = () => {
	const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 })
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				})
			})
		} else {
			alert('Geolocation is not supported by this browser.')
		}
	}, [])
	return (
		<div className={style.mapContainerNew}>
			<MapContainer
				center={location}
				zoom={9}
				scrollWheelZoom={true}
				style={{ width: '100%', height: '100%' }}
			>
				<TileLayer
					attribution={`<p class="tileLayer" >RoomBi Map</p>`}
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>

				<Marker position={location}>
					<Popup>You are here!</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}

export default MapContainerComponent
