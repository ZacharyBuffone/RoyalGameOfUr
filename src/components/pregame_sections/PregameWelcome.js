import React from 'react';
import GameStateManager from '../../GameStateManager.js';

class PregameWelcome extends React.Component {
    
    nextButtonClicked() {
        this.props.onNextClick();
        return;
    }

    muteCallback() {
        GameStateManager.toggleMuteSound();
        return;
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Royal Game of Ur</h1>
                    <div className='header-block'>
                        <p><a href='http://github.com/ZacharyBuffone/RoyalGameOfUr' target='_blank' rel="noopener noreferrer">GitHub</a></p>
                    </div>
                    <div className='header-spacer2'>|</div>
                    <div className='header-block'>
                        <p><a href='#'>How to play</a></p>
                    </div>
                    <div className='header-spacer2'>|</div>
                    <div className='header-block'>
                        <p><a href='#' onClick={this.muteCallback.bind(this)}>Mute</a></p>
                    </div>
                    <h3>This game plays music by default. You can mute it by pressing "Mute" above.</h3>
                </center>
                <div>
                    <button className='pregame-next-button' onClick={this.nextButtonClicked.bind(this)}>Next!</button>
                </div>
            </div>
        );

    }
}

export default PregameWelcome;
