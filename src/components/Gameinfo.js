import React from "react";
import MessageStore from "../stores/MessageStore"

class Gameinfo extends React.Component{
    constructor() {
        super();

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
        if(this.state.messages.length > 0) {
            buffer.push(<p>{"=> " + this.state.messages[this.state.messages.length - 1].text}</p>);
        }
        for(let i = this.state.messages.length - 2; i >= 0; i--) {
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

    get MAX_INT(){
        return 6;
    }
}

export default Gameinfo;