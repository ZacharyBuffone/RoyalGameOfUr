import React from 'react';
import * as MessageAction from "../actions/MessageAction";
import GameStateManager from "../GameStateManager";
class DiceContainer extends React.Component {

    handleClick(e) {
        GameStateManager.requestRoll();
        return;
    }

    render() {
        return (
            <div><button onClick={this.handleClick.bind(this)}>Roll Dice.</button></div>
        );
    }

}


export default DiceContainer;