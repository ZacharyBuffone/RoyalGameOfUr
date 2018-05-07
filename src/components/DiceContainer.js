import React from 'react';
import GameStateManager from "../GameStateManager";
import GameStateCommandStore from "../stores/GameStateCommandStore";
import RollDiceButton from "./RollDiceButton.js"
import dice_zero from "../img/dicezero.svg";
import dice_one from "../img/diceone.svg";

class DiceContainer extends React.Component {

    constructor() {
        super();
        
        this.state = {
            current_dice: [-1, -1, -1, -1],
        }; 
    }

    componentDidMount() {
        GameStateCommandStore.on("DICE_CHANGE", () => {
            var command = GameStateCommandStore.getLastUndoneCommandOfType("DICE_CHANGE");
            this.setState({
                current_dice: command.dice
            });
            GameStateCommandStore.done(command.id);
        });
        return;
    }

    handleClick(e) {
        GameStateManager.requestRoll();
        return;
    }

    getDiceImage(index) {
        var img = dice_zero;
        if(this.state.current_dice[index] === 1) {
            img = dice_one;
        }

        return (<img className='dice-decal' src={img} alt={this.state.current_dice[index]} />);

    }


    render() {
        return (
            <div className='dice-info'>
                <RollDiceButton onClick={this.handleClick.bind(this)} />
                { this.state.current_dice[0] !== -1 &&
                    <div className='dice-container'>
                        <div className='dice'>{this.getDiceImage(0)}</div>
                        <div className='dice'>{this.getDiceImage(1)}</div>
                        <div className='dice'>{this.getDiceImage(2)}</div>
                        <div className='dice'>{this.getDiceImage(3)}</div>
                    </div>
                }
            </div>
        );
    }

}


export default DiceContainer;