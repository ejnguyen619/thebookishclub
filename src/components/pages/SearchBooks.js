import React, { useState } from 'react';
import '../../App.css';
import './SearchBooks.css';
import { Redirect } from 'react-router-dom';


export default function SearchBooks() {

  const [bookName, setbookName] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(false);
  const [data, setData] = useState({});

  function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
  }
  
  // Close the full screen search box
  function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
  }

  const submitHandler = e => {
    e.preventDefault();
    console.log(bookName);
    const fetchData = async () => {
      const result = await fetch(`/api/books/findBooksByTitle?title=${bookName}`);
      const body = await result.json();
      console.log(body);
      console.log(body.length);
      setData(body);
      console.log(data);
      if(body.length !== 0) {
        setError("");
        setbookName("");
        setResult(true);
      }
      else setError("Book not found. Try again.")
    };
    fetchData();
  }

  if(result) return <Redirect to="/search-results" />

    return (
      <>
      <h1 className='search-books'>ONLINE LIBRARY</h1>
      <div className='searchdiv'>
      <button className="openBtn" onClick={openSearch}>Search a Book</button>
      </div>
      <div id="myOverlay" className="overlay">
      <span className="closebtn" onClick={closeSearch} title="Close Overlay">x</span>
      <div className="overlay-content">
      {(error !== "" ? (<div className="error" style={{color: "#fff"}}>{error}</div>) : "")}
      <input type="text" placeholder="Search.." name="search" onChange={e => setbookName(e.target.value)} value={bookName}/>
      <button type="submit" onClick={submitHandler}><i className="fa fa-search"></i></button>
      </div>
      </div>

      </>
    );
}