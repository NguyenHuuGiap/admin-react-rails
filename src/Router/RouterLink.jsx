import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../components/Login/Login';
import Main from '../components/Main';

export default class RouterLink extends Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login} data={this.props.data} />
        <Route path="/dashboard" component={Main} data={this.props.data} />
      </Router>
    )
  }
}
