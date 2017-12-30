import React from "react";

class Tile extends React.Component {

    handleClick(e) {
        this.props.gameInfoMsgCallback("" + this.props.value + " button has been pressed.");
    }

    render() {
        return (
            <button class='tile' onClick={this.handleClick.bind(this)}>{this.props.value}</button>
        );

    }

}

export default Tile;