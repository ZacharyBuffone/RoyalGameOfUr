//[1]roll dice ->
//[2]move marker -> 
//[3]if marker lands of other player, remove other player marker, unless other player is on tile 8 ->
//[4]if marker finishes, add point to player (must roll 1 on last tile) ->
//[5]if player has 7 points, player wins and exit, else ->
//[6]if marker lands of flower, goto [1], else ->
//[7]goto [1] with other player
import * as MessageAction from "./actions/MessageAction";

var GameStateEnum = Object.freeze({roll:1, move_marker:2})
var PlayerEnum = Object.freeze({player1:1, player2:2})

class GameStateManager {
    constructor() {
        this.game_state = GameStateEnum.roll;
        this.whose_turn = PlayerEnum.player1;
        this.player1_pos = [0,0,0,0,0,0,0];
        this.player2_pos = [0,0,0,0,0,0,0];
        this.last_roll = [];
        
        return;
    }

    requestRoll() {
        //if game_state is NOT roll, message and do nothing.
        if(this.game_state !== GameStateEnum.roll)
        {
            MessageAction.addGameInfoMessage("You can not roll the dice right now.");
            return;
        }

        //else, generate roll, advance game_state, and message
        var num;
        for(let i = 0; i < 4; i++) {
            this.last_roll[i] = Math.round(Math.random());
        }

        this.game_state = GameStateEnum.move_marker;

        MessageAction.addGameInfoMessage("You rolled: " + this.last_roll.toString());
        return;
    }

    requestMarkerMove(request) {
        
    }
}

const gameStateManager = new GameStateManager();
export default gameStateManager;