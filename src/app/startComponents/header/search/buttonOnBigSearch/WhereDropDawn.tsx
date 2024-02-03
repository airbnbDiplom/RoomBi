import { Col, Row } from 'react-bootstrap'
import Image from 'next/image'
import style from '../Search.module.css'

const WhereDropDawn = ({ isWhereDropOn }: { isWhereDropOn?: boolean }) => {
	return (
		<div
			className={
				isWhereDropOn ? `${style.actionWhereDropDawnOn}` : `${style.dNone}`
			}
		>
			<p className={`h5 mt-2 text-center fw-bold `}>Пошук напрямку</p>
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
	)
}

export default WhereDropDawn
