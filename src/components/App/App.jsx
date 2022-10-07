import React from 'react';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Profile from '../Profile/Profile.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx'

function App() {
  const [loggedIn] = useState(true);
  return (
    <div className='page'>
        <Switch>
          <Route exact path='/'><Main loggedIn={loggedIn} /></Route>
          <Route path='/movies'><Movies loggedIn={loggedIn} /></Route>
          <Route path='/saved-movies'><SavedMovies loggedIn={loggedIn} /></Route>
          <Route path='/profile' component={Profile}/>
          <Route path='/signin' component={Login}/>
          <Route path='/signup' component={Register} buttonText="Зарегистрироваться"/>
          <Route path='*' component={NotFound}/>
        </Switch>
    </div>
  );
}

export default App;
