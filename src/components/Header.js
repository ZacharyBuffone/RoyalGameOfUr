import React from 'react';
import GameStateManager from '../GameStateManager';
class Header extends React.Component {
    constructor() {
        super();

        
    }

    howToPlayCallback(e) {
        GameStateManager.displayHowToPlay();
        return;
    }

    muteCallback(e) {
        GameStateManager.toggleMuteSound();
        return;
    }

    render() {
        return (
            <div className='header'>
                <div className='header-block'>
                    <h1>The Royal Game of Ur</h1>
                </div>
                <div className='header-spacer'></div>
                <div className='header-block'>
                    <p>by Zachary Buffone</p>
                </div>
                <div className='header-spacer2'>|</div>
                <div className='header-block'>
                    <p><a href='http://github.com/ZacharyBuffone/RoyalGameOfUr' target='_blank' rel="noopener noreferrer">GitHub</a></p>
                </div>
                <div className='header-spacer2'>|</div>
                <div className='header-block'>
                    <p><a href='#' onClick={this.howToPlayCallback.bind(this)}>How to play</a></p>
                </div>
                <div className='header-spacer2'>|</div>
                <div className='header-block'>
                    <p><a href='#' onClick={this.muteCallback.bind(this)}>Mute</a></p>
                </div>
            </div>
        );
    }
}

export default Header;