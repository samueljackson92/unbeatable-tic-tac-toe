// minimax.js
// Date: 14/06/13
// Author: Samuel Jackson (samueljackson@outlook.com)
// Description: Implementation of the minimax algorithm to create an unbeatable game of tic-tac-toe.

//Use a very extreme value for infinity
var INFINITY = 999999;

//Recursively analyses states until end states are met
//Bubble back up picking the best move for that iteration's player
function minimax(state, depth, alpha, beta, pturn) {

	//Check for terminal state
	if(state.checkForWinner()) {
		return -pturn;
	} else if(state.checkForDraw()) {
		return 0;
	}

	var children = getChildren(state);
	var bestMove = 0;

	for (var i =0; i<children.length;i++) {

		//examine all valid child states
		state.cells[children[i]] = pturn;
		var score = minimax(state, depth+1, alpha, beta, -pturn);
		state.cells[children[i]] = 0;

		if(pturn > 0) {
			//we are maximizing
			if(score > alpha) {
				alpha = score;
				bestMove = children[i];
			}

		} else if (pturn < 0) {
			//we are minimizing
			beta = Math.min(beta, score);
		}

		if(beta <= alpha) {
			break;
		}
	}


	//return best move if we're at the top level
	if(depth === 0) {
		return bestMove;
	} else {
		//else return the best score
		if(pturn > 0 ) {
			return alpha;
		} else if (pturn < 0) {
			return beta;
		}
	}
}

//Get all possible child states from the current state.
function getChildren(state) {
	var children = [];

	for(var i=0;i<3;i++) {
		for(var j=0;j<3;j++){
			if(state.getCell(j,i) === 0) {
				children.push(i*3+j);
			}
		}
	}

	return children;
}