import { EventEmitter } from "events";
import dispatcher from "../Dispatcher";

class MessageStore extends EventEmitter {
    constructor() {
        super();

        this.messages = [];

        this.id_count = 0;
        return;
    }

    addMessage(msg) {
        this.messages.push(
            {
                id: this.id_count,
                text: msg
            }
        );
        this.id_count++;
        this.emit("MESSAGE");
        return;
    }

    getAll() {
        return this.messages;
    }

    getLastMessage() {
        return this.messages[this.messages.length - 1];
    }

}

const messageStore = new MessageStore();

dispatcher.register((payload) => {

    switch(payload.type) {
        case "MESSAGE":
            messageStore.addMessage(payload.text);
            break;
        default:
            break;
    }

});

export default messageStore;
