import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../components/Login/Login';
import Main from '../components/Main';

export default class RouterLink extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} data={this.props.data} env_url={this.props.env_url} />
        <Route path="/dashboard" component={Main} data={this.props.data} env_url={this.props.env_url} />
      </Router>
    )
  }
}
