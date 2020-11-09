import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function SignOffButton({setLoggedIn}) {
  const Logoff = () => setLoggedIn(false);
  return (
    <Link to='/'>
      <button className='btn' onClick={Logoff}>
        Sign Off
      </button>
    </Link>
  );
}