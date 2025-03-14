import { Link } from 'react-router';
import { useState } from 'react';
import Hamburger from 'hamburger-react';
import Ropes from '../pages/Ropes';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <div>
      <nav className='navbar'>
        <div className='nav-left'>
          <Link to='/' className='logo'>
            <img
              src='https://www.orlandotreetrek.com/wp-content/uploads/2019/11/orlando-tree-trek-logo.png'
              alt='OTTAP logo'
            />
          </Link>
        </div>
        <div className='nav-right'>
          <div className='hamburger-menu'>
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
          </div>
          <ul className={`nav-items ${isOpen ? 'active' : ''}`}>
            <li>
              <Link to='/account' onClick={handleLinkClick}>
                Account
              </Link>
            </li>{' '}
            <li>
              <Link to='/harnesses' onClick={handleLinkClick}>
                Harnesses
              </Link>
            </li>
            <li>
              <Link to='/wood' onClick={handleLinkClick}>
                Wood
              </Link>
            </li>
            <li>
              <Link to='/courses' onClick={handleLinkClick}>
                Courses
              </Link>
            </li>
            <li>
              <Link to='/hardware' onClick={handleLinkClick}>
                Hardware
              </Link>
            </li>
            <li>
              <Link to='/ropes' onClick={handleLinkClick}>
                Ropes
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
