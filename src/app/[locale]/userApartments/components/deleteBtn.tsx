import React from 'react'
import { useTranslation } from 'react-i18next'
import style from '../userApartments.module.css'
interface DeleteBtnProps {
	showModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteBtn: React.FC<DeleteBtnProps> = ({ showModal }) => {
	const { t } = useTranslation()

	return (
		<button className={style.deleteBtn} onClick={() => showModal(true)}>
			{t('delete')}
		</button>
	)
}

export default DeleteBtn
