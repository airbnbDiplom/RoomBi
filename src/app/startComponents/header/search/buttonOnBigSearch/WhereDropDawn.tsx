import { Col, Row } from 'react-bootstrap'
import style from '../Search.module.css'
import { AutoCompleteList, SearchBtnEnum } from '@/app/type/type'
import { useAppDispatch } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import BtnWhereTile from './btn/btnWhere'
import { setWhereObj } from '@/app/redux/searchInHeader/SearchSlice'
import autoCompleteService from '@/app/services/autoCompleteService'
import { btnDataArray, btnDataI } from './btn/btnWhereData'

const WhereDropDawn = ({
	setStringInput,
}: {
	setStringInput: React.Dispatch<React.SetStateAction<string>>
}) => {
	const dispatch = useAppDispatch()

	const clickImgEvent = (e: any, value?: string) => {
		e.currentTarget.classList.add(`${style.dropDawnImgClickAnimation}`)
		const str = e.currentTarget.value

		setTimeout(() => {
			setStringInput(str)

			dispatch(setBtnState(SearchBtnEnum.WhenCome))
			if (value !== '' && value !== undefined && value !== `Гнучкый пошук`) {
				autoCompleteService(value).then((data: AutoCompleteList | null) => {
					if (data) {
						dispatch(setWhereObj(data.features[0]))
					} else {
						console.log('Where handleInputChange No data fetched.')
					}
				})
			}
		}, 250)
	}
	const chunkArray = (array: btnDataI[], chunkSize: number): btnDataI[][] => {
		const results: btnDataI[][] = []
		while (array.length) {
			results.push(array.splice(0, chunkSize))
		}
		return results
	}

	const rows = chunkArray([...btnDataArray], 3)
	return (
		<div className={`${style.actionWhereDropDawnOn}`}>
			<p className={`h5 mt-2 text-center fw-bold `}>Пошук напрямку</p>
			{rows.map((row, rowIndex) => (
				<Row key={rowIndex}>
					{row.map((item, itemIndex) => (
						<Col key={itemIndex}>
							<BtnWhereTile
								value={item.value}
								imgSrc={item.imgSrc}
								onClick={clickImgEvent}
							/>
						</Col>
					))}
				</Row>
			))}
		</div>
	)
}

export default WhereDropDawn
