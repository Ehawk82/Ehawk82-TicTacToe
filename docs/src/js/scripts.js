var myUI,player = "X",winStatus = false,cellCount = 9;


myUI = {
	r1x: function(tds){ return tds[0].innerHTML === "X" && tds[1].innerHTML === "X" && tds[2].innerHTML === "X" },
	r2x: function(tds){ return tds[3].innerHTML === "X" && tds[4].innerHTML === "X" && tds[5].innerHTML === "X" },
	r3x: function(tds){ return tds[6].innerHTML === "X" && tds[7].innerHTML === "X" && tds[8].innerHTML === "X" },
	c1x: function(tds){ return tds[0].innerHTML === "X" && tds[3].innerHTML === "X" && tds[6].innerHTML === "X" },
	c2x: function(tds){ return tds[1].innerHTML === "X" && tds[4].innerHTML === "X" && tds[7].innerHTML === "X" },
	c3x: function(tds){ return tds[2].innerHTML === "X" && tds[5].innerHTML === "X" && tds[8].innerHTML === "X" },
	d1x: function(tds){ return tds[2].innerHTML === "X" && tds[4].innerHTML === "X" && tds[6].innerHTML === "X" },
	d2x: function(tds){ return tds[0].innerHTML === "X" && tds[4].innerHTML === "X" && tds[8].innerHTML === "X" },
	r1o: function(tds){ return tds[0].innerHTML === "O" && tds[1].innerHTML === "O" && tds[2].innerHTML === "O" },
	r2o: function(tds){ return tds[3].innerHTML === "O" && tds[4].innerHTML === "O" && tds[5].innerHTML === "O" },
	r3o: function(tds){ return tds[6].innerHTML === "O" && tds[7].innerHTML === "O" && tds[8].innerHTML === "O" },
	c1o: function(tds){ return tds[0].innerHTML === "O" && tds[3].innerHTML === "O" && tds[6].innerHTML === "O" },
	c2o: function(tds){ return tds[1].innerHTML === "O" && tds[4].innerHTML === "O" && tds[7].innerHTML === "O" },
	c3o: function(tds){ return tds[2].innerHTML === "O" && tds[5].innerHTML === "O" && tds[8].innerHTML === "O" },
	d1o: function(tds){ return tds[2].innerHTML === "O" && tds[4].innerHTML === "O" && tds[6].innerHTML === "O" },
	d2o: function(tds){ return tds[0].innerHTML === "O" && tds[4].innerHTML === "O" && tds[8].innerHTML === "O" },
	init: function(){
		setTimeout(function(){myUI.loadout()},1); 
	},
	creEle: function(x) {return document.createElement(x) },
	bySelAll: function(x) {return document.querySelectorAll(x) },
	loadout: function(){
		var table = myUI.creEle("table"), playerLabel;

		playerLabel = myUI.creEle("div");
		playerLabel.innerHTML = player + " turn";

		for (var r = 0; r < 3; r++) {
			var tr = myUI.creEle("tr"), j = r + 1;

			for (var c = 0; c < 3; c++) {
				var td = myUI.creEle("td"),d = c + 1;

				td.innerHTML = "&nbsp;";
				td.onclick = myUI.boxSelect(td,playerLabel);

				tr.append(td);
			}

			table.append(tr);
		}

		body.append(table,playerLabel);
	},
	boxSelect: function(td,playerLabel){
		return function(){

			if(player === "X"){
				td.innerHTML = "X";
				td.onclick = null;
				player = "O";
				playerLabel.innerHTML = player + " turn";
				var tds = myUI.bySelAll("td");
			} else if(player === "O"){
				td.innerHTML = "O";
				td.onclick = null;
				player = "X";
				playerLabel.innerHTML = player + " turn";
				var tds = myUI.bySelAll("td");
			}
			
			myUI.evalBoard(tds);
		}
	},
	evalBoard: function(tds){
		--cellCount;
		/* X row wins */
		if (myUI.r1x(tds) || myUI.r2x(tds) || myUI.r2x(tds) || myUI.c1x(tds) || myUI.c2x(tds) || myUI.c3x(tds) || myUI.d1x(tds) || myUI.d2x(tds)) {
			myUI.xWin();
			winStatus = true;
		};
		/* O row wins */
		if (myUI.r1o(tds) || myUI.r2o(tds) || myUI.r2o(tds) || myUI.c1o(tds) || myUI.c2o(tds) || myUI.c3o(tds) || myUI.d1o(tds) || myUI.d2o(tds)) {
			myUI.oWin();
			winStatus = true;
		};
		/* tie game */
		if(cellCount === 0 && winStatus === false){
			myUI.tieGame();
		};
	},
	xWin: function(){
		var blokker = myUI.creEle("div"),
			btnOver = myUI.creEle("button");

		btnOver.innerHTML = "PLAY AGAIN!"
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "<p>X WINS</p>";
		blokker.append(btnOver);

		body.append(blokker);
	},
	oWin: function(){
		var blokker = myUI.creEle("div"),
			btnOver = myUI.creEle("button");

		btnOver.innerHTML = "PLAY AGAIN!"
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "<p>O WINS</p>";
		blokker.append(btnOver);

		body.append(blokker);
	},
	tieGame: function(){
		var blokker = myUI.creEle("div"),
			btnOver = myUI.creEle("button");

		btnOver.innerHTML = "PLAY AGAIN!";
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "<p>TIED!</p>";
		blokker.append(btnOver);

		body.append(blokker);
	},
	restart: function(){
		return function(){
			location.reload();
		}
	}
};

window.onload = function(){
	myUI.init();
};