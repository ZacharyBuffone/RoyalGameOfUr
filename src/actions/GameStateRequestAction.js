import dispatcher from "../Dispatcher"

export function requestDiceRoll(request) {
    dispatcher.dispatch ({
        type: "GSR_DICE",
        roll: request.roll
    });
};

export function requestMarkerMove(request) {
    dispatcher.dispatch ({
        type: "GSR_MARKER_MOVE",
        from: request.from,
        to: request.to,
        player: request.player
    })

}