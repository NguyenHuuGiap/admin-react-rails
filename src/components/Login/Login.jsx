import React, { Component, Fragment } from 'react'
import store from '../../Redux/Store';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  sendData() {
    fetch('http://172.16.1.18:8080/api/v1/account/sign_in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(data.error === null){
        store.dispatch({ type: 'Login', authToken: "data" })
        return (
          this.props.history.push(`/dashboard`)
        )
      }else {
        alert("Login fail")
      }
    })
    .catch(error => {
      alert(error)
    });
  }

  handleInput(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(
      {[name]: value}
    )
  }

  handlePassword(event) {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <Fragment>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="true" />
        <meta name="author" content="true" />
        <title>SB Admin - Login</title>
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
        <link href="css/sb-admin.css" rel="stylesheet" />
        <div className="container">
          <div className="card card-login mx-auto mt-5">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" name="email"
                      placeholder="Email address" required="required" autoFocus="autofocus" onChange={(event) => this.handleInput (event)} />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password"
                      required="required" onChange={(event) => this.handleInput(event)} />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" defaultValue="remember-me" />
                      Remember Password
                    </label>
                  </div>
                </div>
                <a className="btn btn-primary btn-block" onClick={() => this.sendData()}>Login</a>
              </form>
              <div className="text-center">
                <a className="d-block small mt-3" href="register.html">Register an Account</a>
                <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
