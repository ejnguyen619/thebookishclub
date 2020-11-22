import React, { useState } from 'react';
import '../../App.css';
import PayPal from './PayPal';
import './Membership.css';

export default function Memberership() {

  const [checkout, setCheckOut] = useState(false);

  return (
    <div className="Membership">
    <h1 className='membership-header'>You are not a member yet. Please proceed to payment for our membership.</h1>
      {checkout ? (
        <PayPal />
      ) : (
        <button
          onClick={() => {
            setCheckOut(true);
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
}