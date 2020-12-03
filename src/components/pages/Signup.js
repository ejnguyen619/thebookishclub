import React, { useState } from 'react';
import '../../App.css';
import { Redirect } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function SignUp() {
    const [details, setDetails] = useState({name: "", email: "", password: "", confirm: ""});
    const [error, setError] = useState("");
    const [formErrors, setformErrors] = useState({email: "", password: ""});
    const [newUser, setNewUser] = useState(false);

    const submitHandler = async(e) => {
      e.preventDefault();
      if(formErrors.password !== "") {
        setError(formErrors.password);
        return;
      }
      await fetch(`/api/users/createUser`, {
        method: 'post',
        body: JSON.stringify({email : details.email, password: details.password, name : details.name}),
        headers: {
            'Content-Type': 'application/json',
        }
      })
        .then(res => {
          return res.json()
        })
        .then(user => {
          if(user.message) setError(user.message);
          else {
            console.log("New User created.");
            setError("");
            setNewUser(true); 
          }    
        })
    }

    const handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      setDetails({...details, [name] : value});
      validateField(name, value);
    }

    function validateField (name, value) {
      switch(name) {
        case 'email':
          let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          if(!emailValid) setformErrors({...formErrors, email: "Invalid email"});
          else setformErrors({...formErrors, email: ""});
          break;
        case 'password':
          let passwordValid = value.length >= 6;
          if(!passwordValid) setformErrors({...formErrors, password: "Password too short"});
          else setformErrors({...formErrors, password: ""});
          break;
        case 'confirm':
          let confirmPassword = (details.password === value);
          if(!confirmPassword) setformErrors({...formErrors, password: "Password does not match"});
          else setformErrors({...formErrors, password: ""});
          break;
        default: break;
      };
    }

    if(newUser) return <Redirect to="/sign-in" />

    return (
      <>
      <div className="signUpBackground">
      <form className='sign-in' onSubmit={submitHandler}>
        <div className='form-inner'>
        <Helmet>
                <meta name="description" content="Membership
				                                          For Students and Professionals"/>
                <title>Register Today</title>
        </Helmet>
          <h2>Sign Up</h2>
          {(error !== "" ? (<div className="error">{error}</div>) : "")}
          <div className='form-group'>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id='name' 
              onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email: </label>
            {(formErrors.email !== "" ? (<div className="error">{formErrors.email}</div>) : "")}
            <input type="email" name="email" id='email'
              onChange={handleChange} value={details.email}/>
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password: </label>
            {(formErrors.password !== "" ? (<div className="error">{formErrors.password}</div>) : "")}
            <input type="password" name="password" id='password'
              onChange={handleChange} value={details.password}/>
          </div>
          <div className='form-group'>
            <label htmlFor="confirm">Confirm Password: </label>
            <input type="password" name="confirm" id='confirm'
              onChange={handleChange} value={details.confirm}/>
          </div>
          <input type='submit' value='SIGN UP' />
        </div>
      </form>
      </div>
      </>
    );
}
