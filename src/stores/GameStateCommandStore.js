import { EventEmitter } from 'events'
import Dispatcher from '../Dispatcher.js'

class GameStateCommandStore extends EventEmitter {
    constructor() {
        super();

        this.commands = [];
        this.id_count = 0;
    }

    addMarkerPosChangeCommand(command) {
        this.id_count += 1;
        this.commands.push({
            type: command.type,
            id: this.id_count,
            player: command.player,
            pos: command.pos

        });

        this.emit("GSC_MARKER_POS_CHANGE");
        return;
    }

    getLastCommand(){
        return this.commands[this.commands.length-1];
    }

}

const gameStateCommandStore = new GameStateCommandStore();

Dispatcher.register((payload) => {
    switch(payload.type) {
        case "GSC_MARKER_POS_CHANGE":
            gameStateCommandStore.addMarkerPosChangeCommand(payload);
            break;
        default:
            break;
    }

})

export default gameStateCommandStore;