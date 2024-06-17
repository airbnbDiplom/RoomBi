'use client'
import { useAppSelector } from '@/app/redux/hook'
import style from '../../edit.module.css'
import AddAmenities from './addAmenities'
import AmenitiesList from './amenitiesList'
import { NewApartmentOfferedAmenities } from '@/app/type/type'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
const AmenitiesBlock = () => {
	const amenitiesList: NewApartmentOfferedAmenities = useAppSelector(
		state => state.updateApartmentSlice.offeredAmenities
	)
	const { t } = useTranslation()
	return (
		<div>
			<Form.Label>{t('userApartmentEdit_amenitiesTitle')}</Form.Label>
			<div className={style.amenitiesBlock}>
				<AmenitiesList
					booleanProps={Object.keys(amenitiesList).filter(key => {
						if (
							key !== 'id' &&
							key !== 'description' &&
							key !== 'specialFeatures'
						)
							return amenitiesList[key]
					})}
				/>
				<AddAmenities
					booleanProps={Object.keys(amenitiesList).filter(key => {
						if (
							key !== 'id' &&
							key !== 'description' &&
							key !== 'specialFeatures'
						)
							return !amenitiesList[key]
					})}
				/>
			</div>
		</div>
	)
}

export default AmenitiesBlock
