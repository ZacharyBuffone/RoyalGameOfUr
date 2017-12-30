import React from "react";

class Gameinfo extends React.Component{

    render() {
        return (
            <div class='game-info'><p>{this.props.msg}</p></div>
        );

    }
}

export default Gameinfo;