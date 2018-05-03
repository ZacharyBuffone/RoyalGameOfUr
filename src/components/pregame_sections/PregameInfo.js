import React from 'react';
import PregameWelcome from './PregameWelcome.js';
import PregameNameSelection from './PregameNameSelection.js'
import PregameFirstTurnRoll from './PregameFirstTurnRoll.js'
import GameStateManager from '../../GameStateManager.js'
class PregameInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            welcome_is_active: true,
            how_to_play_is_active: false,
            name_selection_is_active: false,
            first_turn_roll_is_active: false
        };
        return;
    }

    onWelcomeNextClick() {
        this.setState({
            welcome_is_active: false,
            name_selection_is_active: true
        });
    }

    onNameSelectionNextClick(p_1_name, p_2_name) {
        GameStateManager.namePlayers(p_1_name, p_2_name);
        this.setState({
            name_selection_is_active: false,
            first_turn_roll_is_active: true
        });
    }

    onFirstTurnRollNextClick(player) {
        GameStateManager.firstTurn(player);
        this.props.onDone();
    }

    render() {
        return (
                <div  className='pregame-window'>
                    {this.state.welcome_is_active && <PregameWelcome onNextClick={this.onWelcomeNextClick.bind(this)} />}
                    {/*<PregameHowToPlay isActive={this.state.how_to_play_is_active} />*/}
                    {this.state.name_selection_is_active && <PregameNameSelection onNextClick={this.onNameSelectionNextClick.bind(this)} />}
                    {this.state.first_turn_roll_is_active && <PregameFirstTurnRoll onNextClick={this.onFirstTurnRollNextClick.bind(this)}/>}
                </div>
        );
    }
}

export default PregameInfo;
