import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

export default function Books() {
    return (
      <>
        <div className='books'>
          <Link to='/search-books'>
            <button className='btnmain'>
              Search Books
            </button>
          </Link>
        </div>
        <div className='books'>
          <Link to='/current-books'>
            <button className='btnmain'>
              Current Books
            </button>
          </Link>
        </div>
        <div className='books'>
          <Link to='/favorite-books'>
            <button className='btnmain'>
              Favorite Books
            </button>
          </Link>
        </div>
      </>
    );
}
