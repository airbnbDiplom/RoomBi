import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Col, Row } from 'react-bootstrap'
import planet from '../../../../public/icon/planet.svg'
import style from './Header.module.css'
const Header: FC = () => {
	return (
		<div className='pt-5'>
			<Row xl={12} className='d-flex align-items-center'>
				<Col
					className={style.customTextCenter}
					sx={12}
					sm={2}
					md={2}
					lg={2}
					xl={2}
				>
					RoomBi
				</Col>
				<Col sx={12} sm={10} md={10} lg={9} xl={10}>
					<Row>
						<Col
							className={style.customText}
							sx={8}
							sm={8}
							md={8}
							lg={10}
							xl={10}
						>
							<Link className={(style.customText, style.link)} href='/#'>
								Запропонувати помешкання на <strong>RoomBi</strong>
							</Link>
						</Col>
						<Col
							className={(style.textCenter, style.customDisplayNone)}
							sx={'auto'}
							sm={'auto'}
							md={'auto'}
							lg={'auto'}
							xl={'auto'}
						>
							<Image
								priority
								src={planet}
								alt='langviges'
								height={12}
								width={12}
							/>
						</Col>
						<Col
							className={(style.customTextCenter, style.customDisplayNone)}
							sx={3}
							sm={3}
							md={3}
							lg={1}
							xl={1}
						>
							AutButton
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className='pt-5 pb-5 '>
				<Col xs={12} className='text-center'>
					Search
				</Col>
			</Row>
		</div>
	)
}
export { Header }
