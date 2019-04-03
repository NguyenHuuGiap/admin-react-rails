import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export default class Menu extends Component {
  render() {
    return (
      <ul className="sidebar navbar-nav">
        <li className="nav-item active">
        <Link className="nav-link" to="/dashboard/">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/users">
            <i className="fas fa-fw fa-chart-area" />
            <span>Users</span>
          </Link>
        </li>
      </ul>
    )
  }
}
