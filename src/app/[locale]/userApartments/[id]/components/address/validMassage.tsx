'use client'

import { Form } from 'react-bootstrap'

interface IValidMassage {
	errorMessage: string
}
const ValidMassage: React.FC<IValidMassage> = ({ errorMessage }) => {
	return <Form.Text style={{ color: 'red' }}>{errorMessage}</Form.Text>
}

export default ValidMassage
