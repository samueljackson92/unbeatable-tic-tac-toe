function node() {
	this.data = null;
	this.children = [];
	this.player = 0;
	this.xChanged = -1;
	this.yChanged = -1;
}

function graph() {
	this.root = null;

	//entry point into 
	this.buildGraph = function(grid, pturn) {
		count = 0;
		this.root = new node();
		this.root.data = grid;
		this.root.player = pturn;

		makeGraph(this.root, pturn);
		console.log(count);
	}
}


function makeGraph(current, pturn) {
	pturn *=-1;

	if(!current.data.checkForWinner()) {
		for(var i=0;i<3;i++) {
			for(var j=0;j<3;j++){
				if(current.data.getCell(j,i) === 0) {
					var g = new grid();
					g.cells = current.data.cells.slice(0);
					g.setCell(j,i, pturn);

					var child = new node();
					child.data = g;
					child.player = pturn;
					child.xChanged = j;
					child.yChanged = i;
					current.children.push(child);
				}
			}
		}

		count+=current.children.length;
		for(var i=0;i<current.children.length;i++){
			makeGraph(current.children[i], pturn);
		}
	}
}

function negamax(state, depth) {
	if(state.children.length === 0) {
		//win closer to root is better
		return (999999-depth)*state.player;
	}

	var bestScore = -999999;
	var bestMove = 0;
	for (var i =0; i<state.children.length;i++) {
		var score = -negamax(state.children[i], depth+1);
		if(score > bestScore) {
			bestScore = score;
			bestMove = i;
		}
	}

	if(depth === 0) {
		return state.children[bestMove];
	} else {
		return bestScore;
	}
}

//get a list of indices's that are legal moves from this state
function getChildren(state) {
	var children = [];

	for(var i=0;i<3;i++) {
		for(var j=0;j<3;j++){
			if(state.getCell(j,i) === 0) {
				children.push(i*3+j)
			}
		}
	}

	return children;
}