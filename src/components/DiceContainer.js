import React from 'react';
import GameStateManager from "../GameStateManager";
class DiceContainer extends React.Component {

    constructor() {
        super();
        
        this.state = {
            current_dice: []
        };
    }

    handleClick(e) {
        GameStateManager.requestRoll();
        
        return;
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>Roll Dice.</button>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

}


export default DiceContainer;