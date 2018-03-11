import React from "react";
import TileContainer from './TileContainer.js';
import DiceContainer from './DiceContainer.js';
import GameStateManager from "./GameStateManager";

class Gameboard extends React.Component{
    constructor() {
        super();

        this.state = { 
        }
    }

    moveMarker() {

    }

    moveMarkerCallback(markerToMove) {

    }

    rollCallback(roll) {
        this.game_state_manager.recieveRoll(roll);
    }

    render() {
        return (
            <div >
                <TileContainer moveMarker={this.state.markerToMove} />
                <DiceContainer />
            </div>
        );

    }
}

export default Gameboard;