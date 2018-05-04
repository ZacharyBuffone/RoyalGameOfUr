import React from "react";
import MessageStore from "../stores/MessageStore"
import GameNotification from "./GameNotification.js"

class Gameinfo extends React.Component{
    constructor() {
        super();

        this.state = {
            message: ""
        };
    }

    componentWillMount(){
        MessageStore.on("MESSAGE", () => {
            this.setState({
                message: MessageStore.getLastMessage()
            });
        });

        return;
    }

    onAnimationComplete() {
        this.setState({
            message: ""
        });
    }

    render() {
        return (
            <div>
                {this.state.message !== "" && <GameNotification onAnimationComplete={this.onAnimationComplete.bind(this)} message={this.state.message.text} />}
            </div>
        );
    }

    get MAX_INT(){
        return 6;
    }
}

export default Gameinfo;