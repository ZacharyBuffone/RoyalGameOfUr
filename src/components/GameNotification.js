import React from 'react';

class GameNotification extends React.Component {

    constructor() {
        super();

        this.notification_element = React.createRef();
    }

    componentDidMount() {
        this.notification_element.current.addEventListener("webkitAnimationEnd", this.onAnimationComplete.bind(this), false);
        this.notification_element.current.addEventListener("animationend", this.onAnimationComplete.bind(this), false);
        this.notification_element.current.addEventListener("oanimationend", this.onAnimationComplete.bind(this), false);
        return;
    }

    onAnimationComplete() {
        this.props.onAnimationComplete();
        return;
    }


    render() {
        return (
            <div ref={this.notification_element} className="game-notification">
                <center><h3>{this.props.message}</h3></center>
            </div>
        );
    }
}

export default GameNotification;