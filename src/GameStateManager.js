//[1]roll dice ->
//[2]move marker -> 
//[3]if marker lands of other player, remove other player marker, unless other player is on tile 8 ->
//[4]if marker finishes, add point to player (must roll 1 on last tile) ->
//[5]if player has 7 points, player wins and exit, else ->
//[6]if marker lands of flower, goto [1], else ->
//[7]goto [1] with other player

import * as MessageAction from "./actions/MessageAction";
import * as GameStateCommandAction from './actions/GameStateCommandAction'

class GameStateManager {
    constructor() {
        this.GameStateEnum = Object.freeze({roll:1, move_marker:2});
        this.PlayerEnum = Object.freeze({player1:1, player2:2});
        //index specifies route number, element at index specifies tiles's value
        this.Player1Route = Object.freeze([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
        this.Player2Route = Object.freeze([0,15,16,17,18,5,6,7,8,9,10,11,12,19,20]);

        this.game_state = this.GameStateEnum.roll;
        this.whose_turn = this.PlayerEnum.player1;
        this.player1_pos = [0,0,0,0,0,0,0];
        this.player2_pos = [0,0,0,0,0,0,0];
        this.player1_score = 0;
        this.player2_score = 0;
        this.last_roll = [];

        GameStateCommandAction.commandMarkerPosChange(this.PlayerEnum.player1, this.player1_pos);
        GameStateCommandAction.commandMarkerPosChange(this.PlayerEnum.player2, this.player2_pos);
        return;
    }

    requestRoll() {
        //if game_state is NOT roll, message and do nothing.
        if(this.game_state !== this.GameStateEnum.roll)
        {
            MessageAction.addGameInfoMessage("You can not roll the dice right now.");
            return;
        }

        //else, generate roll, advance game_state, and message
        for(let i = 0; i < 4; i++) {
            this.last_roll[i] = Math.round(Math.random());
        }

        MessageAction.addGameInfoMessage("You rolled: " + this.last_roll.toString() + " (" + this.addLastRoll() + ")");
        //if player rolled zero, pass turn to other players
        if(this.addLastRoll() === 0) {
            MessageAction.addGameInfoMessage("You rolled a zero, which means you cannot do anything!");
            this.whose_turn = (this.whose_turn) % 2 + 1;
        }
        //else, player can move marker
        else {
            this.game_state = this.GameStateEnum.move_marker;
            GameStateCommandAction.commandDiceChange(this.last_roll);
        }
        return;
    }

    requestMarkerMove(from, to, player) {
        //game state is not move_marker, ignore
        if(this.game_state !== this.GameStateEnum.move_marker) {
            MessageAction.addGameInfoMessage("You have to roll first.");
            return;
        }
        //wrong player, ignore
        if(player !== this.whose_turn) {
            MessageAction.addGameInfoMessage("It is player " + this.whose_turn + "'s turn.");
            return;
        }
        //can only move marker the amount of last roll, ignore
        if(!this.isValidMove(from, to, player)) {
            MessageAction.addGameInfoMessage("You can only move the selected tile the amount you rolled, and on your route.\n(Click \"show route\" for details on each players route.)");
            return;
        }
        //valid move, modify marker pos, move marker command, advance game_state
        
        var markerPosArr = (player === 1) ? this.player1_pos : this.player2_pos;
        markerPosArr[markerPosArr.indexOf(from)] = to;

        this.game_state = this.GameStateEnum.roll;
        this.whose_turn = (this.whose_turn) % 2 + 1;

        //tell view objects to show updated game state
        GameStateCommandAction.commandMarkerPosChange(this.whose_turn, markerPosArr);
        GameStateCommandAction.commandPlayerTurnChange(player % 2 + 1);
        GameStateCommandAction.commandDiceChange([-1,-1,-1,-1]);
        
        return;
    }

    //decides if the move is valid
    isValidMove(from, to, player) {
        var isValid = false
        var roll = this.addLastRoll()
        var route = (player === this.PlayerEnum.player1) ? this.Player1Route : this.Player2Route;
        if(route.indexOf(to) - route.indexOf(from) === roll) {
            isValid = true;
        }

        return isValid;        
    }

    addLastRoll() {
        return this.last_roll[0] + this.last_roll[1] + this.last_roll[2] + this.last_roll[3];
    }

}

const gameStateManager = new GameStateManager();
export default gameStateManager;