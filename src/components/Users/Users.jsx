import React, { Component } from 'react'
import User from './User';
import { connect } from 'react-redux'
import store from '../../Redux/Store';

export class Users extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {    
    if(!window.sessionStorage.authToken){
      return this.props.history.push("/")
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    try {
      let token = 'Bearer ' + window.sessionStorage.authToken
      const response = await fetch(`https://react-exm.herokuapp.com/api/v1/accounts`, {
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
      store.dispatch({type: "LIST_USER", accounts: json.data.accounts})
      // this.setState({ accounts: json.data.accounts });
    } catch (error) {
      alert(error);
    }
  }

  registerUser() {
    return (
      this.props.history.push(`/dashboard/register_user`)
    )
  }

  destroyUser() {
    let token = 'Bearer ' + window.sessionStorage.authToken
    let url = "https://react-exm.herokuapp.com/api/v1/accounts/" + this.props.match.params.id
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      }
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
      <div>
        <div id="content-wrapper">
          <div className="container-fluid">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">List User</li>
            </ol>
            <div className="card mb-3">
              <div className="card-header">
                <i className="fas fa-table" />
                List User
              </div>
              <div className="card-body">
                <div className="btn-align-left">
                  <button type="button" className="btn btn-success" onClick={() => this.registerUser()}>Create User</button>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {
                        this.props.data.accounts.map((data, index) =>
                          <User key={index} account={data}/>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(Users)

