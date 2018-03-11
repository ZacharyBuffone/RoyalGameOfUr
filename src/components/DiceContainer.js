import React from 'react';

class DiceContainer extends React.Component {

    handleClick(e) {
        var roll = this.rollDice();
        alert('You rolled ' + roll[0] + ', ' + roll[1] + ', ' + roll[2] + ', ' + roll[3] + '.');

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