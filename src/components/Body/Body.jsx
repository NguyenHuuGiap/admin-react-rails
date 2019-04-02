import React, { Component } from 'react'
import Footer from '../Footer/Footer';
import Menu from '../Nav/Menu';
import Users from '../Users/Users';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class Body extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="wrapper">
        <Menu/>
        <div id="content-wrapper">
          <Router>
            <Route path="/dashboard/users" component={Users} />
          </Router>
          <Footer/>
        </div>
      </div>
    )
  }
}
