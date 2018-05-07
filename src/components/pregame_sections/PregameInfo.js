import React from 'react';
import PregameWelcome from './PregameWelcome.js';
import PregameAISelection from './PregameAISelection.js'
import PregameNameSelection from './PregameNameSelection.js'
import PregameFirstTurnRoll from './PregameFirstTurnRoll.js'
import GameStateManager from '../../GameStateManager.js'

class PregameInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            welcome_is_active: true,
            how_to_play_is_active: false,
            ai_selection_is_active: false,
            name_selection_is_active: false,
            first_turn_roll_is_active: false,
        };
        return;
    }

    onWelcomeNextClick() {
        this.setState({
            welcome_is_active: false,
            ai_selection_is_active: true
        });
        GameStateManager.playBackgroundMusic();
        return;
    }

    onAISelectionYesClick() {
        this.setState({
            ai_selection_is_active: false,
            name_selection_is_active: true,
        });
        GameStateManager.playingWithAI();
        return;
    }

    onAISelectionNoClick() {
        this.setState({
            ai_selection_is_active: false,
            name_selection_is_active: true
        });
        return;
    }

    onNameSelectionNextClick(p_1_name, p_2_name) {
        GameStateManager.namePlayers(p_1_name, p_2_name);
        this.setState({
            name_selection_is_active: false,
            first_turn_roll_is_active: true
        });
        return;
    }

    onFirstTurnRollNextClick(player) {
        GameStateManager.firstTurn(player);
        this.props.onDone();
        return;
    }

    render() {
        return (
                <div className='pregame-window in'>
                    {this.state.welcome_is_active && <PregameWelcome onNextClick={this.onWelcomeNextClick.bind(this)} />}
                    {/*<PregameHowToPlay isActive={this.state.how_to_play_is_active} />*/}
                    {this.state.ai_selection_is_active && <PregameAISelection onYesClick={this.onAISelectionYesClick.bind(this)} onNoClick={this.onAISelectionNoClick.bind(this)} Click={this.onWelcomeNextClick.bind(this)} />}
                    {this.state.name_selection_is_active && <PregameNameSelection onNextClick={this.onNameSelectionNextClick.bind(this)} />}
                    {this.state.first_turn_roll_is_active && <PregameFirstTurnRoll onNextClick={this.onFirstTurnRollNextClick.bind(this)}/>}
                </div>
        );
    }
}

export default PregameInfo;
