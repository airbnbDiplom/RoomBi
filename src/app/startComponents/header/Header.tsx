'use client'

import { AuthenticationBtn } from '@/app/ui/authenticationBtn/AuthenticationBtn'
import { ShowMapBtn } from '@/app/ui/showMap/showMapBtn'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
//import planet from '../../../../public/icon/planet.svg'
import style from './Header.module.css'
import SmallSearch from './smallSearch/SmallSearch'
import Search from './search/Search'
const Header: FC = () => {
	const lickStyle = `${style.customText} ${style.link}`
	const [scroll, setScroll] = useState(0)

	//проверка scroll для замены поля поиска
	const handlerScroll = () => {
		setScroll(window.scrollY)
	}
	window.addEventListener('scroll', handlerScroll)
	return (
		<Container fluid className='pt-5 position-sticky'>
			<Row className='d-flex align-items-center'>
				<Col
					className={style.customTextCenter}
					// sm={2}
					md={2}
					lg={4}
					xl={3}
				>
					<Link href={'/'} className={style.logo}>
						RoomBi
					</Link>
				</Col>
				<Col
					className={`${scroll ? style.Visibility : style.VisibilityNone} ${
						style.customDisplayNone
					} ${style.flexCenter}`}
				>
					<SmallSearch />
				</Col>
				<Col
					className={` ${scroll ? style.VisibilityNone : style.Visibility} ${
						style.customDisplayNone
					} `}
				>
					<Search />
				</Col>
				<Col
					//sx={12} sm={10}
					md={4}
					lg={4}
					xl={3}
				>
					<Row className='d-flex align-items-center justify-content-end'>
						<Col
							className={`ms-3 ${style.customText}`}
							// sx={8}
							// sm={8}
							// md={8}
							// lg={10}
							//xl={4}
						>
							<Link
								className={`${style.customText} ${style.link}
							${scroll ? style.VisibilityNone : style.Visibility}`}
								href='/#'
							>
								Запропонувати помешкання на <strong>RoomBi</strong>
							</Link>
						</Col>
						{/* <Col
							className={style.planet}
							// sx={'auto'}
							// sm={'auto'}
							// md={'auto'}
							// lg={'auto'}
							// xl={'auto'}
						>
							<Image
								priority
								src={planet}
								alt='languages'
								height={12}
								width={12}
							/>
						</Col> */}
						<Col
							className={`${style.customTextCenter} ${style.customDisplayNone} `}
							// sx={3}
							// sm={3}
							// md={3}
							// lg={1}
							// xl={1}
						>
							<AuthenticationBtn />
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}
export { Header }
