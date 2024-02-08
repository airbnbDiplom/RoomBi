import { Button } from 'react-bootstrap';
import Image from 'next/image';

const GoogleButton: React.FC = () => {
  return (
    <Button 
      variant="outline-dark" 
      style={{ 
        justifyContent: 'center', 
        width: '100%', 
        marginTop: '10px', 
        marginBottom: '10px'
      }}
      className="google-button"
    >
      <Image
        priority
        src='./icon/google.svg'
        width={18}
        height={18}
        alt='google icon'
      />
      Продовжити через Google
    </Button>
  );
};

export default GoogleButton;