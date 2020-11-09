import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function SignInButton() {
  return (
    <Link to='/sign-in'>
      <button className='btn'>
        Sign In
      </button>
    </Link>
  );
}