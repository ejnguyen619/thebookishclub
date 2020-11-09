import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Books from './components/pages/Books';
import ContactUs from './components/pages/ContactUs';
import Account from './components/pages/Account';
import SignIn from './components/pages/SignIn';
import Home from './components/pages/Home';
import SearchBooks from './components/pages/SearchBooks';
import CurrentBooks from './components/pages/CurrentBooks';
import FavoriteBooks from './components/pages/FavoriteBooks';
import Profile from './components/pages/Profile';
import Membership from './components/pages/Membership';
import NotFound from './components/pages/NotFound';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className='App'>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/books' exact component={Books} />
        <Route path='/contact-us' exact component={ContactUs} />
        <Route path='/account' exact component={Account} />
        <Route path='/sign-in' exact component={SignIn} />
        <Route path='/search-books' exact component={SearchBooks} />
        <Route path='/current-books' exact component={CurrentBooks} />
        <Route path='/favorite-books' exact component={FavoriteBooks} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/membership' exact component={Membership} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
