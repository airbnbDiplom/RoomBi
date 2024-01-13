import Link from 'next/link'
import style from './page.module.css'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1>AIRBNB</h1>
			<Link href='/posts' className={style.font2}>
				Posts
			</Link>
		</main>
	)
}
