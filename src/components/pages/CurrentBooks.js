import React, { useState, useEffect } from 'react';
// import { Redirect, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import './CurrentBooks.css';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import {Helmet} from "react-helmet";
import { useTranslation } from 'react-i18next';

export default function CurrentBooks() {
  const { t } = useTranslation();
  const [currentBooks, setCurrentBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [book, Setbook] = useState(false);

  // function getCurrentPage() {
  //   console.log(pageNumber);
  // }

  var bookInfo = {};

  useEffect(() => {
    const fetchData = async () => {
      // const params = new URLSearchParams(window.location.search);
      // const page = parseInt(params.get('page')) || 1;
      // // setPageNumber(parseInt(params.get('page')));
      // setPageNumber(page);
        await fetch(`/api/books/findAllBooks?page=${pageNumber}`)
          .then(res => {
            if (res.status >= 400) {
              throw new Error("Server responds with error!")
            }
            return res.json()
          })
          .then(bookInfo => {
            setCurrentBooks(bookInfo);
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
  }, [pageNumber]);

  function handleEntry(id) {
    var index = currentBooks.findIndex((element) => element.id === id);
    bookInfo = currentBooks[index];
    console.log(bookInfo);
    localStorage.setItem('bookInfo', JSON.stringify(bookInfo));
    localStorage.setItem('prevLink', window.location.pathname);
    // localStorage.setItem('pageNumber', page);
    Setbook(true);
  }
  const changeCurrentPage = numPage => {
    setPageNumber(numPage);
    // console.log(pageNumber);
  };

  if (err) {
    return <div className='search-results'><h1>{err.message}</h1></div>
  }
  else if (!isLoaded) {
    return <div className='search-results'><h1>Loading...</h1></div>
  }
  else if (book) {
    return <Redirect to="/booking" />
  }
  else {
    return (
      <>
        <div className='current-books'>
        <Helmet>
                <meta name="description" content="Over 10,000 books
                                                  Popular, Academic and Work Books" />
                <title>Current books</title>
        </Helmet>
          <h1 >{t("current_msg")}</h1>
        </div>
        <div className="grid">
        {
          currentBooks.map(book => (
            <Card border="dark" style={{ width: '18rem' }} key={book.id} className="box">
              <Card.Img variant="top" src={book.image_url} />
              <Card.Body>
                <Card.Title><strong>Title: </strong>{book.original_title}</Card.Title>
                <Card.Text>
                  <strong>Authors:</strong> {book.authors}
                  <br />
                  <strong>Publication Year:</strong> {book.original_publication_year}
                </Card.Text>
              </Card.Body>
              <Button className="viewButton" onClick={() => handleEntry(book.id)}>View</Button>
            </Card>
          ))
        }
        </div>
          <div>
            <Pagination
              totalSize={10000}
              currentPage={pageNumber}
              // totalPages={100}
              changeCurrentPage={changeCurrentPage}
              sizePerPage={24}
              showFirstLastPages="true"
              numberOfPagesNextToActivePage={10}
              // theme="dark"
            />
            <br />
          </div>
          
      </>
    );
    }
}
