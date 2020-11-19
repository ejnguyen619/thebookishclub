import React, { useState } from 'react';
import '../../App.css';

export default function Profile({user, setUser}) {
    console.log(user);
    const [details, setDetails] = useState({name: user.name, email: user.email, password: "Password", src:""});

    const submitHandler = e => {
      e.preventDefault();
      console.log(details);
      setUser({
        name: details.name,
        email: details.email
      });
    }

    return (
      <>
      <form className='profile' onSubmit={submitHandler}>
        <div className='form-inner'>
          <h2>About Me</h2>
          <div className='form-group'>
            <label htmlFor="picture">Profile Picture: </label>
            <img src={details.src} alt="this is blank" />
            <input type="file" name="picture" id='picture' 
              placeholder="Photo" accept="image/png, image/jpeg" required="" capture 
              onChange={e => setDetails({...details, 
              src: URL.createObjectURL(e.target.files[0])})} />
          </div>
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
          <input type='submit' value='UPDATE' />
        </div>
      </form>
      </>
    );
}
