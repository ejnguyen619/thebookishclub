import React, { useState } from 'react';
import '../../App.css';
import { Redirect } from 'react-router-dom';

export default function ConfirmBooking() {
    const [redirectOrder, SetDirectOrder] = useState(false);
    const [redirectSearch, SetDirectSearch] = useState(false);

    const viewOrders = () => SetDirectOrder(true);
    const viewSearch = () => SetDirectSearch(true);

    if(redirectOrder) return <Redirect to="/borrowed-books" />
    if(redirectSearch) return <Redirect to="/search-books" />

    return (
      <>
      <h1 style={{textAlign: "center", marginTop: "20px"}}>Your order has been submitted!</h1>
        <div className='confirm-booking'>
          <button onClick={viewOrders}>View My Orders</button>
          <button onClick={viewSearch}>Search For More Books</button>
        </div>
      </>
    );
}