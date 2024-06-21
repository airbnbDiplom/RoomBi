import Footer from './components/footer'
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
