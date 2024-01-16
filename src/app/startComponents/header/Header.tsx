import { FC } from 'react'
import { Col, Row } from 'react-bootstrap'
import style from './Header.module.css'
const Header: FC = () => {
	return (
		<div className='ps-md-5 pe-md-5 ps-sm-3 pe-sm-3'>
			<Row xl={12} className='pt-5'>
				<Col className='text-center' sx={12} sm={2} md={2} lg={2} xl={2}>
					Logo
				</Col>
				<Col sx={12} sm={10} md={10} lg={10} xl={10}>
					<Row>
						<Col
							className={style.customText}
							sx={6}
							sm={6}
							md={8}
							lg={10}
							xl={10}
						>
							Сдать жилье на RumBi
						</Col>
						<Col
							className={(style.textCenter, style.customDisplayNone)}
							sx={1}
							sm={1}
							md={1}
							lg={1}
							xl={1}
						>
							<p className='w-100 text-center p-0 m-0'>P</p>
						</Col>
						<Col
							className={(style.customTextCenter, style.customDisplayNone)}
							sx={5}
							sm={5}
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
