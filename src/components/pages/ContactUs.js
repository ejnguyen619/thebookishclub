import React, { useState } from 'react';
import '../../App.css';
import './ContactUs.css';
import {Helmet} from "react-helmet";

export default function ContactUs() {
    const [details, setDetails] = useState({name: "", email: "", message: ""});
    const [formsubmit, setFormSubmit] = useState(false);

    const submitHandler = e => {
      e.preventDefault();
      console.log(details);
      setFormSubmit(true);
    }

    return (
      <>
      <div className="backgroundContactUs">
        <form className='contact-us' onSubmit={submitHandler}>
          <div className='form-inner'>
          <Helmet>
                <meta name="description" content="Question or Comments? Drop them to us"/>
                <title>Reach Us</title>
          </Helmet>
            <h1>Contact Us</h1>
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
              <label htmlFor="msg">Message: </label>
              <textarea type="text" name="msg" id='msg'
                onChange={e => setDetails({...details, message: e.target.value})} value={details.message} >
              </textarea>
            </div>
            <input type='submit' value='SUBMIT' />
            {formsubmit && <h1 style={{color:'red'}}>Form submitted!</h1>}
          </div>
        </form>
        </div>
      </>
    );
}
