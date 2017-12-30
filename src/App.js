import React from 'react';
import './App.css';
import Gameboard from './components/Gameboard.js';
import Gameinfo from './components/Gameinfo.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: null
    }

  }

  gameInfoMsgCallback(msg) {
    this.setState({message: msg});
  }

  render() {
    return (
      <div>
        <Gameboard gameInfoMsgCallback={ this.gameInfoMsgCallback.bind(this) } />
        <Gameinfo msg={ this.state.message } />
      </div>
    );
  }
}

export default App;
