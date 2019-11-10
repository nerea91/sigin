import React from 'react';
import ReactDom from 'react-dom';
import {  BrowserRouter,  Route, Switch} from 'react-router-dom';
import Users from './User';
import Nav from './Nav';
import SignInPage from './SignInPage';
import Main from '../Router';

let CreateAccountPage = (props) => {
  return <h1 className="mt-5">Create Account Page</h1>;
};
let DashboardPage = (props) => {
  return <h1 className="mt-5">Dashboard Page</h1>;
};

class App extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
      <BrowserRouter>
          <div>
              <Nav />,
              <div id="contentwrapper">
              <BrowserRouter>
                <Route component={Main} />
              </BrowserRouter>
              </div>
          </div>
      </BrowserRouter>
      );
  }
};
export default App