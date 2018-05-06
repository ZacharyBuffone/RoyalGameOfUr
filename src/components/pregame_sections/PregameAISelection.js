import React from 'react';
import GameStateManager from '../../GameStateManager.js';
//import AIPlayer from '../../AIPlayer.js'

class PregameAISelection extends React.Component {
    constructor() {
        super();

        this.state = {
            difficulty: null
        }
        return;
    }
    
    onDifficultyChange(e) {
        this.setState({
            difficulty: e.currentTarget.value
        })
        return;
    }

    yesButtonClicked() {
        var difficulty;
        this.props.onYesClick(this.state.difficulty);
        return;
    }

    noButtonClicked() {
        this.props.onNoClick();
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
                    <h1>Play with AI?</h1>
                    <br />
                    <p>Work in progress and slightly buggy.</p>
                    <br /><br />
                    <input type="radio" name="difficulty" onChange={this.onDifficultyChange.bind(this)} value="e" checked /> Easy<br /><br/>
                    <input type="radio" name="difficulty" onChange={this.onDifficultyChange.bind(this)} value="m" disabled /> Medium<br /><br/>
                    <input type="radio" name="difficulty" onChange={this.onDifficultyChange.bind(this)} value="x" disabled /> Expert
                </center>
                <div>
                    <button className='pregame-next-button yes-button' onClick={this.yesButtonClicked.bind(this)}>Yes!</button>
                </div>
                <div>
                    <button className='pregame-next-button' onClick={this.noButtonClicked.bind(this)}>No!</button>
                </div>
            </div>
        );

    }
}

export default PregameAISelection;
