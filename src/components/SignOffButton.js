import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function SignOffButton({setLoggedIn}) {
  const Logoff = () => {
    if(localStorage.getItem('userName') !== null) localStorage.removeItem("userName");
    if(localStorage.getItem('userEmail') !== null) localStorage.removeItem("userEmail");
    if(localStorage.getItem('userId') !== null) localStorage.removeItem("userId");
    setLoggedIn(false);
  }
  return (
    <Link to='/'>
      <button className='btn' onClick={Logoff}>
        Sign Off
      </button>
    </Link>
  );
}