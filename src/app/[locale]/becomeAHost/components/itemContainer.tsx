'use client'
import React from 'react'
import style from '../addApart.module.css'
import { filterData } from '@/app/startComponents/naw/dataFilter/data'
import TypeItem from './typeItem'
import AddActivePropsHoc, { InjectProps } from './addActivePropsHoc'

const ItemContainer: React.FC<InjectProps> = ({
	activeItemId,
	setActiveItemId,
}) => {
	return (
		<div className={style.itemBlock}>
			{filterData
				.filter(item => item.type === 'house')
				.sort((a, b) => {
					if (a.id === 20 || a.id === 3) return -1
					if (b.id === 20 || b.id === 3) return 1
					return 0
				})
				.map(item => (
					<TypeItem
						item={item}
						key={item.id}
						activeItemId={activeItemId}
						setActiveItemId={setActiveItemId}
					/>
				))}
		</div>
	)
}

export default AddActivePropsHoc(ItemContainer)
