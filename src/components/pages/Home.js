import React from 'react';
import '../../App.css';
import Book from './Book';
import './Home.css';

export default function Home() {
    return (
      <>
        <div class="homepagediv">
        <h1 className='home'>THE BOOKISH CLUB</h1>
        <br />
          
        </div>
        <div class="recommenderdiv">
          <Book />
        </div>
        
      </>
    );
}
