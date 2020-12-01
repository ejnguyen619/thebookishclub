import React, { useState, useEffect } from 'react';
import '../../App.css';
import {Helmet} from "react-helmet";

export default function Profile() {
    const userId = localStorage.getItem('userId');
    const [err, setErr] = useState(null);
    const [update, setUpdate] = useState(false);
    const [details, setDetails] = useState({name: "", email: "", address: "", organization: "", src:""});

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
              console.log(userInfo);
              setDetails(displayUserInfo(userInfo));
            },
            err => {
              setErr(err);
            })
      };
      fetchData();
      // eslint-disable-next-line
    }, [userId]);

    const displayUserInfo = userInfo => {
      var displayUser = {};
      const name = userInfo.name;
      const email = userInfo.email;
      const address = (userInfo.address !== undefined) ? userInfo.address : " ";
      const organization = (userInfo.organization !== undefined) ? userInfo.organization : " ";
      const src = (userInfo.src !== undefined) ? userInfo.src : " ";
      displayUser["name"] = name;
      displayUser["email"] = email;
      if(address !== " ") displayUser["address"] = address;
      if(organization !== " ") displayUser["organization"] = organization;
      if(src !== " ") displayUser["src"] = src;
      //console.log(displayUser);
      return displayUser;
    }

    const submitHandler = async(e) => {
      e.preventDefault();
      console.log(details);
      if(details.name === "") setErr("Name can not be empty!");
      if(details.email === "") setErr("Email can not be empty!");
      else
      await fetch(`/api/users/updateUser/${userId}`, {
        method: 'put',
        body: JSON.stringify({email : details.email, name : details.name, address: details.address, organization: details.organization, image_url: details.src }),
        headers: {
            'Content-Type': 'application/json',
        }
      })
        .then(res => {
          return res.json()
        })
        .then(user => {
          if(user.message) setErr(user.message);
          else {
            console.log("Profile updated.");
            setErr("");
            setUpdate(true);
          }    
        })
    }

    return (
      <>
      <form className='profile' onSubmit={submitHandler}>
        <div className='form-inner'>
        <Helmet>
                <meta name="description" content="Profile
				                                          Add your details and start borrowing books"/>
                <title>User Profile</title>
        </Helmet>
          {update && <h1 style={{textAlign: "center"}}>Profile has been updated.</h1>}
          {err !== null && <h1 style={{textAlign: "center"}}>{err}</h1>}
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
            <label htmlFor="address">Address: </label>
            <input type="address" name="address" id='address'
              onChange={e => setDetails({...details, address: e.target.value})} value={details.address}/>
          </div>
          <div className='form-group'>
            <label htmlFor="organization">Organization: </label>
            <input type="organization" name="organization" id='organization'
              onChange={e => setDetails({...details, organization: e.target.value})} value={details.organization}/>
          </div>
          <input type='submit' value='UPDATE' />
        </div>
      </form>
      </>
    );
}
