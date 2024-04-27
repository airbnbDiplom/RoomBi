'use client'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
interface modalProps {
	show: boolean
	setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const InfoModal: React.FC<modalProps> = ({ show, setShow }) => {
	const handleClose = () => setShow(false)
	const { t } = useTranslation()
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{t('Attention!')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{t('addNewApInfo')}</Modal.Body>
			<Modal.Footer>
				<Button variant='dark' onClick={handleClose}>
					{t('IGet')}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default InfoModal
