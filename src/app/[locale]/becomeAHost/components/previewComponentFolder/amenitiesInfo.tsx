import { useAppSelector } from '@/app/redux/hook'
import Image from 'next/image'
import React from 'react'
import style from './previewComponent.module.css'
import { useTranslation } from 'react-i18next'

const AmenitiesInfo = () => {
	const allAmenities = useAppSelector(
		state => state.newApartmentReducer.offeredAmenities
	)
	const { t } = useTranslation()
	let amenitiesWithTrueValue: string[] = []

	Object.keys(allAmenities).forEach(key => {
		if (allAmenities[key] === true) {
			amenitiesWithTrueValue.push(key)
		}
	})

	return (
		<div>
			{amenitiesWithTrueValue && amenitiesWithTrueValue.length > 0 ? (
				amenitiesWithTrueValue.map((item, index) => {
					return (
						<div key={index} className={style.amenitiesItem}>
							<p className={style.amenitiesTitle}>{t(item)}</p>
							<Image
								src={`/userInfo/${item}.svg`}
								alt={item}
								width={35}
								height={35}
							/>
						</div>
					)
				})
			) : (
				<div className={style.amenitiesItem}>
					<p className={style.amenitiesTitle}>tv</p>
					<Image src={`/userInfo/tv.svg`} alt={'tv'} width={35} height={35} />
				</div>
			)}
		</div>
	)
}

export default AmenitiesInfo
