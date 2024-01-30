'use client'
import { Dropdown } from 'react-bootstrap'
import Image from 'next/image'
import style from './AuthenticationBtn.module.css'

interface IAuthenticationBtn {}

const AuthenticationBtn: React.FC = () => {
	return (
		<Dropdown className='d-flex align-item-center'>
			<Dropdown.Toggle
				variant='none'
				id='dropdown-basic'
				style={{ border: 'none', paddingRight: '0', background: 'none' }}
				className={`custom-dropdown-toggle w-100 d-flex justify-content-end`}
			>
				<div className={`${style.btnWhite} m-0 `}>
					<Image
						priority
						src='./icon/burger.svg'
						width={22}
						height={22}
						alt='List icon'
					/>
					<Image
						priority
						src='./icon/person.svg'
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
