'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { SearchBtnEnum } from '@/app/type/type'
import { AuthenticationBtn } from '@/app/ui/authenticationBtn/AuthenticationBtn'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import style from './Header.module.css'
import Search from './search/Search'
import SmallSearch from './smallSearch/SmallSearch'

const Header: FC = () => {
	const { t } = useTranslation()
	//переключение между видами поика
	const [isSmallSearchOn, setSmallSearchOn] = useState(false)
	const [isBigSearchOn, setBigSearchOn] = useState(true)
	const [isBigSearchOnBySmall, setBigSearchOnBySmall] = useState(false)
	// переключатель кнопок на большом поиске
	const [isTeamBlack, setTeamBlack] = useState(false)

	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	useEffect(() => {
		setTeamBlack(btnState === SearchBtnEnum.DisableAll ? false : true)
	}, [btnState])

	return (
		<Container
			fluid
			className={`pt-5 pb-3  ps-md-3 pe-md-3 ps-lg-3 pe-lg-3 sticky-top' ${
				style.header
			} ${isTeamBlack ? style.headerBlaCk : style.headerWhite} `}
		>
			<Row className={'d-flex align-items-center '} style={{ height: '75px' }}>
				<Col className={style.customTextCenter} md={2} lg={2} xl={2} xxl={3}>
					<Link
						href={'/'}
						className={`${isTeamBlack && style.logoBlack} ${style.logo}`}
					>
						RoomBi
					</Link>
				</Col>
				{isSmallSearchOn && (
					<Col className={` ${style.customDisplayNone} ${style.flexCenter}`}>
						<SmallSearch
							setSmallSearchOn={setSmallSearchOn}
							setBigSearchOn={setBigSearchOn}
							setBigSearchOnBySmall={setBigSearchOnBySmall}
						/>
					</Col>
				)}
				{isBigSearchOn && (
					<Col
						md={6}
						lg={7}
						xl={7}
						xxl={6}
						className={` ${
							isBigSearchOn ? style.Visibility : style.VisibilityNone
						} ${style.customDisplayNone} `}
					>
						<Search
							setTeamBlack={setTeamBlack}
							isTeamBlack={isTeamBlack}
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
				<Col md={4} lg={3} xl={3}>
					<Row>
						<Col className={`ms-md-3 ms-xs-1 p-0 ${style.customText}`}>
							<Link
								className={`${style.customText} ${style.link} ${
									isTeamBlack && style.colorW
								} `}
								href='/#'
							>
								{t('OfferApartment')}
								<strong> &nbsp;RoomBi</strong>
							</Link>
						</Col>
						<Col
							className={`${style.customTextCenter} ${style.customDisplayNone} d-flex justify-content-end`}
						>
							<AuthenticationBtn isTeamBlack={isTeamBlack} />
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}
export { Header }
