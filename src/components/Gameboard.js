import React from "react";
import TileContainer from './TileContainer.js';
import DiceContainer from './DiceContainer.js';

class Gameboard extends React.Component{
    render() {
        return (
            <div >
                <TileContainer />
                <DiceContainer />
            </div>
        );

    }
}

export default Gameboard;