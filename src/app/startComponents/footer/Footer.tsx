'use client'
import Link from 'next/link'
import React from 'react'
import style from './Footer.module.css'
import { SocialNetwork } from './socialNetwork/SocialNetwork'
import { FooterButton } from './footerButton/FooterButton'
import { LanguageChanger } from '@/app/ui/languageChanger/LanguageChanger'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
const Footer: React.FC = () => {
	const { t } = useTranslation()
	return (
		<footer
			className={
				style.container +
				' border-top border-dark ms-lg-5 me-lg-5 ms-sm-3 me-sm-3 ms-sx-3 me-sx-3'
			}
		>
			<div className={style.left}>
				<span>© 2024 RoomBi</span>
				<span className={style.point}></span>
				<Link className={style.link} href='#'>
					{t('footerConditions')}
				</Link>
				<span className={style.point}></span>
				<Link className={style.link} href='#'>
					{t('footerDetails')}
				</Link>
				<span className={style.point}></span>
				<Link className={style.link} href='#'>
					{t('footerSupport')}
				</Link>
			</div>

			<div className={style.right}>
				<Link
					rel='stylesheet'
					href='https://t.me/RoomBi_bot'
					className={style.btnBot}
				>
					<Image
						src={`/telegram.svg`}
						width={26}
						height={26}
						alt='telegram'
						style={{ width: '20px', height: '20px' }}
					/>
					Telegram Bot
				</Link>
				<LanguageChanger />
				<SocialNetwork href='#' src='/footer/inst.svg' />
				<SocialNetwork href='#' src='/footer/fb.png' />
				<SocialNetwork
					href='https://github.com/airbnbDiplom'
					src='/footer/git.png'
				/>
				<SocialNetwork href='#' src='/footer/link.png' />
			</div>
		</footer>
	)
}

export { Footer }
