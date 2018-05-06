import React from "react";
import flower_img from '../img/flower.svg';
import grey_marker_img from '../img/grey_marker.svg';
import grey_marker_highlighted_img from '../img/grey_marker_highlighted.svg';
import beige_marker_img from '../img/beige_marker.svg';
import beige_marker_highlighted_img from '../img/beige_marker_highlighted.svg';
import beige_finish from '../img/beige_finish.svg';
import grey_finish from '../img/grey_finish.svg';

class Tile extends React.Component {

    handleClick(e) {
        this.props.tileClickCallback(this.props.value, this.props.type)
    }

    render() {
        var button_class = this.ACTIVE_TILE;
        if(this.props.type.includes('nonactive')) {
            button_class = this.NONACTIVE_TILE;
        }

        var button_value = "";
        if(this.props.type.includes('flower')) {
            button_value = (<img class='tile-decal' src={flower_img} alt='flower' />);
        }
        if(this.props.type.includes('player1')) {
            if(this.props.type.includes('highlighted')) {
                button_value = (<img class='tile-decal' src={grey_marker_highlighted_img} alt='player1' />);
            }
            else {
                button_value = (<img class='tile-decal' src={grey_marker_img} alt='player1' />);
            }
        }
        if(this.props.type.includes('player2')) {
            if(this.props.type.includes('highlighted')) {
                button_value = (<img class='tile-decal' src={beige_marker_highlighted_img} alt='player2' />);
            }
            else {
                button_value = (<img class='tile-decal' src={beige_marker_img} alt='player2' />);
            }
        }
        if(this.props.type.includes('finish1')) {
            button_value = (<img class='tile-decal' src={grey_finish} alt='player1' />);
        }
        else if(this.props.type.includes('finish2')) {
            button_value = (<img class='tile-decal' src={beige_finish} alt='player1' />);
        }

        return (
            <button class={button_class} onClick={ this.handleClick.bind(this) }>{ button_value }</button>
        );

    }

    //constants
    get ACTIVE_TILE() { return 'tile'; }
    get NONACTIVE_TILE() { return 'tile tile-nonactive'; }

}

export default Tile;