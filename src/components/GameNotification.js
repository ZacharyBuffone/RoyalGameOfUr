import React from 'react';

class GameNotification extends React.Component {

    constructor() {
        super();

        this.notification_element = React.createRef();
        this.state = {
            last_message: null
        }
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
    componentDidUpdate() {
        if(this.props.message !== this.state.last_message) {
            this.setState({
                last_message: this.props.message
            });
            this.notification_element.current.style.animation = 'none';
            this.notification_element.current.offsetHeight;
            this.notification_element.current.style.animation = null; 
        }
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