import { EventEmitter } from "events";
import dispatcher from "../Dispatcher";

class MessageStore extends EventEmitter {
    constructor() {
        super();

        this.messages = [
            {
                id: 0,
                text: "This is a message."
            },
            {
                id: 1,
                text: "This is another message."
            }
        ];

        this.id_count = 1;
        return;
    }

    addMessage(msg) {
        this.id_count += 1;
        this.messages.push(
            {
                id: this.id_count,
                text: msg
            }
        );
        this.emit("MESSAGE");
        return;
    }

    handleActions(action) {
        switch(action.type) {
            case "MESSAGE":
                this.addMessage(action.text);
                break;
            default:
                break;
        }

        return;
    }

    getAll() {
        return this.messages;
    }

}

const messageStore = new MessageStore();
window.MessageStore = messageStore;

dispatcher.register(messageStore.handleActions.bind(messageStore));
window.dispatcher = dispatcher;

export default messageStore;
