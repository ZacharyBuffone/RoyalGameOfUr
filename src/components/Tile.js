import React from "react";
import flower_img from '../img/flower.svg';
import grey_marker_img from '../img/grey_marker.svg';
import grey_marker_highlighted_img from '../img/grey_marker_highlighted.svg';
import beige_marker_img from '../img/beige_marker.svg';
import beige_marker_highlighted_img from '../img/beige_marker_highlighted.svg';

class Tile extends React.Component {

    handleClick(e) {
        
    }

    render() {
        var button_value = this.props.value;
        if(this.props.type.includes('flower')) {
            button_value = (<img class='tile-decal' src={flower_img} alt='flower' />);
        }
        if(this.props.type.includes('player1')){
            button_value = (<img class='tile-decal' src={grey_marker_img} alt='player1' />);
        }
        if(this.props.type.includes('player2')){
            button_value = (<img class='tile-decal' src={beige_marker_img} alt='player2' />);
        }

        return (
            <button class='tile' onClick={ this.handleClick.bind(this) }>{ button_value }</button>
        );

    }

}

export default Tile;