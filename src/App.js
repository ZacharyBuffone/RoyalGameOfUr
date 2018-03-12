import React from 'react';
import './App.css';
import Gameboard from './components/Gameboard.js';
import Gameinfo from './components/Gameinfo.js';

class App extends React.Component {
  constructor() {
    super();
    

  }

  gameInfoMsgCallback(msg) {
    this.setState({message: msg});
  }

  render() {
    return (
      <div>
        <Gameboard gameInfoMsgCallback={ this.gameInfoMsgCallback.bind(this) } />
        <Gameinfo />
      </div>
    );
  }
}

export default App;
