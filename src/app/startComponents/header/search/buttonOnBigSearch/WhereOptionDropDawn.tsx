import {
	AutoCompleteItem,
	AutoCompleteList,
	SearchBtnEnum,
} from '@/app/type/type'
import style from '../Search.module.css'
import React, { MouseEventHandler } from 'react'
import { useAppDispatch } from '@/app/redux/hook'
import { setWhereObj } from '@/app/redux/searchInHeader/SearchSlice'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'

interface WhereOptionDropDawnProps {
	setWhereOptionBlack: React.Dispatch<React.SetStateAction<boolean>>
	autoList: AutoCompleteList
	setStringInput: React.Dispatch<React.SetStateAction<string>>
}

const WhereOptionDropDawn: React.FC<WhereOptionDropDawnProps> = ({
	setWhereOptionBlack,
	autoList,
	setStringInput,
}) => {
	const dispatch = useAppDispatch()

	const setItemToStore = (
		item: AutoCompleteItem
	): React.MouseEventHandler<HTMLDivElement> | undefined => {
		dispatch(setWhereObj(item))
		setStringInput(item.properties.display_name)
		setWhereOptionBlack(false)
		dispatch(setBtnState(SearchBtnEnum.WhenCome))
		return
	}

	return (
		<div className={`${style.whereOptionDropDawnBlok}`}>
			{autoList.features !== undefined &&
				autoList.features.map(item => (
					<div
						onClick={() => {
							setItemToStore(item)
						}}
						className={`${style.whereOptionDropDawnBlokItem}`}
						key={item.properties.place_id}
					>
						{item.properties.display_name}
					</div>
				))}
		</div>
	)
}

export default WhereOptionDropDawn
