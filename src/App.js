import React from 'react';
import './App.css';
import Gameboard from './components/Gameboard.js';
import Gameinfo from './components/Gameinfo.js';

class App extends React.Component {

  render() {
    return (
      <div>
        <Gameboard  />
        <Gameinfo />
      </div>
    );
  }
}


export default App;
