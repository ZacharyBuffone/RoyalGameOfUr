import { EventEmitter } from 'events'
import Dispatcher from '../Dispatcher.js'

class GameStateCommandStore extends EventEmitter {
    constructor() {
        super();

        this.commands = [];
        this.id_count = 0;
    }

    addMarkerPosChangeCommand(command) {
        this.id_count++;
        this.commands.push({
            type: command.type,
            id: this.id_count,
            player: command.player,
            pos: command.pos,
            done: false
        });

        this.emit("MARKER_POS_CHANGE");
        return;
    }

    addDiceChangeCommand(command) {
        this.id_count++;
        this.commands.push({
            type: command.type,
            id: this.id_count,
            dice: command.dice,
            done: false
        });

        this.emit("DICE_CHANGE");
        return;
    }

    getLastCommand(){
        return this.commands[this.commands.length-1];
    }

    getLastUndoneCommandOfType(type) {
        var command;
        //iterates though commands arr backwards until first
        //command of arg type is found
        for(var i = this.commands.length - 1; i >= 0; i--)  {
            command = this.commands[i];
            if(command.type === type && !command.done) {
                return command;
            }
        }
        
        return null;
    }

    //when a command has been fulfilled, this func must be called to mark it as done
    done(id) {
        var command;
        for(var i = this.commands.length - 1; i >= 0; i--) {
            command = this.commands[i];
            if(command.id === id) {
                this.commands[i].done = true;
            }
        }

        return;
    }

}

const gameStateCommandStore = new GameStateCommandStore();

Dispatcher.register((payload) => {
    switch(payload.type) {
        case "MARKER_POS_CHANGE":
            gameStateCommandStore.addMarkerPosChangeCommand(payload);
            break;
        case "DICE_CHANGE":
            gameStateCommandStore.addDiceChangeCommand(payload);
            break;
        default:
            break;
    }

})

export default gameStateCommandStore;