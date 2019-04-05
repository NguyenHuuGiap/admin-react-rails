import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

export class DetailUser extends Component {
  constructor(props) {    
    super(props)
    this.state = {
      account: null
    }
  }

  async componentDidMount() {    
    await this.fetchDataUser()
  }

  componentDidUpdate() {
    if(!window.sessionStorage.authToken){
      return this.props.history.push("/")
    }
  }

  async fetchDataUser() {
    try {
      let url = "https://react-exm.herokuapp.com/api/v1/accounts/" + this.props.match.params.id
      let token = 'Bearer ' + window.sessionStorage.authToken
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': token,
        }
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ account: json.data.account });
    } catch (error) {
      alert(error);
    }
  }

  updateUser() {
    let token = 'Bearer ' + window.sessionStorage.authToken
    let url = "https://react-exm.herokuapp.com/api/v1/accounts/" + this.props.match.params.id
    fetch(url, {
      method: 'PATCH',
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
        this.props.history.push(`/dashboard/users`)
      }else {
        alert(data.error.error_message)
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

  render() {
    return (
      <form>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="staticEmail" placeholder="Email" name="email"
              defaultValue={this.state.account && this.state.account.email || null} onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPosition" className="col-sm-2 col-form-label">Position</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputPosition" placeholder="Postion" name="position"
              defaultValue={this.state.account && this.state.account.position || null} onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputOffice" className="col-sm-2 col-form-label">Office</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputOffice" placeholder="Office" name="office"
              defaultValue={this.state.account && this.state.account.office || null} onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputAge" className="col-sm-2 col-form-label">Age</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputAge" placeholder="Age" name="age"
              defaultValue={this.state.account && this.state.account.age || null} onChange={(event) => this.handleInput (event)} />
          </div>
        </div>
        <div className="w-80">
          <a className="btn btn-primary btn-block" onClick={() => this.updateUser()}>Update</a>
        </div>
      </form>
    )
  }
}

export default withRouter(DetailUser);
