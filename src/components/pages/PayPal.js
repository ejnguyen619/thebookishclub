import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();
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
          console.log(order);
          await fetch(`/api/users/updateUserMembership/${userId}`)
              .then(res => {
                if (res.status >= 400) {
                  throw new Error("Server responds with error!")
                }
                return res.json()
              })
              .then(userInfo => {
                console.log(userInfo);
                // console.log("User info: ", userInfo);
                },
                err => {
                  console.log("error occured!");
                })
          alert('Your payment was successful!')
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [userId]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}