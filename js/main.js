var canvas;
var context;
var PLAYER_TURN = -1;
var CELL_WIDTH = 100;
var mainGrid;

$(document).ready(function() {
	canvas = $('#main-canvas')[0];
 	context = canvas.getContext('2d');
 	mainGrid = new grid(); 

	drawGrid(context);

	$(canvas).click(onMouseClick);
});

function onMouseClick(evt) {
	var x = evt.pageX - canvas.offsetLeft;
	var y = evt.pageY - canvas.offsetTop;

	x = x - (x%CELL_WIDTH) + CELL_WIDTH/2;
	y = y - (y%CELL_WIDTH) + CELL_WIDTH/2;

	//get cell index value.
	cell_x = (x - CELL_WIDTH/2)/100;
	cell_y = (y - CELL_WIDTH/2)/100;

	var validCell = mainGrid.occupyCell(cell_x,cell_y, PLAYER_TURN);
	if(validCell) {
		doPlayerTurn(x,y);
		doComputerTurn();
	}
}

function doPlayerTurn(x,y) {

	drawCross(context, x,y);
	if(checkWinner()) return;
	switchTurn();
}

function doComputerTurn() {
	var best = minimax(mainGrid, 0, PLAYER_TURN);

	var x = best % 3;
	var y = (best - x) /3;

	mainGrid.occupyCell(x, y, PLAYER_TURN);
	drawCircle(context,(x*100)+50, (y*100)+50);

	if(checkWinner()) return;
	switchTurn();
}

function checkWinner() {
	var winbox = $('#result');
	if(mainGrid.checkForWinner()) {
		if(PLAYER_TURN === 1) {
			winbox.html("<h3>Nought Wins!</h3>");
		} else if (PLAYER_TURN === -1){
			winbox.html("<h3>Cross Wins!</h3>");
		}
		return true;
	} else if(mainGrid.checkForDraw()) {
		winbox.html("<h3>Draw!</h3>");
		return true;
	}

	return false;
}

function switchTurn() {
	PLAYER_TURN *= -1;
}
