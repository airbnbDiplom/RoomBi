import style from '../Search.module.css'
import Image from 'next/image'
import { SearchDataState, ThemProps, WhoState } from '@/app/type/type'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useEffect } from 'react'

interface WhoStateProps {
	whoArr: WhoState
	setSearchData: React.Dispatch<React.SetStateAction<SearchDataState>>
	isWhoDropOn?: boolean
}

const WhoDropDawn: React.FC<WhoStateProps> = ({
	whoArr,
	setSearchData,
	isWhoDropOn,
}) => {
	useEffect(() => {
		if (whoArr.gestsCount === 0) {
			setSearchData(prevState => ({
				...prevState,
				whoObj: {
					...prevState.whoObj,
					childrenCount: 0,
					babyCount: 0,
					animalsCount: 0,
				},
			}))
		}
	}, [whoArr.gestsCount])
	return (
		<div className={isWhoDropOn ? style.actionWhoDropDawnOn : style.dNone}>
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
									if (whoArr.gestsCount > 0)
										setSearchData(prevState => ({
											...prevState,
											whoObj: {
												...prevState.whoObj,
												gestsCount: prevState.whoObj.gestsCount - 1,
											},
										}))
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
							<span className='text-center fs-6'>{whoArr.gestsCount}</span>
						</Col>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									setSearchData(prevState => ({
										...prevState,
										whoObj: {
											...prevState.whoObj,
											gestsCount: prevState.whoObj.gestsCount + 1,
										},
									}))
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
									if (whoArr.childrenCount > 0)
										setSearchData(prevState => ({
											...prevState,
											whoObj: {
												...prevState.whoObj,
												childrenCount: prevState.whoObj.childrenCount - 1,
												gestsCount:
													prevState.whoObj.gestsCount === 1 &&
													prevState.whoObj.childrenCount === 1
														? prevState.whoObj.gestsCount - 1
														: prevState.whoObj.gestsCount,
											},
										}))
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
							<span className='text-center fs-6'>{whoArr.childrenCount}</span>
						</Col>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									setSearchData(prevState => ({
										...prevState,
										whoObj: {
											...prevState.whoObj,
											childrenCount: prevState.whoObj.childrenCount + 1,
											gestsCount:
												prevState.whoObj.gestsCount === 0
													? prevState.whoObj.gestsCount + 1
													: prevState.whoObj.gestsCount,
										},
									}))
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
									if (whoArr.babyCount > 0)
										setSearchData(prevState => ({
											...prevState,
											whoObj: {
												...prevState.whoObj,
												babyCount: prevState.whoObj.babyCount - 1,
												gestsCount:
													prevState.whoObj.gestsCount === 1 &&
													prevState.whoObj.babyCount === 1
														? prevState.whoObj.gestsCount - 1
														: prevState.whoObj.gestsCount,
											},
										}))
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
							<span className='text-center fs-6'>{whoArr.babyCount}</span>
						</Col>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									setSearchData(prevState => ({
										...prevState,
										whoObj: {
											...prevState.whoObj,
											babyCount: prevState.whoObj.babyCount + 1,
											gestsCount:
												prevState.whoObj.gestsCount === 0
													? prevState.whoObj.gestsCount + 1
													: prevState.whoObj.gestsCount,
										},
									}))
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
									if (whoArr.animalsCount > 0)
										// setWho(prevState => ({
										// 	...prevState,
										// 	animalsCount: prevState.animalsCount - 1,
										// 	gestsCount:
										// 		prevState.gestsCount === 1 &&
										// 		prevState.animalsCount === 1
										// 			? prevState.gestsCount - 1
										// 			: prevState.gestsCount,
										// }))
										setSearchData(prevState => ({
											...prevState,
											whoObj: {
												...prevState.whoObj,
												animalsCount: prevState.whoObj.animalsCount - 1,
												gestsCount:
													prevState.whoObj.gestsCount === 1 &&
													prevState.whoObj.animalsCount === 1
														? prevState.whoObj.gestsCount - 1
														: prevState.whoObj.gestsCount,
											},
										}))
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
							<span className='text-center fs-6'>{whoArr.animalsCount}</span>
						</Col>
						<Col sm={4}>
							<button
								className={`${style.resetButton} ${style.counterBtn}`}
								onClick={() => {
									// setWho(prevState => ({
									// 	...prevState,
									// 	animalsCount: prevState.animalsCount + 1,
									// 	gestsCount:
									// 		prevState.gestsCount === 0
									// 			? prevState.gestsCount + 1
									// 			: prevState.gestsCount,
									// }))
									setSearchData(prevState => ({
										...prevState,
										whoObj: {
											...prevState.whoObj,
											animalsCount: prevState.whoObj.animalsCount + 1,
											gestsCount:
												prevState.whoObj.gestsCount === 0
													? prevState.whoObj.gestsCount + 1
													: prevState.whoObj.gestsCount,
										},
									}))
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
