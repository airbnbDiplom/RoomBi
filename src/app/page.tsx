import { getAllHouses } from './services/housesServices'
import { Header } from './startComponents/header/Header'
import { Main } from './startComponents/main/Main'
import { Naw } from './startComponents/naw/Naw'

// export const dynamic = "force-dynamic";

export default async function Home() {
	const cardData = await getAllHouses()
	return (
		<>
			<div className='sticky-top header-Main' id='header'>
				<Header />
				<Naw />
			</div>
			<main>
				<Main cardData={cardData} />
			</main>
		</>
	)
}
