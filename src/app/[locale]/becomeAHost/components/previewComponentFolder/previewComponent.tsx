'use client'
import React from 'react'
import style from './previewComponent.module.css'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/redux/hook'
import SliderComponent from './sliderComponent'
import UserInfo from './userInfo'
import AmenitiesInfo from './amenitiesInfo'
import ApartmentStaff from './apartmentStaff'

const PreviewComponent = () => {
	const { t } = useTranslation()
	const apartmentState = useAppSelector(state => state.newApartmentReducer)

	return (
		<div className={style.allContainer}>
			<div className={style.topContainer}>
				<div className={style.pictureSide}>
					<div className={style.sliderContainer}>
						<SliderComponent obj={apartmentState} />

						<div className={style.apartmentInfo}>
							<div className={style.apartTitle}>
								{apartmentState.title ? apartmentState.title : 'title'}
							</div>
							<div className={style.apartInfoSmall}>
								<span>
									{' '}
									{apartmentState.house
										? t('locale') === 'uk'
											? apartmentState.house.nameUa
											: apartmentState.house.nameEn
										: 'houseType'}
								</span>
								<span>
									{' '}
									{apartmentState.typeApartment
										? t(apartmentState.typeApartment.title)
										: 'partOfApartment'}
								</span>
								<span className={style.priseSpan}>
									$
									{apartmentState.typeApartment
										? apartmentState.pricePerNight
										: 'prise'}
								</span>
							</div>
							<div className={style.addressContainer}>
								<span>
									{apartmentState.country ? apartmentState.country : 'country'}
									&nbsp;
								</span>
								<span>
									{apartmentState.city ? apartmentState.city : 'city'}
									&nbsp;
								</span>
								<span>
									{apartmentState.address ? apartmentState.address : 'address'}
									&nbsp;
								</span>
								<span>
									{apartmentState.houseNum
										? apartmentState.houseNum
										: 'houseNum'}
									&nbsp;
								</span>
								<span>
									{apartmentState.apartNum && apartmentState.apartNum}
								</span>
							</div>
						</div>
					</div>
					<ApartmentStaff />
				</div>
				<div className={style.rightSide}>
					<UserInfo />
					<AmenitiesInfo />
				</div>
			</div>
			<div className={style.middleContainer}>
				<div>{apartmentState.description}</div>
			</div>
		</div>
	)
}

export default PreviewComponent
