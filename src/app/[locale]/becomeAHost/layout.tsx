import { Footer } from '@/app/startComponents/footer/Footer'
import React from 'react'

export default function BecomeAHostLayout({
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
