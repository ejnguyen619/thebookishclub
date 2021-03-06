import 'whatwg-fetch';
import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ContactUs from './components/pages/ContactUs';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/Signup';
import Home from './components/pages/Home';
import SearchBooks from './components/pages/SearchBooks';
import CurrentBooks from './components/pages/CurrentBooks';
import BorrowedBooks from './components/pages/BorrowedBooks';
import Profile from './components/pages/Profile';
import Membership from './components/pages/Membership';
import Language from './components/pages/Language';
import SearchResults from './components/pages/SearchResults';
import Booking from './components/pages/Booking';
import ConfirmBooking from './components/pages/ConfirmBooking';
import NotFound from './components/pages/NotFound';
import {Helmet} from "react-helmet";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({name:"", email: "", id: ""});
  const [error, setError] = useState("");

  const Login = details => {
    if(localStorage.getItem('userName') !== null) localStorage.removeItem("userName");
    if(localStorage.getItem('userEmail') !== null) localStorage.removeItem("userEmail");

    localStorage.setItem('userName', details.name);
    localStorage.setItem('userEmail', details.email);
  }

  function authLogin(bool) {
    if(bool) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid Information! Try again");
    }
  }

  if(!loggedIn && user.name !== "") setUser({name:"", email: "", id: ""});

  return (
    <Router>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className='App'>
      <Helmet>
                <meta name="description" content="TheBookishClub online library has all the desired books that can be loaned 
                from libraries close by.Pick up and drop services are available, saving time for the readers.A book reccomendation
                system is also avaiable for the readers who are not sure on what to read." />
                <title>TheBookishClub | Online Library</title>
      </Helmet>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/contact-us' exact component={ContactUs} />
        <Route path='/sign-in' exact render={(props) => <SignIn {...props} Login={Login} error={error} loggedIn={loggedIn} authLogin={authLogin} />} />
        <Route path='/sign-up' exact render={(props) => <SignUp {...props} Login={Login} error={error} loggedIn={loggedIn} />} />
        <Route path='/search-books' exact component={SearchBooks} />
        <Route path='/current-books' exact component={CurrentBooks} />
        <Route path='/borrowed-books' exact component={BorrowedBooks} />
        <Route path='/profile' exact render={() => <Profile user={user} setUser={setUser} /> } />
        <Route path='/membership' exact component={Membership} />
        <Route path='/language' exact component={Language} />
        <Route path='/search/name/:bookName' exact component={SearchResults} />
        <Route path='/search/author/:authorName' exact component={SearchResults} />
        <Route path='/booking' exact render={(props) => <Booking {...props}/>} />
        <Route path='/confirm-booking' exact component={ConfirmBooking} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
