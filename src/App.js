import React, { Component } from 'react';
import './App.css';
import Routes from './Routes'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{"Dungeons & Dragons Combat Tracking"}</h1>
        </header>
        <Routes />
      </div>
    );
  }
}

export default App;
