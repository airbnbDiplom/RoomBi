import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
interface modalProps {
	title: string
	show: boolean
	deleteItem: () => void
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalDialog: React.FC<modalProps> = ({
	title,
	show,
	setShowModal,
	deleteItem,
}) => {
	const deleteHandler = () => {
		deleteItem()
		setShowModal(false)
	}
	const handleClose = () => setShowModal(false)
	const { t } = useTranslation()
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Body>{`${t('modalDialogDelete_question')} ${title}?`}</Modal.Body>
			<Modal.Footer>
				<Button variant='dark' onClick={deleteHandler}>
					{t('modalDialogDelete_yes')}
				</Button>
				<Button variant='dark' onClick={handleClose}>
					{t('modalDialogDelete_no')}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalDialog
