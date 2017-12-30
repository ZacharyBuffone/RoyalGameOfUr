import React from "react";
import flower_img from '../img/flower.svg';

class Tile extends React.Component {

    handleClick(e) {
        this.props.gameInfoMsgCallback("" + this.props.value + " button has been pressed.");
    }

    render() {
        var button_value = this.props.value;
        if(this.props.type.includes('flower')) {
            button_value = (<img class='flower' src={flower_img} alt='flower' />);
        }

        return (
            <button class='tile' onClick={ this.handleClick.bind(this) }>{ button_value }</button>
        );

    }

}

export default Tile;