import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function SignOffButton({setLoggedIn}) {
  const { t } = useTranslation();
  const Logoff = () => {
    if(localStorage.getItem('userName') !== null) localStorage.removeItem("userName");
    if(localStorage.getItem('userEmail') !== null) localStorage.removeItem("userEmail");
    if(localStorage.getItem('userId') !== null) localStorage.removeItem("userId");
    setLoggedIn(false);
  }
  return (
    <Link to='/'>
      <button className='btn' onClick={Logoff}>
        {t("sign_off")}
      </button>
    </Link>
  );
}