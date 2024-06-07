import type { Metadata } from 'next'
import '@/app/[locale]/globals.css'
import i18nConfig from '../../../../../i18nConfig'
import { Footer } from '@/app/startComponents/footer/Footer'

export const metadata: Metadata = {
	title: 'Edit apartment.',
	description: 'Edit master apartments',
}
export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default function EditApartLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{children}
			<Footer />
		</>
	)
}
