'use client'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import style from '../../addApart.module.css'
import MapEventsComponentNew from './mapEventsComponentNew'
import { useAppSelector } from '@/app/redux/hook'

interface mapProps {}
const MapContainerComponent: React.FC<mapProps> = () => {
	const location = useAppSelector(state => state.newApartmentReducer.location)

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
				<MapEventsComponentNew location={location} />
				<Marker position={location}>
					<Popup>You are here!</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}

export default MapContainerComponent
