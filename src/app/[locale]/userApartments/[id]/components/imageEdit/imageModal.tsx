'use client'
import Image from 'next/image'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import style from '../../edit.module.css'
import DeletePictureBtn from './deletePictureBtn'
interface IimageModal {
	show: boolean
	setShow: React.Dispatch<React.SetStateAction<boolean>>
	pictureUrl: string
	index: number
	localResource: boolean
}

const ImageModal: React.FC<IimageModal> = ({
	show,
	setShow,
	pictureUrl,
	index,
	localResource,
}) => {
	const handleClose = () => setShow(false)
	const { t } = useTranslation()

	return (
		<Modal show={show} onHide={handleClose} size='lg'>
			<Modal.Header closeButton>
				<Modal.Title>{t('userApartmentsEdit_modalImage')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={style.imageModal}>
					<Image src={pictureUrl} width={500} height={500} alt='img' />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<DeletePictureBtn
					index={index}
					setShow={setShow}
					localResource={localResource}
				/>
			</Modal.Footer>
		</Modal>
	)
}

export default ImageModal
