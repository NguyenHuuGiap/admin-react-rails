import React, { Component } from 'react'
import store from '../../Redux/Store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';

export class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  dropDownLogout() {
    this.setState(
      {
        isShow: !this.state.isShow
      }
    );
  }

  logOut() {
    window.sessionStorage.removeItem("authToken");
    this.props.history.push("/login")
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <a className="navbar-brand mr-1" href="index.html">Start Bootstrap</a>
        <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
          <i className="fas fa-bars" />
        </button>
        {/* Navbar Search */}
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
        </form>
        {/* Navbar */}
        <ul className="navbar-nav ml-auto ml-md-0">
          <li className={"nav-item dropdown no-arrow " + (this.state.isShow ? "show" : "")}>
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded={this.state.isShow} onClick={() => this.dropDownLogout()}>
              <i className="fas fa-user-circle fa-fw" />
            </a>
            <div className={"dropdown-menu dropdown-menu-right " + (this.state.isShow ? "show" : "")} aria-labelledby="userDropdown">
              <a className="dropdown-item" href="#" data-toggle="modal"
                onClick={() => this.logOut()} data-target="#logoutModal">Logout</a>
            </div>
          </li>
        </ul>
      </nav>
    )
  }
}
export default withRouter(Nav);
