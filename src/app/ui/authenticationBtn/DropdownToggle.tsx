import { Dropdown } from 'react-bootstrap';
import Image from 'next/image';
import style from './AuthenticationBtn.module.css';

const DropdownToggle: React.FC = () => (
  <Dropdown.Toggle
    variant='none'
    id='dropdown-basic'
    style={{ border: 'none', paddingRight: '0', background: 'none' }}
    className={`custom-dropdown-toggle w-100 d-flex justify-content-end`}
  >
    <div className={`${style.btnWhite} m-0 `}>
      <Image
        priority
        src='./icon/burger.svg'
        width={22}
        height={22}
        alt='List icon'
      />
      <Image
        priority
        src='./icon/person.svg'
        width={22}
        height={22}
        alt='person icon'
      />
    </div>
  </Dropdown.Toggle>
);

export default DropdownToggle;