//[1]roll dice ->
//[2]move marker -> 
//[3]if marker lands of other player, remove other player marker, unless other player is on tile 8 ->
//[4]if marker finishes, add point to player (must roll 1 on last tile) ->
//[5]if player has 7 points, player wins and exit, else ->
//[6]if marker lands of flower, goto [1], else ->
//[7]goto [1] with other player

import * as MessageAction from "./actions/MessageAction";
import * as GameStateCommandAction from './actions/GameStateCommandAction'
import SoundManager from './SoundManager.js'
import AIPlayer from './AIPlayer.js'
import AIOption from './AIOption.js'

class GameStateManager {
    constructor() {
        //enums
        this.GameStateEnum = Object.freeze({paused:-1, roll:0, move_marker:1});
        this.PlayerEnum = Object.freeze({player1:1, player2:2});

        //constant arrays
        //index specifies route number, element at index specifies tiles's value
        this.Player1Route = Object.freeze([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,22]);
        this.Player2Route = Object.freeze([0,15,16,17,18,5,6,7,8,9,10,11,12,19,20,21]);
        this.FlowerPositions = Object.freeze([4,8,18,14,20]);

        this.game_state = this.GameStateEnum.paused;
        this.whose_turn = this.PlayerEnum.player1;
        this.player1_pos = [0,0,0,0,0,0,0];
        this.player2_pos = [0,0,0,0,0,0,0];
        this.player1_score = 0;
        this.player2_score = 0;
        this.player1_name = 'Player 1';
        this.player2_name = 'Player 2';
        this.last_roll = [];
        this.is_ai_playing = false;
        this.ai_player = null;

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

        //if player rolled zero, pass turn to other players
        if(this.addLastRoll() === 0) {
            MessageAction.addGameInfoMessage("You rolled a zero, which means you cannot do anything!");
            this.changePlayer();
        }
        //else, player can move marker
        else {
            this.game_state = this.GameStateEnum.move_marker;
            GameStateCommandAction.commandDiceChange(this.last_roll);
        }

        if((this.addLastRoll() === 0) && (this.whose_turn == this.PlayerEnum.player2) && (this.is_ai_playing)) {
            this.doAITurn();
        }

        return;
    }

    requestMarkerMove(from, to, player) {

        //wrong player, ignore
        if (player !== this.whose_turn) {
            MessageAction.addGameInfoMessage("It is player " + this.whose_turn + "'s turn.");
            return;
        }
        //game state is not move_marker, ignore
        if (this.game_state !== this.GameStateEnum.move_marker) {
            MessageAction.addGameInfoMessage("You have to roll first.");
            return;
        }

        //can only move marker the amount of last roll, ignore
        if (!this.isRoutingValid(from, to, player)) {
            MessageAction.addGameInfoMessage("You can only move the selected tile the amount you rolled, and on your route. Click \"How to play\" above for more details");
            return;
        }

        //everything reached after this is guaranteed the routing is valid

        //player has reached the finish tile
        if (to === this.PLAYER_1_FINISH_VALUE || to === this.PLAYER_2_FINISH_VALUE) {
            to = -1;
            if(player === 1) {
                this.player1_score++;

            } else {
                this.player2_score++;
            }
            GameStateCommandAction.commandPlayerScoreChange(this.player1_score, this.player2_score);
            MessageAction.addGameInfoMessage("Player " + player + " has scored!");
        }

        //figures out if this move is a attack move
        if ((player === 1 && this.player2_pos.includes(to)) || (player === 2 && this.player1_pos.includes(to))) {
            if (this.FlowerPositions.includes(to)) {
                //the defending player is on a flower, reject move
                MessageAction.addGameInfoMessage("The player you are trying to attack is on a rosette and is invinsible.");
                return;
            }
            //attack is valid, remove defending player marker
            var defendersMarkerPosArr = (player === 1) ? this.player2_pos : this.player1_pos;
            defendersMarkerPosArr[defendersMarkerPosArr.indexOf(to)] = 0;
            GameStateCommandAction.commandMarkerPosChange(this.whose_turn, defendersMarkerPosArr);

        }
        //player has landed on flower, gets another roll and marker is invinsible.
        if (this.FlowerPositions.includes(to)) {
            MessageAction.addGameInfoMessage("You landed on a rosette! You get another roll and that marker is now invinsible.");
        }

        var markerPosArr = (player === 1) ? this.player1_pos : this.player2_pos;
        markerPosArr[markerPosArr.indexOf(from)] = to;
        GameStateCommandAction.commandMarkerPosChange(this.whose_turn, markerPosArr);
        
        this.game_state = this.GameStateEnum.roll;
        if(!this.FlowerPositions.includes(to)) {
            this.changePlayer();
        }

        //tell view objects to show updated game state
        GameStateCommandAction.commandDiceChange([-1,-1,-1,-1]);
        SoundManager.playSound(SoundManager.Sounds.move_marker);
        //win condition has been met
        if(this.player1_score === this.MAX_SCORE || this.player2_score === this.MAX_SCORE) {
            for(var i = 0; i < 4; i++) {
                MessageAction.addGameInfoMessage("Player " + player + " has one!!!!!!!!!!!!!");
            }

        }

        if((this.whose_turn === this.PlayerEnum.player2) && this.is_ai_playing) {
            this.doAITurn();
        }
        
        return;
    }

    toggleMuteSound() {
        SoundManager.toggleMute();
        return;
    }

    displayHowToPlay() {
        return;
    }

    playBackgroundMusic() {
        SoundManager.playSound(SoundManager.Sounds.background_music, true);
        return;
    }

    namePlayers(p_1_name, p_2_name) {
        if(p_1_name !== '') {
            this.player1_name = p_1_name;
        }
        if(p_2_name !== '') {
            this.player2_name = p_2_name;
        }
        GameStateCommandAction.commandNamePlayers(this.player1_name, this.player2_name);
        return;
    }

    firstTurn(player) {
        this.whose_turn = player;
        GameStateCommandAction.commandPlayerTurnChange(player);
        return;
    }

    //decides if the routing of a move is valid
    isRoutingValid(from, to, player) {
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

    playingWithAI() {
        this.is_ai_playing = true;
        this.ai_player = new AIPlayer();
        this.player2_name = "Computer";
    }

    doAITurn() {
        this.requestRoll();
            if(this.requestRoll() !== 0) {
                var option = this.ai_player.go(this.player1_pos, this.player2_pos, this.player1_score, this.player2_score, this.addLastRoll());
                this.requestMarkerMove(option.from, option.to, 2);
            }
        return;
    }

    changePlayer() {
        this.whose_turn = (this.whose_turn) % 2 + 1;
        GameStateCommandAction.commandPlayerTurnChange((this.whose_turn === this.PlayerEnum.player1) ? 1 : 2);
        return;
    }

    start() {
        this.game_state = this.GameStateEnum.roll;
        if(this.whose_turn === this.PlayerEnum.player2 && this.is_ai_playing) {
            this.doAITurn();            
        }
        return;
    }

    //constants
    get PLAYER_1_FINISH_VALUE() { return 22; }
    get PLAYER_2_FINISH_VALUE() { return 21; }
    get MAX_SCORE() { return 7; }

}

const gameStateManager = new GameStateManager();
export default gameStateManager;