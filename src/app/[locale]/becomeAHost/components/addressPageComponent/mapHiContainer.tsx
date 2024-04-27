'use server'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'

const MapHiContainer = () => {
	const MapContainerNew = useMemo(
		() =>
			dynamic(
				() =>
					import(
						'@/app/[locale]/becomeAHost/components/addressPageComponent/mapContainerNew'
					).then(mod => mod.default),
				{
					// loading: () => <Loading />,
					ssr: false,
				}
			),
		[]
	)
	return <MapContainerNew />
}

export default MapHiContainer
