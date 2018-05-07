import React from 'react'
import roll_dice from '../img/roll_dice_button.svg';
import roll_dice_hover from '../img/roll_dice_button_hover.svg';

class RollDiceButton extends React.Component {

    constructor() {
        super();

        this.state = {
            roll_button_hover: false
        };
    }

    
    onHover() {
        this.setState({
            roll_button_hover: true
        });
        return;
    }

    onLeave() {
        this.setState({
            roll_button_hover: false
        });
        return;
    }

    render() {
        return (
            <button className='roll-dice-button' onClick={this.props.onClick} onMouseEnter={this.onHover.bind(this)} onMouseOut={this.onLeave.bind(this)}>
                <img src={this.state.roll_button_hover ? roll_dice_hover : roll_dice} />
            </button>
        );
    }
}

export default RollDiceButton;