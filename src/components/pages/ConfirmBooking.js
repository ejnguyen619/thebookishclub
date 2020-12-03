import React, { useState } from 'react';
import '../../App.css';
import { Redirect } from 'react-router-dom';

export default function ConfirmBooking() {
    const [isRedirect, SetIsRedirect] = useState(false);

    const viewOrders = () => {
      SetIsRedirect(true);
    }

    if(isRedirect) return <Redirect to="/borrowed-books" />

    return (
      <>
      <h1 style={{textAlign: "center", marginTop: "20px"}}>Your order has been submitted!</h1>
        <div className='confirm-booking'>
          <button onClick={viewOrders}>View My Orders</button>
          <button onClick={viewOrders}>Search For More Books</button>
        </div>
      </>
    );
}