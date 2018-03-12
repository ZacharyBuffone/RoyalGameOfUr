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
        MessageStore.on("change", () => {

            this.setState(MessageStore.getAll());
        });

        return;
    }

    getMessageString() {
        var buffer = [];

        var num_shown = 0;
        var i = this.state.messages.length - 1;
        //only show the last MAX_MSGS messages.
        while(num_shown < this.MAX_MSGS && i >= 0) {
            buffer.push(<p>{this.state.messages[i].text}</p>);
            num_shown++;
            i--;
        }

        return buffer;
    }

    clamp(num, min, max) {
        if(num < min)
            return min;
        else if(num > max)
            return max;
        else
            return num;
    }

    render() {
        return (
            <div class='game-info'>{this.getMessageString()}</div>
        );

    }
}

export default Gameinfo;