'use client'
interface Props {
	booleanProps: string[]
}

import style from '../../edit.module.css'
import AmenitiesItem from './amenitiesItem'
const AmenitiesList: React.FC<Props> = ({ booleanProps }) => {
	return (
		<div className={style.listContainer}>
			{booleanProps.map(prop => (
				<div key={prop} className={style.amenitiesItemContainer}>
					<AmenitiesItem value={prop} />
				</div>
			))}
		</div>
	)
}
export default AmenitiesList
