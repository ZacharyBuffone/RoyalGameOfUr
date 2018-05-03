import React from 'react';
import beige_marker from '../../img/beige_marker.svg';
import grey_marker  from '../../img/grey_marker.svg';
class PregameNameSelection extends React.Component {
    constructor() {
        super();

        this.player_1_textarea_ref = React.createRef();
        this.player_2_textarea_ref = React.createRef();
    }

    nextButtonClicked() {
        this.props.onNextClick(this.player_1_textarea_ref.current.value, this.player_2_textarea_ref.current.value);
        return;
    }

    render() {
        return(
            <div>
                <center><h1>Enter your names</h1></center>
                <div className='pregame-name-selection-container'>
                    <center>
                    <div className='pregame-name-selection-player-container'>
                        <div className='pregame-name-selection-marker'>
                            <img src={grey_marker} alt='Marker 1'/>
                        </div>
                        <div className='pregame-name-selection-selection'>
                            <h2>Player 1</h2>
                            <input className='pregame-name-selection-textarea' ref={this.player_1_textarea_ref} rows='1' maxlength='20'></input>
                        </div>
                    </div>
                    <div className='pregame-name-selection-spacer'></div>
                    <div className='pregame-name-selection-player-container'>
                        <div className='pregame-name-selection-marker'>
                            <img src={beige_marker} alt='Marker 2'/>
                        </div>
                        <div className='pregame-name-selection-selection'>
                            <h2>Player 2</h2>
                            <input className='pregame-name-selection-textarea' ref={this.player_2_textarea_ref} rows='1' maxlength='20'></input>
                        </div>
                        
                    </div>
                    </center>
                </div>

                <button className='pregame-next-button' onClick={this.nextButtonClicked.bind(this)}>Next!</button>
            </div>
        );
    }

}

export default PregameNameSelection;
