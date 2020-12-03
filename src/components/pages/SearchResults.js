import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import './SearchResults.css';

export default function SearchResults({match}) {
    const name = (match.params.bookName !== undefined) ? match.params.bookName : match.params.authorName;
    const [bookResult, setBookResult] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [err, setErr] = useState(null);
    const [book, Setbook] = useState(false);
    var bookInfo = {};

    useEffect(() => {
      const fetchData = async () => {
          await fetch(geturl())
            .then(res => {
              if (res.status >= 400) {
                throw new Error("Server responds with error!")
              }
              return res.json()
            })
            .then(bookInfo => {
              setBookResult(bookInfo);
              setIsLoaded(true);
              console.log(bookInfo);
            },
            err => {
              setErr(err);
              setIsLoaded(true);
            })
      };
      fetchData();
      // eslint-disable-next-line
    }, [name]);

    function geturl() {
      if(match.params.bookName !== undefined) return `/api/books/findBooksByTitle?title=${name}`;
      return `/api/books/findBooksByAuthor?authors=${name}`;
    };

    function handleEntry(id) {
      var index = bookResult.findIndex((element) => element.id === id);
      bookInfo = bookResult[index];
      console.log(bookInfo);
      localStorage.setItem('bookInfo', JSON.stringify(bookInfo));
      localStorage.setItem('prevLink', window.location.pathname);
      Setbook(true);
    }

    if (err) {
      return <div className='search-results'><h1>{err.message}</h1></div>
    } else if (!isLoaded) {
      return <div className='search-results'><h1>Loading...</h1></div>
    } else if (book) {
      return <Redirect to="/booking" />
    } else {
        return (
          <>
          <div className="searchContentsDiv">
            <h2>Total Search Results: {bookResult.length}</h2>
            <table>
              <tbody>
              {
                bookResult.map(book => (
                  <tr key={book.id} onClick={() => handleEntry(book.id)}>
                    <td>
                      {book.title}
                    </td>  
                  </tr>
                ))
              }
              </tbody>
            </table>
            {/* <div className="row">
                <div className="result-box">
                  <ul className="grid_list">
                  {
                    bookResult.map(book => (
                      <li key={book.id} onClick={() => handleEntry(book.id)}>
                        {book.title}
                      </li>
                    ))
                  }
                  </ul>
                </div>
            </div> */}
          </div>
          </>
        );
    }
}