import React from 'react';
import dice_zero from "../../img/dicezero.svg";
import dice_one from "../../img/diceone.svg";
import roll_dice from '../../img/roll_dice_button.svg';
import RollDiceButton from '../RollDiceButton';

class PregameFirstTurnRoll extends React.Component {
    constructor() {
        super();

        this.state = {
            last_roll: [-1, -1, -1, -1],
            player_1_roll: null,
            player_2_roll: null,
            prompt: "Player 1 is up",
            done: false

        };
        return;
    }
    
    nextButtonClicked() {
        this.props.onNextClick(this.state.player_1_roll > this.state.player_2_roll ? 1 : 2);
        return;
    }

    rollDiceButtonClick() {
        var curr_roll;
        for(let i = 0; i < 4; i++) {
            curr_roll = Math.round(Math.random());
            const last_roll = this.state.last_roll;
            last_roll[i] = curr_roll;

            this.setState({
                last_roll,
            });
        }
        var roll = 0;
        for(var i = 0; i < 3; i++) {
            roll += this.state.last_roll[i];
        }
        if(this.state.player_1_roll === null) {
            this.setState({
                player_1_roll: roll,
                prompt: "Player 2 is next"
            })
        } else {
            if((this.state.player_1_roll === roll)) {
                this.setState({
                    last_roll: [-1, -1, -1, -1],
                    player_1_roll: null,
                    player_2_roll: null,
                    prompt: "It was a tie! Player 1 rolls again."
                })
            } else{
                var player_who_won = (this.state.player_1_roll > roll ? 1 : 2);
                var new_prompt = "Player " + player_who_won + " has first turn!";
                this.setState({
                    player_2_roll: roll,
                    prompt: new_prompt,
                    done: true
                });
            }
        }

        return;
    }

    getDiceImage(index) {
        var img = dice_zero;
        if(this.state.last_roll[index] === 1) {
            img = dice_one;
        }

        return (<img className='dice-decal' src={img} alt={this.state.last_roll[index]} />);
    }

    

    render() {
        return (
            <div>
                <center>
                    <h1>Roll for first turn</h1>
                    <h2>Player with the highest roll gets first turn!</h2>
                    <h2>{this.state.prompt}</h2>
                <div>
                    {!this.state.done &&
                        <RollDiceButton onClick={this.rollDiceButtonClick.bind(this)} />
                    }
                    { this.state.last_roll[0] !== -1 &&
                        <div className='roll-dice-container'>
                            <div className='dice'>{this.getDiceImage(0)}</div>
                            <div className='dice'>{this.getDiceImage(1)}</div>
                            <div className='dice'>{this.getDiceImage(2)}</div>
                            <div className='dice'>{this.getDiceImage(3)}</div>
                        </div>
                    }
                </div>
                </center>
                <div>
                    {this.state.done && <button className='pregame-next-button' onClick={this.nextButtonClicked.bind(this)}>Play!</button>}
                </div>
            </div>
        );

    }
}

export default PregameFirstTurnRoll;
