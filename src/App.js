import React from 'react';
import './App.css';
import Gameboard from './components/Gameboard.js';
import Gameinfo from './components/Gameinfo.js';
import Header from './components/Header.js';
import PregameInfo from './components/pregame_sections/PregameInfo.js';

class App extends React.Component {
	constructor(){
		super();

		this.state = {
			pregame_info_is_active: true,
			header_element: <Header />,
			gameboard_element: <Gameboard  />,
			gameinfo_element: <Gameinfo />
		};
		return;
	}

	onPregameInfoDone() {
		this.setState({
			pregame_info_is_active: false
		})
	}

	render() {
		return (
			<div>
				{this.state.pregame_info_is_active && <PregameInfo onDone={this.onPregameInfoDone.bind(this)} />}
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
