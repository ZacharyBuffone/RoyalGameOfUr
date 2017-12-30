import React from "react";
import Tile from './Tile.js'
class TileContainer extends React.Component {

    renderTile(value)
    {
        return <Tile value={value} gameInfoMsgCallback={this.props.gameInfoMsgCallback}/>;
    }

    renderBlankTile()
    {
        return <button class='tile-blank'></button>;
    }

    render() {

        return (

            <div class='tile-container'>
                <div>
                    { this.renderTile(4) }
                    { this.renderTile(3) }
                    { this.renderTile(2) }
                    { this.renderTile(1) }
                    { this.renderBlankTile() }
                    { this.renderBlankTile() }
                    { this.renderTile(14) }
                    { this.renderTile(13) }
                </div>
                <div>
                    { this.renderTile(5) }
                    { this.renderTile(6) }
                    { this.renderTile(7) }
                    { this.renderTile(8) }
                    { this.renderTile(9) }
                    { this.renderTile(10) }
                    { this.renderTile(11) }
                    { this.renderTile(12) }
                </div>
                <div>
                    { this.renderTile(18) }
                    { this.renderTile(17) }
                    { this.renderTile(16) }
                    { this.renderTile(15) }
                    { this.renderBlankTile() }
                    { this.renderBlankTile() }
                    { this.renderTile(20) }
                    { this.renderTile(19) }
                </div>
            </div>
        );
    }
}

export default TileContainer;