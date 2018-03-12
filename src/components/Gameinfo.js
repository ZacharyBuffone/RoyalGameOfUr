import React from "react";
import MessageStore from "../stores/MessageStore"

class Gameinfo extends React.Component{
    constructor() {
        super();

        this.MAX_MSGS = 6;
        this.state = {
            messages: MessageStore.getAll()
        };
    }

    componentWillMount(){
        MessageStore.on("MESSAGE", () => {

            this.setState(MessageStore.getAll());
        });

        return;
    }

    getMessageString() {
        var buffer = [];

        var end_at = this.clampLower(this.state.messages.length - this.MAX_MSGS, 0);
        //only show the last MAX_MSGS messages.
        for(let i = this.state.messages.length - 1; i >= end_at; i--) {
            buffer.push(<p>{this.state.messages[i].text}</p>);
        }

        return buffer;
    }

    clampLower(num, min) {
        if(num < min)
            return min;
        return num;
    }

    render() {
        return (
            <div class='game-info'>{this.getMessageString()}</div>
        );

    }
}

export default Gameinfo;