import style from '../Search.module.css'
import Image from 'next/image'
import { SearchDataState, ThemProps, WhoState } from '@/app/type/type'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import {
	setWhoObjAnimalsCount,
	setWhoObjBabyCount,
	setWhoObjChildrenCount,
	setWhoObjGestCount,
} from '@/app/redux/searchInHeader/SearchSlice'

const WhoDropDawn: React.FC = () => {
	const why = useAppSelector(state => state.searchReducer.DataSearchObj.whoObj)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (why.gestsCount === 0) {
			dispatch(setWhoObjChildrenCount(0))
			dispatch(setWhoObjBabyCount(0))
			dispatch(setWhoObjAnimalsCount(0))
		}
	}, [dispatch, why])

	return (
		<div className={style.actionWhoDropDawnOn}>
			<Row className='d-flex align-items-center border-bottom pb-3 '>
				<Col sm={6}>
					<h2 className='h6 mb-1'>Дорослі</h2>
					<p className='m-0'>Від 13 років</p>
				</Col>
				<Col sm={6} className='d-flex align-items-center justify-content-end'>
					<Row>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									if (why.gestsCount > 0)
										dispatch(setWhoObjGestCount(why.gestsCount - 1))
								}}
							>
								<span>
									<Image
										src={`/icon/minus.svg`}
										alt='minus'
										width={12}
										height={12}
									/>
								</span>
							</button>
						</Col>
						<Col sm={2}>
							<span className='text-center fs-6'>{why.gestsCount}</span>
						</Col>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									dispatch(setWhoObjGestCount(why.gestsCount + 1))
								}}
							>
								<span>
									<Image
										src={`/icon/plus.svg`}
										alt='minus'
										width={12}
										height={12}
									/>
								</span>
							</button>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className='d-flex align-items-center border-bottom pb-3 pt-3 '>
				<Col sm={6}>
					<h2 className='h6 mb-1'>Діти</h2>
					<p className='m-0'>2-12 років</p>
				</Col>
				<Col sm={6} className='d-flex align-items-center justify-content-end'>
					<Row>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									if (why.childrenCount > 0)
										dispatch(setWhoObjChildrenCount(why.childrenCount - 1))
								}}
							>
								<span>
									<Image
										src={`/icon/minus.svg`}
										alt='minus'
										width={12}
										height={12}
									/>
								</span>
							</button>
						</Col>
						<Col sm={2}>
							<span className='text-center fs-6'>{why.childrenCount}</span>
						</Col>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									dispatch(setWhoObjChildrenCount(why.childrenCount + 1))
									if (why.gestsCount === 0) dispatch(setWhoObjGestCount(1))
								}}
							>
								<span>
									<Image
										src={`/icon/plus.svg`}
										alt='minus'
										width={12}
										height={12}
									/>
								</span>
							</button>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className='d-flex align-items-center border-bottom pb-3 pt-3 '>
				<Col sm={6}>
					<h2 className='h6 mb-1'>Немовлята</h2>
					<p className='m-0'>Молодше 2</p>
				</Col>
				<Col sm={6} className='d-flex align-items-center justify-content-end'>
					<Row>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									if (why.babyCount > 0)
										dispatch(setWhoObjBabyCount(why.babyCount - 1))
								}}
							>
								<span>
									<Image
										src={`/icon/minus.svg`}
										alt='minus'
										width={12}
										height={12}
									/>
								</span>
							</button>
						</Col>
						<Col sm={2}>
							<span className='text-center fs-6'>{why.babyCount}</span>
						</Col>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									dispatch(setWhoObjBabyCount(why.babyCount + 1))
									if (why.gestsCount === 0) dispatch(setWhoObjGestCount(1))
								}}
							>
								<span>
									<Image
										src={`/icon/plus.svg`}
										alt='minus'
										width={12}
										height={12}
									/>
								</span>
							</button>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className='d-flex align-items-center   pt-3 '>
				<Col sm={6}>
					<h2 className='h6 mb-1'>Домашні тварини</h2>
					{/* TODO: додати модальное окно тварини-помічника с пояснениям 
					взять с AIRBNB */}
					<p className='m-0'>
						<Link className='link-Reset' href={'#'}>
							Подорожуєте із твариною-помічником?
						</Link>
					</p>
				</Col>
				<Col sm={6} className='d-flex align-items-center justify-content-end'>
					<Row>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									if (why.animalsCount > 0)
										dispatch(setWhoObjAnimalsCount(why.animalsCount - 1))
								}}
							>
								<span>
									<Image
										src={`/icon/minus.svg`}
										alt='minus'
										width={12}
										height={12}
									/>
								</span>
							</button>
						</Col>
						<Col sm={2}>
							<span className='text-center fs-6'>{why.animalsCount}</span>
						</Col>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									dispatch(setWhoObjAnimalsCount(why.animalsCount + 1))
									if (why.gestsCount === 0) dispatch(setWhoObjGestCount(1))
								}}
							>
								<span>
									<Image
										src={`/icon/plus.svg`}
										alt='minus'
										width={12}
										height={12}
									/>
								</span>
							</button>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}

export default WhoDropDawn
