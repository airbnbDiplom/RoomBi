'use client'
import React from 'react'
import 'leaflet/dist/leaflet.css'
import style from '../searchResult.module.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useAppSelector } from '@/app/redux/hook'

const MapForSearch = () => {
	const centerCor = useAppSelector(
		state => state.searchReducer.DataSearchObj.whereObj.geometry.coordinates
	)
	return (
		<div className={style.mapContainer}>
			<MapContainer
				center={[centerCor[1], centerCor[0]]}
				zoom={6}
				scrollWheelZoom={false}
				style={{ width: '100%', height: '100%' }}
			>
				<TileLayer
					attribution={`<p class="tileLayer" >RoomBi Map</p>`}
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{/* <Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker> */}
			</MapContainer>
		</div>
	)
}

export default MapForSearch
