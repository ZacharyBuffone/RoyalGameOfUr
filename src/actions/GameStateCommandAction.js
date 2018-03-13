import dispatcher from "../Dispatcher"

export function commandMarkerPosChange(player, new_pos) {
    dispatcher.dispatch ({
        type: "GSC_MARKER_POS_CHANGE",
        player: player,
        pos: new_pos
        
    });

};