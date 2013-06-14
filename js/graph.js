
var INFINITY = 999999;

function minimax(state, depth, pturn) {
	if(state.checkForWinner()) {
		return -pturn;
	} else if(state.checkForDraw()) {
		return 0;
	}

	var children = getChildren(state);

	var alpha = -INFINITY*pturn;
	var bestMove = 0;

	for (var i =0; i<children.length;i++) {

		state.cells[children[i]] = pturn;
		var score = minimax(state, depth+1, -pturn);
		state.cells[children[i]] = 0;

		if(pturn > 0) {
			//we are maximizing
			if(score > alpha) {
				alpha = score;
				bestMove = children[i];
			}
		} else if (pturn < 0) {
			//we are minimizing
			alpha = Math.min(alpha, score);
		}
	}


	if(depth === 0) {
		return bestMove;
	} else {
		return alpha;
	}
}

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