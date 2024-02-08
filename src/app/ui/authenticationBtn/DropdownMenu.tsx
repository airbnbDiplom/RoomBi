import { Dropdown } from 'react-bootstrap';
import style from './AuthenticationBtn.module.css';

type DropdownMenuProps = {
    children: React.ReactNode;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => (
  <Dropdown.Menu className={style.itemFont}>
    {children}
  </Dropdown.Menu>
);

export default DropdownMenu;