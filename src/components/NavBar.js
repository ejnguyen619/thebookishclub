import React, { useState } from 'react';
import { SignInButton } from './SignInButton';
import { SignOffButton } from './SignOffButton';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Dropdown from './Dropdown';

function NavBar({loggedIn, setLoggedIn}) {
  const [click, setClick] = useState(false);
  const [bookdropdown, setBookDropdown] = useState(false);
  const [accountdropdown, setAccountDropdown] = useState(false);

  if(localStorage.getItem('userId') !== null) setLoggedIn(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const bookMouseEnter = () => 
    (window.innerWidth < 960 ? setBookDropdown(false) : setBookDropdown(true));
  const bookMouseLeave = () => 
    (window.innerWidth < 960 ? setBookDropdown(false) : setBookDropdown(false));

  const accountMouseEnter = () => 
    (window.innerWidth < 960 ? setAccountDropdown(false) : setAccountDropdown(true));
  const accountMouseLeave = () => 
    (window.innerWidth < 960 ? setAccountDropdown(false) : setAccountDropdown(false));

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo'>
            TheBookishClub
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> 
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'
            onMouseEnter={bookMouseEnter}
            onMouseLeave={bookMouseLeave}
          >
            <Link to='/books' className='nav-links' onClick={closeMobileMenu}>
              Books <i className='fas fa-caret-down' />
            </Link>
            {bookdropdown && <Dropdown tab='books' loggedIn={loggedIn}/>}
          </li>
          <li className='nav-item'
            onMouseEnter={accountMouseEnter}
            onMouseLeave={accountMouseLeave}
          >
            <Link to='/account' className='nav-links' onClick={closeMobileMenu}>
              Account <i className='fas fa-caret-down' />
            </Link>
            {accountdropdown && <Dropdown tab='account' loggedIn={loggedIn}/>}
          </li>
          <li className='nav-item'>
            <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li className='nav-item'>
            {!loggedIn && 
            <Link to='/sign-in' className='nav-links-mobile' 
              onClick={closeMobileMenu}>
              Sign In
            </Link>}
            {loggedIn && 
            <Link to='/' className='nav-links-mobile' 
            onClick={() => {closeMobileMenu();setLoggedIn(false);}}>
              Sign Off
            </Link>}
          </li>         
        </ul>
        {!loggedIn && <SignInButton />}
        {loggedIn && <SignOffButton setLoggedIn={setLoggedIn} />}
      </nav>
    </>
  );
}

export default NavBar;
