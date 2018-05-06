
import React from 'react';

class PregameHowToPlay extends React.Component {

    render() {
        return (
            <div>
                <center>
                    <h1>How to play</h1>
                </center>
                <div>
                    <button className='pregame-next-button' onClick={this.noButtonClicked.bind(this)}>I'm an expert now!</button>
                </div>
            </div>
        );

    }
}

export default PregameAISelection;
