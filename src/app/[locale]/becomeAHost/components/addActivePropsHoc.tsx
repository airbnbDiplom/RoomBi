import React, { ComponentType, useState } from 'react'

export interface InjectProps {
	activeItemId: number | null
	setActiveItemId: (id: number | null) => void
}

const AddActivePropsHoc = <P extends InjectProps>(
	WrappedComponent: ComponentType<P>
) => {
	const WithValidationHOC: React.FC<Omit<P, keyof InjectProps>> = props => {
		const [activeItemId, setActiveItemId] = useState(null)
		return (
			<WrappedComponent
				{...(props as P)}
				activeItemId={activeItemId}
				setActiveItemId={setActiveItemId}
			/>
		)
	}

	return WithValidationHOC
}
export default AddActivePropsHoc
