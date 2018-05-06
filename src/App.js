import React from 'react';
import './App.css';
import Gameboard from './components/Gameboard.js';
import Gameinfo from './components/Gameinfo.js';
import Header from './components/Header.js';
import PregameInfo from './components/pregame_sections/PregameInfo.js';
import GameStateManager from './GameStateManager.js';

class App extends React.Component {
	constructor(){
		super();

		this.state = {
			pregame_info_is_active: true,
			how_to_play_active: false,

		};
		return;
	}

	onPregameInfoDone() {
		this.setState({
			pregame_info_is_active: false
		})
		GameStateManager.start();
	}

	render() {
		return (
			<div>
				{this.state.pregame_info_is_active && <PregameInfo showHowToPlay={this.state.how_to_play_active} onDone={this.onPregameInfoDone.bind(this)} />}
				<div className={this.state.pregame_info_is_active ? 'screen-blur' : ''}>
					<Header />
					<Gameboard />
					<Gameinfo />
				</div>

			</div>
		);
	}


}

export default App;
