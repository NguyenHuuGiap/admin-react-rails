import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import store from '../../Redux/Store';
import { withRouter } from 'react-router-dom';

export class User extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidUpdate() {
  //   if(!window.sessionStorage.authToken){
  //     return this.props.history.push("/login")
  //   }
  // }

  toSlug = str => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
  }

  destroyUser() {
    let token = 'Bearer ' + window.sessionStorage.authToken
    let url = "http://172.16.1.18:8080/api/v1/accounts/" + this.props.account.id
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
        store.dispatch({ type: 'REMOVE_USER', idAccount: this.props.account.id })
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
      <tr>
        <td><Link to={"/dashboard/user/" + this.toSlug(this.props.account.email) + "." + this.toSlug(this.props.account.id.toString())}>{this.props.account.email}</Link></td>
        <td>{this.props.account.position}</td>
        <td>{this.props.account.office}</td>
        <td>{this.props.account.age}</td>
        <td>{this.props.account.start_date}</td>
        <td>{this.props.account.salary}</td>
        <td><button type="button" className="btn btn-danger" onClick={() => this.destroyUser()}>Remove</button></td>
      </tr>
    )
  }
}

export default withRouter(User);
