import dispatcher from "../Dispatcher"

export function commandMarkerPosChange(player, new_pos) {
    dispatcher.dispatch ({
        type: "MARKER_POS_CHANGE",
        player: player,
        pos: new_pos
    });
};

export function commandDiceChange(dice) {
    dispatcher.dispatch ({
        type: "DICE_CHANGE",
        dice: dice
    });
};

export function commandPlayerTurnChange(player) {
    dispatcher.dispatch ({
        type: "PLAYER_TURN_CHANGE",
        player: player
    });
};

export function commandPlayerScoreChange(player_1_score, player_2_score) {
    dispatcher.dispatch ({
        type: "PLAYER_SCORE_CHANGE",
        player_1_score: player_1_score,
        player_2_score: player_2_score
    });
};

export function commandNamePlayers(player_1_name, player_2_name) {
    dispatcher.dispatch ({
        type: "NAME_PLAYERS",
        player_1_name: player_1_name,
        player_2_name: player_2_name
    });
}