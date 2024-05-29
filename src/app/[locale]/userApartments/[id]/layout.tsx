import type { Metadata } from 'next'
import { Inknut_Antiqua, Nunito } from 'next/font/google'
import { SessionProviderBi } from '@/app/configs/SessionProviderBi'
import { Providers } from '@/app/redux/provider'
import '@/app/[locale]/globals.css'
import i18nConfig from '../../../../../i18nConfig'
import { dir } from 'i18next'
import { Footer } from '@/app/startComponents/footer/Footer'

export const metadata: Metadata = {
	title: 'Edit apartment.',
	description: 'Edit master apartments',
}
export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

interface RootLayoutProps {
	children: React.ReactNode
	params: {
		locale: string
	}
}

export default function EditApartLayout({
	children,
	params: { locale },
}: RootLayoutProps) {
	return (
		<html lang={locale} dir={dir(locale)}>
			<body>
				<SessionProviderBi>
					<Providers>{children}</Providers>
				</SessionProviderBi>{' '}
			</body>
			<Footer />
		</html>
	)
}
