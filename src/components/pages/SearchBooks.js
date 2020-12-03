import React, { useState } from 'react';
import '../../App.css';
import './SearchBooks.css';
import { Redirect } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { useTranslation } from 'react-i18next';


export default function SearchBooks() {

  const { t } = useTranslation();
  const [bookName, setbookName] = useState("");
  const [authorName, setauthorName] = useState("");
  const [result, setResult] = useState(false);

  function openSearchName() {
    document.getElementById("myOverlayName").style.display = "block";
  }
  
  // Close the full screen search box
  function closeSearchName() {
    document.getElementById("myOverlayName").style.display = "none";
  }

  function openSearchAuthor() {
    document.getElementById("myOverlayAuthor").style.display = "block";
  }
  
  // Close the full screen search box
  function closeSearchAuthor() {
    document.getElementById("myOverlayAuthor").style.display = "none";
  }

  const submitHandlerName = e => {
    e.preventDefault();
    console.log(bookName);
    setResult(true);
  }

  const submitHandlerAuthor = e => {
    e.preventDefault();
    console.log(authorName);
    setResult(true);
  }

  if(result && bookName !== "") return <Redirect to={`/search/name/${bookName}`} />
  if(result && authorName !== "") return <Redirect to={`/search/author/${authorName}`} />

    return (
      <>
      <div className="backgroundSearchBooks">
        <div className="backgroundSearchDiv">
          <h1 className='search-books'>{t("online_library")}</h1>
          <div className='searchdiv'>
          <Helmet>
              <meta name="description" content="Over 10,000 books
                                                Popular, Academic and Work Books" />
              <title>Browse a book</title>
          </Helmet>
          <button className="openBtn" onClick={openSearchName}>Search By Name</button>
          </div>
          <div id="myOverlayName" className="overlay">
          <span className="closebtn" onClick={closeSearchName} title="Close Overlay">x</span>
          <div className="overlay-content">
          <input type="text" placeholder="Search.." name="search" onChange={e => setbookName(e.target.value)} value={bookName}/>
          <button type="submit" onClick={submitHandlerName}><i className="fa fa-search"></i></button>
          </div>

          </div>
          <div className='searchdiv'>
          <button className="openBtn" onClick={openSearchAuthor}>Search By Author</button>
          </div>
          <div id="myOverlayAuthor" className="overlay">
          <span className="closebtn" onClick={closeSearchAuthor} title="Close Overlay">x</span>
          <div className="overlay-content">
          <input type="text" placeholder="Search.." name="search" onChange={e => setauthorName(e.target.value)} value={authorName}/>
          <button type="submit" onClick={submitHandlerAuthor}><i className="fa fa-search"></i></button>
          </div>
          </div>
        </div>
      </div>
      </>
    );
}