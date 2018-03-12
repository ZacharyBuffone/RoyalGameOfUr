import React from 'react';
import * as MessageAction from "../actions/MessageAction"

class DiceContainer extends React.Component {

    handleClick(e) {
        var roll = this.rollDice();
        var dice_message = 'You rolled ' + roll[0] + ', ' + roll[1] + ', ' + roll[2] + ', ' + roll[3] + '.';
        MessageAction.addGameInfoMessage(dice_message);

    }
    rollDice() {
        var roll = [0, 0, 0, 0];
        for(var i = 0; i < 4; i++) {
            roll[i] = Math.round(Math.random());
        }

        return roll;
    }

    render() {
        return (
            <div><button onClick={this.handleClick.bind(this)}>Roll Dice.</button></div>
        );
    }

}


export default DiceContainer;