'use client'

import { AuthenticationBtn } from '@/app/ui/authenticationBtn/AuthenticationBtn'

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
//import planet from '../../../../public/icon/planet.svg'
import style from './Header.module.css'
import SmallSearch from './smallSearch/SmallSearch'
import Search from './search/Search'
import { tree } from 'next/dist/build/templates/app-page'
const Header: FC = () => {
	//переключение между видами поика
	const [isSmallSearchOn, setSmallSearchOn] = useState(false)
	const [isBigSearchOn, setBigSearchOn] = useState(true)
	const [isBigSearchOnBySmall, setBigSearchOnBySmall] = useState(false)
	// переключатель кнопок на большом поиске
	const [isWhereDropOn, setWhereDrop] = useState(false)
	const [isWhenDropOn, setWhenDrop] = useState(false)
	const [isWhoDropOn, setWhoDrop] = useState(false)
	const [scrollTransfer, setScrollTransfer] = useState(Number)

	return (
		<Container fluid className={`pt-5 pb-3 position-sticky ${style.header}`}>
			<Row className={'d-flex align-items-center '} style={{ height: '75px' }}>
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
				{isSmallSearchOn && (
					<Col className={` ${style.customDisplayNone} ${style.flexCenter}`}>
						<SmallSearch
							setScrollTransfer={setScrollTransfer}
							propsBigSearch={{
								isWhereDropOn,
								isWhenDropOn,
								isWhoDropOn,
								setWhereDrop,
								setWhenDrop,
								setWhoDrop,
							}}
							propsKindSwitch={{
								isSmallSearchOn,
								isBigSearchOn,
								isBigSearchOnBySmall,
								setSmallSearchOn,
								setBigSearchOn: setBigSearchOn,
								setBigSearchOnBySmall,
							}}
						/>
					</Col>
				)}
				{isBigSearchOn && (
					<Col
						className={` ${
							isBigSearchOn ? style.Visibility : style.VisibilityNone
						} ${style.customDisplayNone} `}
					>
						<Search
							scrollTransfer={scrollTransfer}
							propsBigSearch={{
								isWhereDropOn,
								isWhenDropOn,
								isWhoDropOn,
								setWhereDrop,
								setWhenDrop,
								setWhoDrop,
							}}
							propsKindSwitch={{
								isSmallSearchOn,
								isBigSearchOn,
								isBigSearchOnBySmall,
								setSmallSearchOn,
								setBigSearchOn: setBigSearchOn,
								setBigSearchOnBySmall,
							}}
						/>
					</Col>
				)}
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
							<Link className={`${style.customText} ${style.link}`} href='/#'>
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
