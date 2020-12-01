import React from 'react';
import '../../App.css';
import Book from './Book';
import './Home.css';
import {Helmet} from "react-helmet";

export default function Home() {
    return (
      <>
        <div class="homepagediv">
        <Helmet>
                <meta name="description" content="Borrow a book online
				                                          Pick up and drop service avaiable
				                                          Book Recommendation system
				                                          Interesting Book suggestions"/>
                <title>Home</title>
        </Helmet>
        <h1 className='home'>Welcome to TheBookishClub. Not sure what to read? Explore some of the best sellers.</h1>
        <br />
          
        </div>
        <div class="recommenderdiv">
          <Book />
        </div>
        
      </>
    );
}
