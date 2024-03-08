'use client'
import React from 'react'
import 'leaflet/dist/leaflet.css'
import style from '../searchResult.module.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useAppSelector } from '@/app/redux/hook'
import { LatLngBounds } from 'leaflet'

const MapForSearch = () => {
	const centerCor = useAppSelector(state => [
		parseFloat(state.searchReducer.DataSearchObj.whereObj?.lat),
		parseFloat(state.searchReducer.DataSearchObj.whereObj?.lon),
	])
	const bbox = useAppSelector(state =>
		state.searchReducer.DataSearchObj?.whereObj?.boundingbox?.map(value =>
			parseFloat(value)
		)
	)

	const bounds = new LatLngBounds(
		[bbox !== undefined ? bbox[1] : 26, bbox !== undefined ? bbox[0] : -15],
		[bbox !== undefined ? bbox[3] : 76, bbox !== undefined ? bbox[2] : 35]
	)

	return (
		<div className={style.mapContainer}>
			<MapContainer
				bounds={bounds}
				scrollWheelZoom={true}
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
