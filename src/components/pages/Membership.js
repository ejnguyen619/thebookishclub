import React, { useState, useEffect } from 'react';
import '../../App.css';
import PayPal from './PayPal';
import './Membership.css';
import {Helmet} from "react-helmet";

export default function Memberership() {

  const [checkout, setCheckOut] = useState(false);
  const userId = localStorage.getItem('userId');
  const [err, setErr] = useState(null);
  // const [update, setUpdate] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [membershipStartDate, setMembershipStartDate] = useState("");
  const [membershipEndDate, setMembershipEndDate] = useState("");
  // const memberSet = localStorage.getItem('memberSet');
  
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
            // console.log(userInfo);
            // setDetails(displayUserInfo(userInfo));
            setIsMember(userInfo.memberShip);
            setMembershipStartDate(userInfo.memberShipStartDate);
            setMembershipEndDate(userInfo.memberShipEndDate);
            console.log("Membership details: ", membershipStartDate, membershipEndDate);
            // console.log("User info: ", userInfo);
          },
          err => {
            setErr(err);
          })
    };
    fetchData();
    // eslint-disable-next-line
  }, [userId, isMember]);

  if(isMember) {
    return (
      <div className="Membership">
        <Helmet>
            <meta name="description" content="Membership
                  For Students and Professionals"/>
            <title>Membership</title>
        </Helmet>
      {err !== null && <h1 style={{textAlign: "center"}}>{err}</h1>}
      <h1 className='membership-header'>Great you are one of our members! Your membership details are:</h1>
      <h2>Member since: {membershipStartDate}</h2>
      <h2>Membership expires on: {membershipEndDate}</h2>
    </div>
    )
  }
  else {
    return (
      <div className="Membership">
        <Helmet>
            <meta name="description" content="Membership
                    For Students and Professionals"/>
            <title>Membership</title>
        </Helmet>
      {err !== null && <h1 style={{textAlign: "center"}}>{err}</h1>}
      <h1 className='membership-header'>You are not a member yet. Please proceed to payment for our membership.</h1>
        {checkout ? (
          <PayPal isMember={isMember} setIsMember={setIsMember}/>
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
}