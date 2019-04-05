import React, { Component, Fragment } from 'react'
import Nav from './Nav/Nav';
import Body from './Body/Body';
import Logout from './Body/Logout';
import { connect } from 'react-redux'

export class Main extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    if(!window.sessionStorage.authToken){
      return this.props.history.push("/login")
    }
  }

  render() {
    return (
      <Fragment>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content />
        <meta name="author" content />
        <title>SB Admin - Dashboard</title>
        <Nav env_url={this.props.env_url}/>
        <Body env_url={this.props.env_url} />
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        <Logout env_url={this.props.env_url} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {  
  return {
    data: state
  }
}

export default connect(mapStateToProps)(Main);  
