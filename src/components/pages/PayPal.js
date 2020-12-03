import React, { useRef, useEffect } from "react";

export default function Paypal({isMember, setIsMember}) {
  // const paypal = useRef();
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef = useRef();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: 20.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
          // localStorage.setItem('memberSet', true);
          alert('Your payment was successful!');
          // fetchData();
        },
        
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypalRef.current);
  }, [userId]);

  // return (
  //   <div>
  //     <div ref={paypal}></div>
  //   </div>
  // );
  // If the payment has been made
  if (paid) {
    const fetchData = async () => {
      await fetch(`/api/users/updateUserMembership/${userId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        }
      })
          .then(res => {
            if (res.status >= 400) {
              console.log("Inside fetchData!!!!");
              throw new Error("Server responds with error!")
            }
            console.log(res);
            return res.json()
          })
          .then(userInfo => {
            console.log(userInfo);
            // console.log("User info: ", userInfo);
            },
            err => {
              console.log("error occured!");
            })
          }
    fetchData();
    setIsMember(!isMember);
    return <div>Payment successful.!</div>;
  }

  // If any error occurs
  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }

  // Default Render
  return (
    <div>
      <h4>Total Amount is $20</h4>
      <div ref={paypalRef} />
    </div>
  );
}