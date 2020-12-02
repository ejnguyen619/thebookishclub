import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import './Booking.css';

export default function Booking() {
    const [isRedirect, setIsRedirect] = useState(false);
    const [confirmBooking, setConfirmBooking] = useState(false);
    const bookInfo = JSON.parse(localStorage.getItem('bookInfo'));
    const userId = localStorage.getItem('userId');
    const [err, setErr] = useState(null);
    const [details, setDetails] = useState({delivery: "", name: "", email: "", address: "", address2: ""});

    useEffect(() => {
      const fetchData = async () => {
          await fetch(`/api/users/?id=${userId}`)
            .then(res => {
              if (res.status >= 400) {
                throw new Error("Server responds with error!")
              }
              return res.json()
            })
            .then(userInfo => {
              //console.log(userInfo);
              setDetails(displayUserInfo(userInfo));
            },
            err => {
              setErr(err);
            })
      };
      fetchData();
      // eslint-disable-next-line
    }, [userId]);

    const displayUserInfo = userInfo => {
      var displayUser = {};
      const name = userInfo.name;
      const email = userInfo.email;
      const address = (userInfo.address !== undefined) ? userInfo.address : " ";
      displayUser["name"] = name;
      displayUser["email"] = email;
      if(address !== " ") displayUser["address"] = address;
      //console.log(displayUser);
      return displayUser;
    }

    const submitHandler = async(e) => {
      e.preventDefault();
      console.log(details);
      if(details.name === "") setErr("Name cannot be empty!");
      else if(details.delivery === "DropOff" && (details.address === "" || details.address2 === ""))
        setErr("Address cannot be empty");
      else
      await fetch(`/api/orders/createNewOrder?email=${details.email}&title=${bookInfo.title}&book_id=${bookInfo.book_id}`, {
        method: 'post',
        body: JSON.stringify({deliveryType: details.delivery, name : details.name, addressLine1: details.address, addressLine2: details.address2}),
        headers: {
            'Content-Type': 'application/json',
        }
      })
        .then(res => {
          return res.json()
        })
        .then(user => {
          if(user.message) setErr(user.message);
          else {
            console.log("Order submitted.");
            setErr("");
            setConfirmBooking(true);
          }    
        })
    }

    const goBack = e => {
      e.preventDefault();
      setIsRedirect(true);
    }

    if(isRedirect) return <Redirect to={localStorage.getItem('prevLink')} />
    if(confirmBooking) return <Redirect to="/confirm-booking" />

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
            {err !== null && <h3 style={{color: "red"}}>{err}</h3>}
            <form onSubmit={submitHandler}>
              <div className='form-inner'>
              <label for="pick-up"> 
                <input type="radio" id="pick-up" name="delivery" value="Pickup" 
                  onChange={e => setDetails({...details, delivery: e.target.value})} /> Pick Up
              </label>
              <label for="drop-off"> 
                <input type="radio" id="drop-off" name="delivery" value="DropOff" 
                  onChange={e => setDetails({...details, delivery: e.target.value})} /> Drop Off
              </label><br></br>
              <div className='form-group'>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id='name' required
                  onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
              </div>
              <div className='form-group'>
                <label htmlFor="address">Address: </label>
                <input type="text" name="address" id='address' 
                  onChange={e => setDetails({...details, address: e.target.value})} value={details.address} />
              </div>
              <div className='form-group'>
                <label htmlFor="address2">City, State, Zipcode: </label>
                <input type="text" name="address2" id='address2' 
                  onChange={e => setDetails({...details, address2: e.target.value})} value={details.address2} />
              </div>
              <input type='submit' value='Confirm Booking' />
              </div>
            </form>
          </div>
        </div>
      </>
    );
}