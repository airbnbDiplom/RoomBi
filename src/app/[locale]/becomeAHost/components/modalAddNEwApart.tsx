import { useRouter } from 'next/navigation'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import style from '../addApart.module.css'
import { useAppDispatch } from '@/app/redux/hook'
import { resetState } from '@/app/redux/addNewApartmentState/addNewApartmentSlice'

interface props {
	tittle: string
	message: string
	setModalSuccess: React.Dispatch<React.SetStateAction<number>>
	show: boolean
	setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAddNEwApart: React.FC<props> = ({
	tittle,
	message,
	setModalSuccess,
	show,
	setShow,
}) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const router = useRouter()
	const handleClose = () => {
		setModalSuccess(0)
		setShow(false)
		if (tittle === 'preview_success') {
			dispatch(resetState())
			router.push('/')
			router.refresh()
		}
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{t(tittle)}</Modal.Title>
			</Modal.Header>

			<Modal.Body>{t(message)}</Modal.Body>

			<Modal.Footer>
				<button className={style.styleBtn} onClick={handleClose}>
					{t('close')}
				</button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalAddNEwApart
