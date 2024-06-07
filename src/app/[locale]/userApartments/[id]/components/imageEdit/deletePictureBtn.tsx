'use client'
import { useTranslation } from 'react-i18next'
import style from '../../../userApartments.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import {
	setFileArray,
	setFileNameArray,
	setPictureArray,
} from '@/app/redux/updateApartment/updateApartmentSlice'
interface IDeletePictureBtn {
	index: number
	setShow: React.Dispatch<React.SetStateAction<boolean>>
	localResource: boolean
}

const DeletePictureBtn: React.FC<IDeletePictureBtn> = ({
	index,
	setShow,
	localResource,
}) => {
	const { t } = useTranslation()
	const pictureArray = useAppSelector(
		state => state.updateApartmentSlice.pictures
	)
	const pictureFileFromLocale = useAppSelector(
		state => state.updateApartmentSlice.pictureFile
	)
	const pictureNameFromLocale = useAppSelector(
		state => state.updateApartmentSlice.picturesName
	)
	const dispatch = useAppDispatch()
	const deleteHandler = () => {
		if (!localResource)
			dispatch(setPictureArray(pictureArray.filter((_, i) => i !== index)))
		else if (localResource) {
			dispatch(
				setFileArray(pictureFileFromLocale.filter((_, i) => i !== index))
			)
			dispatch(
				setFileNameArray(pictureNameFromLocale.filter((_, i) => i !== index))
			)
		}
		setShow(false)
	}

	return (
		<button className={style.deleteBtn} onClick={deleteHandler}>
			{t('userApartmentsEdit_modalDeleteImage')}
		</button>
	)
}

export default DeletePictureBtn
