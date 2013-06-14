// draw.js
// Date: 14/06/13
// Author: Samuel Jackson (samueljackson@outlook.com)
// Description: Functions for drawing shapes on to the canvas.

function drawCircle(ctx, x, y) {
	ctx.beginPath();
	ctx.arc(x,y,40,0,2*Math.PI);
	ctx.stroke();
}

function drawCross(ctx, x, y) {
	ctx.beginPath();
	drawLine(ctx, x-40, y-40, x+40, y+40);
	drawLine(ctx, x+40, y-40, x-40, y+40);
}

function drawGrid(ctx) {
	ctx.beginPath();
	//vertical lines
	drawLine(ctx, 100, 0, 100, 300);
	drawLine(ctx, 200, 0, 200, 300);

	//horizontal lines
	drawLine(ctx, 0, 100, 300, 100);
	drawLine(ctx, 0, 200, 300, 200);
}

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}