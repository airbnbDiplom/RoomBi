import LinkBtn from '@/app/ui/emptyBtn/linkBtn'
import React from 'react'
import style from '../addApart.module.css'
import BtnValidationDataComponent from './btnValidationDataComponent'

const Footer = () => {
	const pageNameCollection: string[] = [
		'/becomeAHost',
		'/houseType',
		'/apartmentParts',
		'/addressOfHome',
		'/gestCount',
		'/amenities',
	]
	return (
		<div className={style.footer}>
			<div className={style.firstBtn}>
				<LinkBtn
					pathArr={pageNameCollection}
					btnDirection={false}
					BgColor={'#211e1a'}
					textColor={'white'}
				/>
			</div>
			<div className={style.secondBtn}>
				<BtnValidationDataComponent pathArr={pageNameCollection} />
			</div>
		</div>
	)
}

export default Footer
