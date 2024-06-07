'use client'
import React from 'react'
import style from '../edit.module.css'
import TitleInput from './textComponent/titleInput'
import Description from './textComponent/description'

const TextApartment = () => {
	return (
		<div className={style.textBlock}>
			<div className={style.titleInputBlack}>
				<TitleInput />
			</div>
			<div className={style.descriptionBlock}>
				<Description />
			</div>
		</div>
	)
}

export default TextApartment
