import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Users from './components/User';
import MainPage from './components/Main';
import SignInPage from './components/SignInPage';


const Main = props => (
<Switch>
  {/*User might LogIn*/}
  <Route exact path='/' component={MainPage}/>
  {/*User will LogIn*/}
  <Route path='/sigin' component={SignInPage}/>
</Switch>
);
export default Main;