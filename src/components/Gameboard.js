import React from "react";
import TileContainer from './TileContainer.js'

class Gameboard extends React.Component{

    render() {
        return (
            <div class='game-board'>
                <TileContainer gameInfoMsgCallback={this.props.gameInfoMsgCallback.bind(this)} />
            </div>
        );

    }
}

export default Gameboard;