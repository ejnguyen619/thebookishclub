import React, { useState } from 'react';
import { BookMenuItems, AccountMenuItems } from './MenuItems';
import { Link } from 'react-router-dom';
import './Dropdown.css';
import { useTranslation } from 'react-i18next';

function Dropdown({tab, loggedIn}) {
  const { t } = useTranslation();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
        {(tab === 'books' ? BookMenuItems : AccountMenuItems).map((item,index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={loggedIn ? item.path : '/sign-in'} onClick={() => setClick(false)}>
                {t(item.title)}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default Dropdown;