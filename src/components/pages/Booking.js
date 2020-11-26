import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import './Booking.css';

export default function Booking() {
    const [isRedirect, setIsRedirect] = useState(false);
    const bookInfo = JSON.parse(localStorage.getItem('bookInfo'));

    const submitHandler = e => {
      e.preventDefault();
      console.log("Confirm Booking");
    }

    const goBack = e => {
      e.preventDefault();
      setIsRedirect(true);
    }

    if(isRedirect) return <Redirect to={localStorage.getItem('prevLink')} />

    return (
      <>
        <div className="row">
          <div className="columnBookDetail">
            <div>
              <img src={bookInfo.image_url} alt="book cover" />
            </div>
            <div>
              <h3><strong>Title:</strong> {bookInfo.original_title}</h3>
              <p><strong>Authors:</strong> {bookInfo.authors} </p>
              <p><strong>Publication Year:</strong> {bookInfo.original_publication_year} </p>
            </div>
            <button className="confirm" onClick={goBack}>Go Back to Results</button>
          </div>
          <div className="column">
            <h3>Delivery Information:</h3>
            <form onSubmit={submitHandler}>
              <div className='form-inner'>
              <label for="pick-up"> 
                <input type="radio" id="pick-up" name="delivery" value="pick-up" /> Pick Up
              </label>
              <label for="drop-off"> 
                <input type="radio" id="drop-off" name="delivery" value="drop-off" /> Drop Off
              </label><br></br>
              <div className='form-group'>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id='name' />
              </div>
              <div className='form-group'>
                <label htmlFor="address">Address: </label>
                <input type="text" name="address" id='address' />
              </div>
              <div className='form-group'>
                <label htmlFor="city">City, State, Zipcode: </label>
                <input type="text" name="city" id='city' />
              </div>
              <input type='submit' value='Confirm Booking' />
              </div>
            </form>
          </div>
        </div>
      </>
    );
}