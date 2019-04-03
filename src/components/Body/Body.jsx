import React, { Component } from 'react'
import Footer from '../Footer/Footer';
import Menu from '../Nav/Menu';
import Users from '../Users/Users';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DetailUser from '../Users/DetailUser';
import RegisterUser from '../Users/RegisterUser';

export default class Body extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="wrapper">
        <Router>
          <Menu/>
          <div id="content-wrapper">
            <Route path="/dashboard/users" component={Users} />
            <Route path="/dashboard/user/:email.:id" component={DetailUser} />
            <Route path="/dashboard/register_user" component={RegisterUser} />
            <Footer/>
          </div>
        </Router>
      </div>
    )
  }
}
