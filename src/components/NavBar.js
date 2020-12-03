import React, { useState } from 'react';
import { SignInButton } from './SignInButton';
import { SignOffButton } from './SignOffButton';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Dropdown from './Dropdown';
import { useTranslation } from 'react-i18next';

function NavBar({loggedIn, setLoggedIn}) {
  const { t } = useTranslation();
  const [click, setClick] = useState(false);
  const [bookdropdown, setBookDropdown] = useState(false);
  const [accountdropdown, setAccountDropdown] = useState(false);

  if(localStorage.getItem('userId') !== null) setLoggedIn(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const topLevel = (e) => e.preventDefault(); 

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
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TheBookishClub
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> 
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              {t("home")}
            </Link>
          </li>
          <li className='nav-item'
            onMouseEnter={bookMouseEnter}
            onMouseLeave={bookMouseLeave}
          >
            <Link to='/books' className='nav-links' onClick={topLevel}>
            {t("books")} <i className='fas fa-caret-down' />
            </Link>
            {bookdropdown && <Dropdown tab='books' loggedIn={loggedIn}/>}
          </li>
          <li className='nav-item'
            onMouseEnter={accountMouseEnter}
            onMouseLeave={accountMouseLeave}
          >
            <Link to='/account' className='nav-links' onClick={topLevel}>
            {t("account")} <i className='fas fa-caret-down' />
            </Link>
            {accountdropdown && <Dropdown tab='account' loggedIn={loggedIn}/>}
          </li>
          <li className='nav-item'>
            <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>
            {t("contact_us")}
            </Link>
          </li>
          <li className='nav-item'>
            {!loggedIn && 
            <Link to='/sign-in' className='nav-links-mobile' 
              onClick={closeMobileMenu}>
              {t("sign_in")}
            </Link>}
            {loggedIn && 
            <Link to='/' className='nav-links-mobile' 
            onClick={() => {closeMobileMenu();localStorage.removeItem("userName");localStorage.removeItem("userEmail");localStorage.removeItem("userId");setLoggedIn(false);}}>
              {t("sign_off")}
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
