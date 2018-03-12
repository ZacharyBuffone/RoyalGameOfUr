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
        MessageStore.on("change", () => {

            this.setState(MessageStore.getAll());
        });

        return;
    }

    getMessageString() {
        var buffer = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            buffer.push(<p>{this.state.messages[i].text}</p>);
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