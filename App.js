import React, { Component } from 'react';
import './styles/index.scss';
import Weather from "./components/weather";
class App extends Component {

  render(){
    return (
      <React.Fragment>
        <h1><Weather/></h1>
      </React.Fragment>
    )
  }
}

export default App;