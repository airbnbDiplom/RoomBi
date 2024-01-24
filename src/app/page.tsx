import { Header } from './startComponents/header/Header'
import { Main } from './startComponents/main/Main'
import { Naw } from './startComponents/naw/Naw'

export default function Home() {
	return (
		<>
			<div className='headerBackground sticky-top '>
				<Header />
				<Naw />
			</div>
			<main>
				<Main />
			</main>
		</>
	)
}
