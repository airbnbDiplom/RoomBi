'use client'
import { Dropdown } from 'react-bootstrap'
import Image from 'next/image'
import style from './AuthenticationBtn.module.css'
import { ThemProps } from '@/app/type/type'

const AuthenticationBtn: React.FC<ThemProps> = ({ isTeamBlack }) => {
	return (
		<Dropdown className={`d-flex align-item-center ${style.btn}`}>
			<Dropdown.Toggle
				variant='none'
				id='dropdown-basic'
				style={{ border: 'none', paddingRight: '0', background: 'none' }}
				className={`custom-dropdown-toggle w-100 d-flex justify-content-end`}
			>
				<div
					className={`${style.btn} ${
						isTeamBlack ? style.btnBlack : style.btnWhite
					} m-0 `}
				>
					<Image
						priority
						src={isTeamBlack ? './icon/burgerW.svg' : './icon/burger.svg'}
						width={22}
						height={22}
						alt='List icon'
					/>
					<Image
						priority
						src={isTeamBlack ? './icon/personW.svg' : './icon/person.svg'}
						width={22}
						height={22}
						alt='person icon'
					/>
				</div>
			</Dropdown.Toggle>
			<Dropdown.Menu className={style.itemFont}>
				<Dropdown.Item href='#'>
					<strong>Зареєструватися</strong>
				</Dropdown.Item>
				<Dropdown.Item href='#'>Увійти</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item href='#'>
					Запропонувати помешкання на RoomBi
				</Dropdown.Item>
				<Dropdown.Item href='#'>Центр допомоги</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export { AuthenticationBtn }
