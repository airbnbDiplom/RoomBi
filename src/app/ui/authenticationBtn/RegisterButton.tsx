import { Button } from 'react-bootstrap';
import { useState } from 'react';

const RegisterButton: React.FC = () => {
  const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
  return (
    <Button 
    variant="link" 
    onClick={handleShow} 
    style={{ textDecoration: 'none', color: 'inherit', paddingLeft: '0' }}
  >
    Зареєструватися
  </Button>
  );
};

export default RegisterButton;