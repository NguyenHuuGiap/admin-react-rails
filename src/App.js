import React, { Component } from 'react';
import './App.css';
import './css/sb-admin.css';
import './vendor/fontawesome-free/css/all.min.css';
import './vendor/datatables/dataTables.bootstrap4.css';
import RouterLink from './Router/RouterLink';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterLink data={this.props.data} env_url={"http://172.16.1.18:8080"}/>
      </div>
    );
  }
}

export default App;

