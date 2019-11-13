import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Users from './components/User';
import MainPage from './components/Main';
import SignInPage from './components/SignInPage';
import SignInList from './components/SignInList';


const Main = props => (
<Switch>
  {/*User might LogIn*/}
  <Route exact path='/' component={MainPage}/>
  {/*User will LogIn*/}
  <Route path='/sigin' component={SignInPage}/>
  <Route path='/history' component={SignInList}/>
</Switch>
);
export default Main;