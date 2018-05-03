import React from 'react';
import './App.css';
import Gameboard from './components/Gameboard.js';
import Gameinfo from './components/Gameinfo.js';
import Header from './components/Header.js';
class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Gameboard  />
        <Gameinfo />
      </div>
    );
  }
}

export default App;
