import React, { useState } from 'react';
import '../../App.css';
import PayPal from './PayPal';
import './Membership.css';
import {Helmet} from "react-helmet";

export default function Memberership() {

  const [checkout, setCheckOut] = useState(false);

  return (
    <div className="Membership">
      <Helmet>
                <meta name="description" content="Membership
				                                          For Students and Professionals"/>
                <title>Membership</title>
      </Helmet>
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