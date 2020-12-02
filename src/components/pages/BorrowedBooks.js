import React from 'react';
import '../../App.css';
import {Helmet} from "react-helmet";


export default function BorrowedBooks() {
    return (
      <>
         <Helmet>
                <meta name="description" content="Over 10,000 books
                                                  Popular, Academic and Work Books
                                                  can be borrowed"/>
                <title>Borrowed books</title>
         </Helmet>
        <h1 className='borrowedBooksDiv'>Your List of Borrowed Books:</h1>
      </>
    );
}
