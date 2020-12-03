import React, { useState, useEffect } from 'react';
import '../../App.css';
import {Helmet} from "react-helmet";
import { useTranslation } from 'react-i18next';

export default function BorrowedBooks() {
  const { t } = useTranslation();
  //const [checkout, setCheckOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const userEmail = localStorage.getItem('userEmail');
  const [err, setErr] = useState(null);
  // const [update, setUpdate] = useState(false);
  //const [isMember, setIsMember] = useState(false);
  //const [membershipStartDate, setMembershipStartDate] = useState("");
  // const [order, setOrder] = useState({BookId:0, title: "", DateBorrowed: "", DateOfReturn: ""});
   const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        await fetch(`/api/orders/getOrderDetails?email=${userEmail}`)
          .then(res => {
            if (res.status >= 400) {
              throw new Error("Server responds with error!")
            }
            return res.json()
          })
          .then(orderInfo => {
            // console.log(userInfo);
            // setDetails(displayUserInfo(userInfo));
            //setIsMember(userInfo.memberShip);
            setOrder(orderInfo);
            setIsLoaded(true);
            console.log("Order info: ", order);
          },
          err => {
            console.log(typeof err);
            setErr(err);
        
          })
    };
    fetchData();
    // eslint-disable-next-line
  }, [userEmail]);

  if (err) {
    return <div className='search-results'><h1>{err.message}</h1></div>
  } else if (!isLoaded) {
    return <div className='search-results'><h1>Loading...</h1></div>
  } 
  else{
    return (
      <> 
         <Helmet>
                <meta name="description" content="Over 10,000 books
                                                  Popular, Academic and Work Books
                                                  can be borrowed"/>
                <title>Borrowed books</title>
         </Helmet>
        <h1 className='borrowedBooksDiv'>{t("borrow_msg")}</h1>
        {err !== null && <h1 style={{textAlign: "center"}}>{err}</h1>}
               <ul>
                  {order.map(orderDetails => (

                   <div>
                  
                  <li>Book ID: {orderDetails.book_id}</li>
                  <li>Book Name: {orderDetails.title}</li>
                  <li>Date Borrowed: {orderDetails.DateBorrowed}</li>
                  <li>Date Of Return: {orderDetails.DateOfReturn}</li>
                  </div>
                ))
                }
                </ul>

        
      </>
    );
              }
}
