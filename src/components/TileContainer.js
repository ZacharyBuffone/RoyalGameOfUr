import React from "react";
import Tile from './Tile.js'
//grey = player1
//beige = player2
class TileContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            //todo: move this to class
            player_1_marker_pos: [0,0,0,0,0,0,0],   //list of marker positions
            player_2_marker_pos: [0,0,0,0,0,0,0],   // ''
            tile_click_chord: [null, null, null]    //marker, player, tile
        };

    }

    tileClickedCallback(target) {
        //target selected, unhighlighted
        if(target.props.selected &&  (target.props.type.includes("player1") || target.props.type.includes("player2"))) {
            this.setState({tile_click_chord: [null, null, null]});
        }
        //target is marker, highlight
        else if(target.props.type.includes("player1") || target.props.type.includes("player2")) {
            var player = this.getPlayerFromTile(target);
            this.setState({tile_click_chord: [target.value, player, null]})
        }
        //target is tile
        if(!(target.props.type.includes("player1") && target.props.type.includes("player2"))){
            this.setState({
                tile_click_chord: [this.state.tile_click_chord[0], this.state.tile_click_chord[1], target.props.value]
            });
        }

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
        if(this.state.player_2_marker_pos.includes(value) && this.state.player_2_marker_pos.includes(value) !== 0) {
            type.push('player2');
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
                buffer.push(<Tile value='0' type={'player'+player} tileClickCallback={this.tileClickedCallback.bind(this)} />);
            }
        }

        return buffer;
    }


    render() {
        
        return (
            <div class='game-board'>
                
                <div class='player-1-nonactive-container'>
                    { this.renderNonactiveTiles(1) }
                </div>

                <div class='tile-container'>
                    <div>
                        { this.renderTile(4, ['flower']) }
                        { this.renderTile(3, []) }
                        { this.renderTile(2, []) }
                        { this.renderTile(1, []) }
                        { this.renderBlankTile() }
                        { this.renderBlankTile() }
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
                        { this.renderBlankTile() }
                        { this.renderTile(20, ['flower']) }
                        { this.renderTile(19, []) }
                    </div>
                </div>

                <div class='player-2-nonactive-container'>
                    { this.renderNonactiveTiles(2) }
                </div>

            </div>
        );
    }
}

export default TileContainer;