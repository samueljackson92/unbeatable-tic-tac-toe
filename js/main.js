// main.js
// Date: 14/06/13
// Author: Samuel Jackson (samueljackson@outlook.com)
// Description: Setups canvas and handles game-play.

var canvas;
var context;
var mainGrid;

var PLAYER_TURN = -1;
var CELL_WIDTH = 100;
var GAME_OVER = false;

$(document).ready(function() {
	canvas = $('#main-canvas')[0];
 	context = canvas.getContext('2d');
 	mainGrid = new grid(); 

	drawGrid(context);

	$(canvas).click(onMouseClick);
	$('#btn-reset').click(reset);
});

function onMouseClick(evt) {
	if(!GAME_OVER) {
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

			if(!GAME_OVER) {
				doComputerTurn();
			}
		}
	}
}

function doPlayerTurn(x,y) {
	drawCross(context, x,y);

	//check if we've won/drawn yet.
	if(checkWinner()) {
		GAME_OVER = true;
		return;
	}

	switchTurn();
}

function doComputerTurn() {
	//run minimax to find the best move.
	var best = minimax(mainGrid, 0, -999999, 999999, PLAYER_TURN);

	//convert position to Cartesian coordinates
	var x = best % 3;
	var y = (best - x) /3;

	//update grid and draw a nought
	mainGrid.occupyCell(x, y, PLAYER_TURN);
	drawCircle(context,(x*100)+50, (y*100)+50);

	//check if we've won/drawn yet.
	if(checkWinner()){
		GAME_OVER = true;
		return;
	}

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

function reset() {
	GAME_OVER = false;
	PLAYER_TURN = -1;
	mainGrid = new grid();
	context.clearRect(0,0,canvas.width, canvas.height);
	drawGrid(context);
	$('#result').html('');
}
