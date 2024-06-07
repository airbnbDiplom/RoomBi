import React from 'react'
import style from '../edit.module.css'
import Link from 'next/link'
import SaveBtn from './saveBtn'
import { RentalApartmentDTO } from '@/app/type/type'

const HeaderForEdit = () => {
	return (
		<header className={style.myHeader}>
			<Link href={'/'} className={style.logo}>
				RoomBi
			</Link>
			<SaveBtn />
		</header>
	)
}

export default HeaderForEdit
