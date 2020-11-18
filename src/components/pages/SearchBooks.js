import React from 'react';
import '../../App.css';
import './SearchBooks.css';


export default function SearchBooks() {

  function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
  }
  
  // Close the full screen search box
  function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
  }
    return (
      <>
      <h1 className='search-books'>ONLINE LIBRARY</h1>
      <div className='searchdiv'>
      <button class="openBtn" onClick={openSearch}>Search a Book</button>
      </div>
      <div id="myOverlay" class="overlay">
      <span class="closebtn" onClick={closeSearch} title="Close Overlay">x</span>
      <div class="overlay-content">
      <input type="text" placeholder="Search.." name="search"/>
      <button type="submit"><i class="fa fa-search"></i></button>
      </div>
      </div>

      </>
    );
}