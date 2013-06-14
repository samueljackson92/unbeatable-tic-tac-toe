// grid.js
// Date: 14/06/13
// Author: Samuel Jackson (samueljackson@outlook.com)
// Description: JavaScript object to manage the current state of a tic-tac-toe grid.

function grid() {
	this.cells = [0,0,0,0,0,0,0,0,0];

	this.occupyCell = function(x,y,val) {
		var cval = this.cells[y*3+x];
		if (cval === 0) {
			this.cells[y*3+x] = val;
			return true;
		}

		return false;
	};

	this.getCell = function(x,y) {
		return this.cells[y*3+x];
	}

	this.setCell = function(x,y, val) {
		this.cells[y*3+x] = val;
	}

	this.checkForWinner = function() {
		dleft = 0;
		dright = 0;

		for (var i=0;i<3;i++) {
			hsum = 0;
			vsum = 0;

			for(var j=0;j<3;j++) {
				hsum += this.getCell(j,i);
				vsum += this.getCell(i,j);

				if(i == j) {
					dleft += this.getCell(j,i);
					dright += this.getCell(j,2-i);
				}
			}

			if(Math.abs(hsum) >=3 || Math.abs(vsum) >= 3
				|| Math.abs(dleft) >= 3 || Math.abs(dright) >= 3) {
				return true;
			}
		}
		return false;
	}

	this.checkForDraw = function() {
		if(!this.checkForWinner()) {
			for(var i =0;i<3;i++){
				for(var j=0;j<3;j++) {
					if(this.getCell(j,i) === 0) {
						return false;
					}
				}
			}

			return true;
		}

		return false;
	}
}