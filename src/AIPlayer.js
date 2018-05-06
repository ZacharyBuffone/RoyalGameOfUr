import GameStateManager from "./GameStateManager";
import AIOption from "./AIOption";

class AIPlayer {
    constructor(difficulty) {
        this.DifficultyEnum = Object.freeze({Easy:0, Medium:1, Hard:2});
        this.difficulty = this.DifficultyEnum.Easy;
        
    }

    go(player_1_pos, my_pos, player_1_score, my_score, my_roll) {
        var options = this.getTurnOptions(my_pos, player_1_pos, my_roll);
        var best_option = options[0];
        
        for(let i = 1; i < options.length; i++) {
            this.setValueForOption(options[i], player_1_pos);
            if(options[i].value > best_option.value) {
                best_option = options[i];
            }            
        }

        return best_option;

    }

    getTurnOptions(my_pos, player_1_pos, roll) {
        var options = [];
        //get rid of all but one 0 pos
        var working_pos = [];
        if(my_pos.includes(0))
            working_pos.push(0);
        for(let i = 0; i < my_pos.length; i++) {
            if(my_pos[i] !== 0  && my_pos[i] !== -1) {
                working_pos.push(my_pos[i]);
            }
        }

        //figure out what to pos is available for each option
        for(let i = 0; i < working_pos.length; i++) {
            var from_pos = working_pos[i];

            var from_route_index = GameStateManager.Player2Route.indexOf(from_pos);
            var to_route_index = from_route_index + roll;
            var to_pos = GameStateManager.Player2Route[to_route_index];
            //if the pos is after the finish tile, not an option
            if(to_route_index < GameStateManager.Player2Route.length ) {
                if(!(GameStateManager.FlowerPositions.includes(to_pos) && player_1_pos.includes(to_pos))){
                    if(!my_pos.includes(to_pos)) {
                        options.push(new AIOption(from_pos, to_pos));
                    }
                }
            }
        }

        return options;        
    }

    setValueForOption(option, player_1_pos) {
        var value

        if(this.isOptionKill(option, player_1_pos)) {
            value += 3;
        }

        if(this.isOptionNewMarkerOnBoard(option)) {
            value += 0;
        }

        if(this.isOptionStayTwoMarkersInFrontOpponent(option, player_1_pos) && GameStateManager.FlowerPositions.includes(option.from)) {
            value -= 2;
        }

        if(this.isOptionMoveTwoMarkersInFrontOpponent(option, player_1_pos) && GameStateManager.FlowerPositions.includes(option.to)) {
            value -= 2;
        }

        if(this.isOptionFlower(option)) {
            value += 5;
        }

        if(this.isOptionScore(option)) {
            value += 6;
        }

        option.value = value;
        
        return;
    }

    isOptionKill(option, player_1_pos) {
        return (player_1_pos.includes(option.to));
    }
    isOptionNewMarkerOnBoard(option){
        return (option.from === 0);
    }
    isOptionMoveTwoMarkersInFrontOpponent(option, player_1_pos) {
        return (player_1_pos.includes(option.to - 2));
    }
    isOptionStayTwoMarkersInFrontOpponent(option, player_1_pos) {
        return (player_1_pos.includes(option.from - 2));
    }
    isOptionFlower(option) {
        return (GameStateManager.FlowerPositions.includes(option.from))
    }
    isOptionScore(option) {
        return (option.to === GameStateManager.Player2Route[GameStateManager.Player2Route.length - 1]);
    }

}

export default AIPlayer;