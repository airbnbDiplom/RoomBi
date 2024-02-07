import { Col, Row } from 'react-bootstrap'
import Image from 'next/image'
import style from '../Search.module.css'
import { SearchDataState } from '@/app/type/type'

interface WhereDropDawnProps {
	setWhenDrop: (setWhenDrop: boolean) => void
	setWhereDrop: (setWhereDrop: boolean) => void
	stringInput: string
	setStringInput: React.Dispatch<React.SetStateAction<string>>
	isWhereDropOn?: boolean
	setSearchData: React.Dispatch<React.SetStateAction<SearchDataState>>
}

const WhereDropDawn = ({
	setWhenDrop,
	setWhereDrop,
	stringInput,
	setStringInput,
	isWhereDropOn,
	setSearchData,
}: WhereDropDawnProps) => {
	const closeDropDawnImg = (e: any) => {
		e.currentTarget.classList.add(`${style.dropDawnImgClickAnimation}`)

		setTimeout(() => {
			setWhereDrop(false)
			setWhenDrop(true)
		}, 200)
	}
	return (
		<div
			className={`
				${isWhereDropOn ? `${style.actionWhereDropDawnOn}` : `${style.dNone}`}
				 ${stringInput.length !== 0 && `${style.dNone}`}
				`}
		>
			<p className={`h5 mt-2 text-center fw-bold `}>Пошук напрямку</p>
			<Row>
				<Col>
					<button
						className={`${style.imgDiv} p-0`}
						value={`Гнучкый пошук`}
						onClick={e => {
							setStringInput(e.currentTarget.value)
						}}
					>
						<Image
							src={'/searchimg/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg'}
							alt='world map'
							width={122}
							height={122}
						/>
					</button>
					<p className={style.imageDis}>Гнучкый пошук</p>
				</Col>
				<Col>
					<button
						className={`${style.imgDiv} p-0`}
						value={`Близький Схід`}
						onClick={e => {
							setSearchData(privData => ({
								...privData,
								whereObj: {
									continent: `Близький Схід`,
									country: '',
									city: '',
									district: '',
									street: '',
								},
							}))
							setStringInput(e.currentTarget.value)
							closeDropDawnImg(e)
						}}
					>
						<Image
							src={'/searchimg/66355b01-4695-4db9-b292-c149c46fb1ca.webp'}
							alt='Близький Схід'
							width={122}
							height={122}
						/>
					</button>
					<p className={style.imageDis}>Близький Схід</p>
				</Col>
				<Col>
					<button
						className={`${style.imgDiv} p-0`}
						value={`Румунія`}
						onClick={e => {
							setSearchData(privData => ({
								...privData,
								whereObj: {
									continent: '',
									country: 'Румунія',
									city: '',
									district: '',
									street: '',
								},
							}))
							setStringInput(e.currentTarget.value)
							closeDropDawnImg(e)
						}}
					>
						<Image
							src={'/searchimg/7b8635b6-c877-4a2b-8fb9-84bdf81ae143.webp'}
							alt='Румунія'
							width={122}
							height={122}
						/>
					</button>
					<p className={style.imageDis}>Румунія</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<button
						className={`${style.imgDiv} p-0`}
						value={`Юго-Восточная Азия`}
						onClick={e => {
							setSearchData(privData => ({
								...privData,
								whereObj: {
									continent: 'Юго-Восточная Азия',
									country: '',
									city: '',
									district: '',
									street: '',
								},
							}))
							setStringInput(e.currentTarget.value)
							closeDropDawnImg(e)
						}}
					>
						<Image
							src={'/searchimg/d77de9f5-5318-4571-88c7-e97d2355d20a.webp'}
							alt='Юго-Восточная Азия'
							width={122}
							height={122}
						/>
					</button>
					<p className={style.imageDis}>Юго-Восточная Азия</p>
				</Col>
				<Col>
					<button
						className={`${style.imgDiv} p-0`}
						value={`Іспанія`}
						onClick={e => {
							setSearchData(privData => ({
								...privData,
								whereObj: {
									continent: '',
									country: 'Іспанія',
									city: '',
									district: '',
									street: '',
								},
							}))
							setStringInput(e.currentTarget.value)
							closeDropDawnImg(e)
						}}
					>
						<Image
							src={'/searchimg/a0fd6dfc-6bec-4abb-850e-9ab78ed7bf37.webp'}
							alt='Іспанія'
							width={122}
							height={122}
						/>
					</button>
					<p className={style.imageDis}>Іспанія</p>
				</Col>
				<Col>
					<button
						className={`${style.imgDiv} p-0`}
						value={`США`}
						onClick={e => {
							setSearchData(privData => ({
								...privData,
								whereObj: {
									continent: '',
									country: 'США',
									city: '',
									district: '',
									street: '',
								},
							}))
							setStringInput(e.currentTarget.value)
							closeDropDawnImg(e)
						}}
					>
						<Image
							src={'/searchimg/4e762891-75a3-4fe1-b73a-cd7e673ba915.webp'}
							alt='США'
							width={122}
							height={122}
						/>
					</button>
					<p className={style.imageDis}>США</p>
				</Col>
			</Row>
		</div>
	)
}

export default WhereDropDawn
