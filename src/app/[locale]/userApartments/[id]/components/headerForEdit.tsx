import React from 'react'
import style from '../edit.module.css'
import Link from 'next/link'
import SaveBtn from './saveBtn'
import { RentalApartmentDTO } from '@/app/type/type'
interface Props {
	apartmentId: string
}

const HeaderForEdit: React.FC<Props> = ({ apartmentId }) => {
	return (
		<header className={style.myHeader}>
			<Link href={'/'} className={style.logo}>
				RoomBi
			</Link>
			<SaveBtn apartmentId={apartmentId} />
		</header>
	)
}

export default HeaderForEdit
