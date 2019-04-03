import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

export class RegisterUser extends Component {

  handleInput(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(
      {[name]: value}
    )
  }

  // componentDidUpdate() {
  //   if(!window.sessionStorage.authToken){
  //     return this.props.history.push("/login")
  //   }
  // }

  registerUser() {
    let token = 'Bearer ' + window.sessionStorage.authToken
    let url = "http://172.16.1.18:8080/api/v1/accounts/"
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      },
      body: JSON.stringify(
        this.state
      ),
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(data.error === null){
        return (
          this.props.history.push(`/dashboard/users`)
        )
      }else {
        alert(data.error.error_message)
      }
    })
    .catch(error => {
      alert(error)
    });
  }

  render() {
    return (
      <form>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="staticEmail" placeholder="Email" name="email"
              onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPosition" className="col-sm-2 col-form-label">Position</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputPosition" placeholder="Postion" name="position"
              onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputOffice" className="col-sm-2 col-form-label">Office</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputOffice" placeholder="Office" name="office"
              onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputAge" className="col-sm-2 col-form-label">Age</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputAge" placeholder="Age" name="age"
              onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password"
              onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPasswordConfirmation" className="col-sm-2 col-form-label">Password Confirmation</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPasswordConfirmation" placeholder="Password Confirmation" name="password_confirmation"
              onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="w-80">
          <a className="btn btn-primary btn-block" onClick={() => this.registerUser()}>Register User</a>
        </div>
      </form>
    )
  }
}

export default withRouter(RegisterUser);
