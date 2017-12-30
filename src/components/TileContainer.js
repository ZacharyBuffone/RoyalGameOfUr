import React from "react";
import Tile from './Tile.js'
class TileContainer extends React.Component {

    renderTile(value, type) {
        return <Tile value={value} type={type} gameInfoMsgCallback={this.props.gameInfoMsgCallback}/>;
    }

    renderBlankTile() {
        return <button class='tile-blank'></button>;
    }

    render() {

        return (

            <div class='tile-container'>
                <div>
                    { this.renderTile(4, ['flower'])}
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
        );
    }
}

export default TileContainer;