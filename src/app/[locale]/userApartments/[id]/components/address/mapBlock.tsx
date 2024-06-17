'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import style from '@/app/[locale]/becomeAHost/addApart.module.css'
import 'leaflet/dist/leaflet.css'
import MapEventsComponentNew from '@/app/[locale]/becomeAHost/components/addressPageComponent/mapEventsComponentNew'
import MapEvent from './mapEvent'
import L, { LatLngExpression } from 'leaflet'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
const MapBlock = () => {
	const lat = useAppSelector(state => state.updateApartmentSlice.latMap)
	const ing = useAppSelector(state => state.updateApartmentSlice.ingMap)
	const { t } = useTranslation()

	const location: [number, number] | undefined =
		lat && ing ? [parseFloat(ing), parseFloat(lat)] : undefined
	const dispatch = useAppDispatch()
	const customIcon = L.icon({
		iconUrl: '/icon/pointOnMap.svg',
		iconSize: [32, 32],
	})
	return (
		<>
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
					<Marker
						position={location !== undefined ? location : [0, 0]}
						icon={customIcon}
					/>
					<MapEvent location={location} icon={customIcon} />
				</MapContainer>
				<div style={{ margin: '15px' }}></div>
			</div>
			<Form.Text>{t('userApartmentsEdit_MapSubHeader')}</Form.Text>
		</>
	)
}

export default MapBlock
