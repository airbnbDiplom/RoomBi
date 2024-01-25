import Image from 'next/image'
import style from './Search.module.css'
import { Col, Row } from 'react-bootstrap'
const Search: React.FC = () => {
	return (
		<Row className={` ${style.main} text-end `}>
			<Col
				className={` 
					d-flex align-items-start justify-content-center p-0 `}
			>
				<button
					className={`p-0 ${style.resetButton} ${style.btnStyle} text-start`}
				>
					<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
						<p className={`${style.colorOne}  m-0`}>Куди</p>
						<input
							type='text'
							placeholder='Пошук напрямку'
							className={`${style.colorTwo} ${style.inputReset}  m-0`}
						/>
					</div>
				</button>
				<div className={`${style.action}`}>
					<p className='h5 mt-2'>Пошук напрямку</p>
					<Row>
						<Col>
							<div className={style.imgDiv}>
								<Image
									src={'/searchimg/4e762891-75a3-4fe1-b73a-cd7e673ba915.webp'}
									alt='Гнучкый пошук'
									width={122}
									height={122}
								/>
							</div>
							<p className={style.imageDis}>Гнучкый пошук</p>
						</Col>
						<Col>
							<div className={style.imgDiv}>
								<Image
									src={'/searchimg/66355b01-4695-4db9-b292-c149c46fb1ca.webp'}
									alt='Близький Схід'
									width={122}
									height={122}
								/>
							</div>
							<p className={style.imageDis}>Близький Схід</p>
						</Col>
						<Col>
							<div className={style.imgDiv}>
								<Image
									src={'/searchimg/7b8635b6-c877-4a2b-8fb9-84bdf81ae143.webp'}
									alt='Близький Схід'
									width={122}
									height={122}
								/>
							</div>
							<p className={style.imageDis}>Румунія</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className={style.imgDiv}>
								<Image
									src={'/searchimg/d77de9f5-5318-4571-88c7-e97d2355d20a.webp'}
									alt='Юго-Восточная Азия'
									width={122}
									height={122}
								/>
							</div>
							<p className={style.imageDis}>Юго-Восточная Азия</p>
						</Col>
						<Col>
							<div className={style.imgDiv}>
								<Image
									src={'/searchimg/a0fd6dfc-6bec-4abb-850e-9ab78ed7bf37.webp'}
									alt='Іспанія'
									width={122}
									height={122}
								/>
							</div>
							<p className={style.imageDis}>Іспанія</p>
						</Col>
						<Col>
							<div className={style.imgDiv}>
								<Image
									src={'/searchimg/4e762891-75a3-4fe1-b73a-cd7e673ba915.webp'}
									alt='США'
									width={122}
									height={122}
								/>
							</div>
							<p className={style.imageDis}>США</p>
						</Col>
					</Row>
				</div>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`}>
					<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
						<p className={`${style.colorOne}  m-0`}>Прибуття</p>
						<p className={`${style.colorTwo} m-0`}>Додайте дату</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`}>
					<div className={`mt-3 mb-3 ps-4 ${style.border}`}>
						<p className={`${style.colorOne} m-0`}>Виїзд</p>
						<p className={`${style.colorTwo}  m-0`}>Додайте дату</p>
					</div>
				</button>
			</Col>
			<Col className={`d-flex align-items-center justify-content-center p-0`}>
				<button className={`p-0 ${style.resetButton} text-start`}>
					<div className={`mt-3 mb-3 ps-4`}>
						<p className={`${style.colorOne}  m-0`}>Хто</p>
						<p className={`${style.colorTwo}  m-0`}>Додайте гостей</p>
					</div>
				</button>
			</Col>
			<Col
				xs={'auto'}
				sm={'auto'}
				md={'auto'}
				lg={'auto'}
				xl={'auto'}
				className={` ${style.cursor}  ${style.search} d-flex align-items-center justify-content-center m-1 p-0 '`}
			>
				<Image
					src={'/icon/search.svg'}
					width={20}
					height={20}
					alt='search icon'
				/>
			</Col>
			<div className={`${style.drop}${style.dNone} `}></div>
		</Row>
	)
}

export default Search
