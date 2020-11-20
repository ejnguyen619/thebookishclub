import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

export default function Account() {
    return (
      <>
        <div className='account'>
          <Link to='/profile'>
            <button className='btnmain'>
              Profile
            </button>
          </Link>
        </div>
        <div className='account'>
          <Link to='/membership'>
            <button className='btnmain'>
              Membership
            </button>
          </Link>
        </div>
      </>
    );
}
