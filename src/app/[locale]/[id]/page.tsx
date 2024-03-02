import { getApartamentId } from '@/app/services/housesServices'
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import initTranslations from '../../i18n'
import { Header } from '@/app/startComponents/header/Header'
import { Footer } from '../../startComponents/footer/Footer'
import Loading from './../loading'
import { UserInfo } from './components/user-info/UserInfo'
type Props = {
	params: {
		id: string
		locale: string
	}
}
const i18nNamespaces = ['translation']
export default async function Hous({ params: { id, locale } }: Props) {
	const { resources } = await initTranslations(locale, ['translation'])

	const hous = await getApartamentId(id)

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<>
				<div className='header-main'>
					<Header />
				</div>
				{hous ? (
					<main>
						<UserInfo data={hous} />
					</main>
				) : (
					<Loading />
				)}
				<Footer />
			</>
		</TranslationsProvider>
	)
}
