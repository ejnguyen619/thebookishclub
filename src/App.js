import 'whatwg-fetch';
import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Books from './components/pages/Books';
import ContactUs from './components/pages/ContactUs';
import Account from './components/pages/Account';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/Signup';
import Home from './components/pages/Home';
import SearchBooks from './components/pages/SearchBooks';
import CurrentBooks from './components/pages/CurrentBooks';
import FavoriteBooks from './components/pages/FavoriteBooks';
import Profile from './components/pages/Profile';
import Membership from './components/pages/Membership';
import SearchResults from './components/pages/SearchResults';
import Booking from './components/pages/Booking';
import NotFound from './components/pages/NotFound';

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
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/books' exact component={Books} />
        <Route path='/contact-us' exact component={ContactUs} />
        <Route path='/account' exact component={Account} />
        <Route path='/sign-in' exact render={(props) => <SignIn {...props} Login={Login} error={error} loggedIn={loggedIn} authLogin={authLogin} />} />
        <Route path='/sign-up' exact render={(props) => <SignUp {...props} Login={Login} error={error} loggedIn={loggedIn} />} />
        <Route path='/search-books' exact component={SearchBooks} />
        <Route path='/current-books' exact component={CurrentBooks} />
        <Route path='/favorite-books' exact component={FavoriteBooks} />
        <Route path='/profile' exact render={() => <Profile user={user} setUser={setUser} /> } />
        <Route path='/membership' exact component={Membership} />
        <Route path='/search/name/:bookName' exact component={SearchResults} />
        <Route path='/search/author/:authorName' exact component={SearchResults} />
        <Route path='/booking' exact render={(props) => <Booking {...props}/>} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
