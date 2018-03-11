//[1]roll dice ->
//[2]move marker -> 
//[3]if marker lands of other player, remove other player marker, unless other player is on tile 8 ->
//[4]if marker finishes, add point to player (must roll 1 on last tile) ->
//[5]if player has 7 points, player wins and exit, else ->
//[6]if marker lands of flower, goto [1], else ->
//[7]goto 1 with other player

class GameStateManager {
    constructor(moveMarkerCallback, gameInfoMsgCallback, scoreCallback) {
        this.whoseTurn = 1;
        this.lastRoll = null;
        this.isRoll = true;
        this.isMoveMarker = false;
        this.playerOneMarkerPos = [0,0,0,0,0,0,0];
        this.playerOneMarkerPos = [0,0,0,0,0,0,0];
        this.moveMarkerCallback = moveMarkerCallback;
        this.gameInfoMsgCallback = gameInfoMsgCallback;
        this.scoreCallback = scoreCallback;

    }

    moveTile(player, marker, moveTo) {

    }

    recieveRoll(roll) {

    }


}

export default GameStateManager;