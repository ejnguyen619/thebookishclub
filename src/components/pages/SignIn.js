import React, { useState, useEffect } from 'react';
import '../../App.css';
import './SignInSignUp.css'
import { Link, Redirect } from 'react-router-dom';

export default function SignIn({Login, error, loggedIn, authLogin}) {
    const [details, setDetails] = useState({name: "", email: "", password: ""});
    const [submitForm, setSubmitForm] = useState(0);

    const submitHandler = e => {
      e.preventDefault();
      Login(details);
      setSubmitForm(submitForm + 1);
    }

    useEffect(() => {
      const fetchData = async () => {
        await fetch(`/api/users?email=${details.email}&password=${details.password}&name=${details.name}`)
          .then(res => {
            if (res.status >= 400) {
              throw new Error("Server responds with error!")
            }
            return res.json()
          })
          .then(userInfo => {
            if(userInfo.length !== 0) {
              if(localStorage.getItem('userId') !== null) localStorage.removeItem("userId");
              localStorage.setItem('userId', userInfo[0].id);
              authLogin(true);
            }
            else if(submitForm > 0) authLogin(false);
          })
      };
      if(submitForm !== 0) fetchData();
    // eslint-disable-next-line
    }, [submitForm]);

    if(error === "" && loggedIn) return <Redirect to="/" />

    return (
      <>
      <div className="signInBackground">
      <form className='sign-in' onSubmit={submitHandler}>
        <div className='form-inner'>
          <h2>Login</h2>
          {(error !== "" && submitForm !== 0 && !loggedIn ? (<div className="error">{error}</div>) : "")}
          <div className='form-group'>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id='name' 
              onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id='email'
              onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id='password'
              onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
          </div>
          <input type='submit' value='LOGIN' />
          <Link to='/sign-up'>Create New Account</Link>
        </div>
      </form>
      </div>
      </>
    );
}
