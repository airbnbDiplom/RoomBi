'use client'

import { autoCompleteObj } from '@/app/type/type'
import style from '../../edit.module.css'
interface IAutoComplete {
	autoCompleteRes: autoCompleteObj[] | null
	handlerDispatch: (item: autoCompleteObj) => void
}

const AutoComplete: React.FC<IAutoComplete> = ({
	autoCompleteRes,
	handlerDispatch,
}) => {
	return (
		<>
			{autoCompleteRes && autoCompleteRes.length > 0 && (
				<div className={style.inputBlock_autoCompleteBlock}>
					{autoCompleteRes?.map(item => {
						return (
							<div
								key={item.osm_id}
								className={style.inputBlock_autoCompleteItem}
								onClick={() => handlerDispatch(item)}
							>
								{item.name}
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}

export default AutoComplete
