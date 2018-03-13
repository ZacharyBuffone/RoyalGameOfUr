import dispatcher from "../Dispatcher"

export function addGameInfoMessage(msg) {
    dispatcher.dispatch ({
        type: "MESSAGE",
        text: msg
    });

};