import { EventEmitter } from "events";
import dispatcher from "../Dispatcher";

class GameStateRequestStore extends EventEmitter {
    constructor() {
        super();

        this.requests [{}];
        this.id_count = 0;
        return;
    }

    addRollRequest(request) {
        this.id_count += 1;
        this.requests.push(
            {
                id: this.id_count,
                roll: request.roll
            }
        );
        this.emit("GSR_DICE");
        return;
    }

    addMarkerMoveRequest(request) {
        this.id_count += 1;
        this.requests.push(
            {
                id: this.id_count,
                from: request.from,
                to: request.to,
                player: request.player
            }
        );
        this.emit("GSR_MOVE_MARKER");
        return;
    }

    handleActions(action) {
        switch(action.type) {
            case "GSR_DICE":
                this.addRollRequest(action);
                break;
            case "GSR_MARKER_MOVE":
                this.addMarkerMoveRequest(action);
            default:
                break;
        }

        return;
    }

    getAll() {
        return this.requests;
    }

}

const gameStateRequestStore = new GameStateRequestStore();
window.GameStateRequestStore = gameStateRequestStore;

dispatcher.register(gameStateRequestStore.handleActions.bind(gameStateRequestStore));

export default gameStateRequestStore;
