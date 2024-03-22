'use client'
import React from 'react'
import 'leaflet/dist/leaflet.css'
import style from '../searchResult.module.css'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import { useAppSelector } from '@/app/redux/hook'
import { DivIcon, LatLngBounds } from 'leaflet'
import { CardBiProps } from '@/app/type/type'
import { CardMap } from '@/app/components/map-main/card-map/CardMap'

interface MarkerItem {
	geocode: [number, number]
	apartment: CardBiProps
	customIcon: DivIcon
}

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
	const markerArray: MarkerItem[] = []

	const searchFilterData = useAppSelector(
		state => state.searchFilterReducer.collection
	)
	if (searchFilterData !== null)
		searchFilterData.map(item => {
			const markerItem: MarkerItem = {
				geocode: [parseFloat(item.ingMap), parseFloat(item.latMap)],
				apartment: item,
				customIcon: new DivIcon({
					className: 'custom-marker',
					html: `<div class="custom-marker-content"><p class="custom-marker-txt">$${item.pricePerNight}</p></div>`,
				}),
			}
			markerArray.push(markerItem)
		})
	const bounds = new LatLngBounds(
		[bbox !== undefined ? bbox[0] : 26, bbox !== undefined ? bbox[2] : -15],
		[bbox !== undefined ? bbox[1] : 76, bbox !== undefined ? bbox[3] : 35]
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
				{markerArray.map((marker, index) => (
					<Marker
						key={index}
						position={marker.geocode}
						icon={marker.customIcon}
					>
						<Popup>
							<CardMap {...marker.apartment} />
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	)
}

export default MapForSearch
