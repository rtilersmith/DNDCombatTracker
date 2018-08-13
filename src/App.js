import React, { Component } from 'react';
import './App.css';
import Landing from './Components/Landing/Landing'
import Login from './Components/Login/Login'
import GMSetUp from './Components/GMSetUp/GMSetUp'
import CombatPage from './Components/CombatPage/CombatPage'
import PlayerSetUp from './Components/PlayerSetUp/PlayerSetUp'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{"Dungeons & Dragons Combat Tracking"}</h1>
        </header>
        <Landing />
        <Login />
        <GMSetUp />
        <CombatPage />
        <PlayerSetUp />
      </div>
    );
  }
}

export default App;
