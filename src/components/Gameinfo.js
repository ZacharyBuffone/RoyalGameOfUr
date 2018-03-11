import React from "react";

class Gameinfo extends React.Component{
    constructor() {
        super();

        this.state = {
            msg_arr: ["This is an array of strings", "This a string in the array"]
        }
    }

    getMessageString() {
        var buffer = [];

        for (var i = 0; i < this.state.msg_arr.length; i++) {
            buffer.push(<p>{this.state.msg_arr[i]}</p>);
        }

        return buffer;
    }

    render() {
        return (
            <div class='game-info'>{this.getMessageString()}</div>
        );

    }
}

export default Gameinfo;