import React from "react";
import Tile from './Tile.js'
import GameStateCommandStore from '../stores/GameStateCommandStore'
import  GameStateManager from '../GameStateManager'

//grey = player1
//beige = player2
class TileContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            player_1_marker_pos: [],                 //list of marker positions
            player_2_marker_pos: [],                 // ''
            player_1_score: 0,
            player_2_score: 0,
            tile_click_chord_first: null,            //specifies which tile was clicked first
            tile_click_chord_second: null,           //                tile was clicked second
            tile_click_chord_player: null,           //                player first tile belonged to.
            highlighted_marker: null,                //marker which is highlighted
            whose_turn: 1
            
        };

    }

    componentDidMount() {
        GameStateCommandStore.on("MARKER_POS_CHANGE", 
            this.getLastMarkerPosChangeCommand.bind(this));
        GameStateCommandStore.on("PLAYER_TURN_CHANGE", () => {
            var command = GameStateCommandStore.getLastUndoneCommandOfType("PLAYER_TURN_CHANGE");
            this.setState({
                whose_turn: command.player
            });
            GameStateCommandStore.done(command.id);
        });
        GameStateCommandStore.on("PLAYER_SCORE_CHANGE", () => {
            var command = GameStateCommandStore.getLastUndoneCommandOfType("PLAYER_SCORE_CHANGE");
            this.setState({
                player_1_score: command.player_1_score,
                player_2_score: command.player_2_score
            });
            GameStateCommandStore.done(command.id);
        });

        this.getLastMarkerPosChangeCommand();
        this.getLastMarkerPosChangeCommand();

        return;
    }

    getLastMarkerPosChangeCommand() {
        var command = GameStateCommandStore.getLastUndoneCommandOfType("MARKER_POS_CHANGE");
        if(command.player === GameStateManager.PlayerEnum.player1) {
            this.setState({
                player_1_marker_pos: command.pos
            });  
        }
        else {
            this.setState({
                player_2_marker_pos: command.pos
            });
        }
        GameStateCommandStore.done(command.id);
        return;
    }

    tileClickedCallback(value, type) {
        
        if(type.includes('player1')) {
            this.setState((prevState) => {
                return ({
                    tile_click_chord_first: value,
                    tile_click_chord_player: 1,
                    tile_click_chord_second: null,
                    highlighted_marker: value
                });
            });
        }
        else if(type.includes('player2')) {
            this.setState((prevState) => {
                return ({
                    tile_click_chord_first: value,
                    tile_click_chord_player: 2,
                    tile_click_chord_second: null,
                    highlighted_marker: value
                });
            });
        }
        else {
            GameStateManager.requestMarkerMove(parseInt(this.state.tile_click_chord_first, 10),
                parseInt(value, 10),
                this.state.tile_click_chord_player);
            this.setState((prevState) => {
                return ({
                    tile_click_chord_first: null,
                    tile_click_chord_player:null,
                    tile_click_chord_second: null,
                    highlighted_marker: null
                });
            });
        }

        return;
    }

    getPlayerfromTile(tile) {
        var number = 0;
        for (var type in tile.props.type) {
            if(type === "player1" || type === "player2") {
                number = parseInt(type.substr(6), 10);
                break;
            }
        }
        return number;
    }

    renderTile(value, type) {
        if(this.state.player_1_marker_pos.includes(value) && this.state.player_1_marker_pos.includes(value) !== 0) {
            type.push('player1');
        }
        else if(this.state.player_2_marker_pos.includes(value) && this.state.player_2_marker_pos.includes(value) !== 0) {
            type.push('player2');
        }
        if(this.state.highlighted_marker === value) {
            type.push('highlighted');
        }

        return (<Tile value={value} type={type} tileClickCallback={this.tileClickedCallback.bind(this)} />);
    }

    renderBlankTile() {
        return (<button class='tile-blank'></button>);
    }

    renderNonactiveTiles(player) {
        var buffer = [];
        var marker_list = ((player === 1) ? this.state.player_1_marker_pos : this.state.player_2_marker_pos);

        for(var i = 0; i < 7; i++) {
            if(marker_list[i] === 0) {
                var type = [];
                if(this.state.tile_click_chord_first === 0 && this.state.tile_click_chord_player === player) {
                    type.push('highlighted');
                }
                type.push('player'+player);

                buffer.push(<Tile value='0' type={type} tileClickCallback={this.tileClickedCallback.bind(this)} />);
            }
        }

        return buffer;
    }


    render() {
        return (
            <div class='game-board'>
                
                <div class='player-1-nonactive-container'>
                    <button className='tile'>
                        <p>Player 1</p>
                        {this.state.whose_turn === 1 && (<p>></p>)}
                    </button>
                    { this.renderNonactiveTiles(1) }
                    <button className='tile'>Score: {this.state.player_1_score}</button> 
                </div>

                <div class='tile-container'>
                    <div>
                        { this.renderTile(4, ['flower']) }
                        { this.renderTile(3, []) }
                        { this.renderTile(2, []) }
                        { this.renderTile(1, []) }
                        { this.renderBlankTile() }
                        { this.renderTile(22, ['finish1'])}
                        { this.renderTile(14, ['flower']) }
                        { this.renderTile(13, []) }
                    </div>
                    <div>
                        { this.renderTile(5, []) }
                        { this.renderTile(6, []) }
                        { this.renderTile(7, []) }
                        { this.renderTile(8, ['flower']) }
                        { this.renderTile(9, []) }
                        { this.renderTile(10, []) }
                        { this.renderTile(11, []) }
                        { this.renderTile(12, []) }
                    </div>
                    <div>
                        { this.renderTile(18, ['flower']) }
                        { this.renderTile(17, []) }
                        { this.renderTile(16, []) }
                        { this.renderTile(15, []) }
                        { this.renderBlankTile() }
                        { this.renderTile(21, ['finish2'])}
                        { this.renderTile(20, ['flower']) }
                        { this.renderTile(19, []) }
                    </div>
                </div>

                <div class='player-2-nonactive-container'>
                    <button className='tile'>
                        <p>Player 2</p>
                        {this.state.whose_turn === 2 && (<p>></p>)}
                    </button>
                    { this.renderNonactiveTiles(2) }
                    <button className='tile'>Score: {this.state.player_2_score}</button>
                </div>

            </div>
        );
    }
}

export default TileContainer;