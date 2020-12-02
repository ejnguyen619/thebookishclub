import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
// import '../../App.css';
import './Booking.css';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import config from '../../config';


export default function Booking() {
    const [isRedirect, setIsRedirect] = useState(false);
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const bookInfo = JSON.parse(localStorage.getItem('bookInfo'));
    const map_key = config.REACT_MAP_API_KEY;

    // const locations = [
    //   {
    //     "Dr Martin Luther King Jr. Library": { 
    //       lat: 37.3355,
    //       lng: -121.8850 
    //     }
    //   },
    //   {
    //     "Santa Clara City Library": { 
    //       lat: 37.288261,
    //       lng: -121.943184
    //     }
    //   },
    //   {
    //     "Milpitas Public Library": { 
    //       lat: 37.4282724,
    //       lng: -121.9066238
    //     }
    //   },
    //   {
    //     "Evergreen Branch Library": { 
    //       lat: 37.3138,
    //       lng: -121.7959
    //     }
    //   },
    //   {
    //     "Berryessa Branch Library": { 
    //       lat: 37.3939,
    //       lng: -121.8407
    //     }
    //   }
    // ];

    const mapStyles = {        
      height: "50vh",
      width: "100%"};
    
    const defaultCenter = {
      lat: 37.3355, lng: -121.8850
    }

    const submitHandler = e => {
      e.preventDefault();
      console.log("Confirm Booking");
    }

    const goBack = e => {
      e.preventDefault();
      setIsRedirect(true);
    }

    const handleMouseOver = e => {
      setShowInfoWindow(true);
    };

    const handleMouseExit = e => {
      setShowInfoWindow(false);
    };

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
              {/* <p>Library: {bookInfo.library}</p> */}
            </div>
            <button className="confirm" onClick={goBack}>Go Back to Results</button>
          </div>
          <div className="columnBookDetail">
            <LoadScript
              googleMapsApiKey={map_key}>
              <h2>Available At:</h2>
              <div className="map-box">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={11}
                center={defaultCenter}>
                {
                  bookInfo.library.map( item => {
                    return (
                      <Marker key={item.name} position={item.location} onMouseOver=
                      {handleMouseOver} onMouseOut={handleMouseExit}>
                        {showInfoWindow && (
                            <InfoWindow>
                                <p>{item.name}</p>
                            </InfoWindow>
                        )}
                      </Marker>
                      // <Marker key={item} position={locations[item]}/>
                    )
                  })
               }
              </GoogleMap>
              </div>
            </LoadScript>
          </div>
        </div>
        <div className="row">
            <div className="column">
            <h3>Booking Information:</h3>
            <form onSubmit={submitHandler}>
              <div className='form-inner'>
                <p>Delivery type: </p> 
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