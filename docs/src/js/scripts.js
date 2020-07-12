var myUI,player = "X",winStatus = false,cellCount = 9;


myUI = {
	testX: function(tds,x,y,z,a){
		if (tds[x].innerHTML === a && tds[y].innerHTML === a && tds[z].innerHTML === a) {
			myUI.xWin();
			winStatus = true;
		}
	},
	testO: function(tds,x,y,z,a){
		if (tds[x].innerHTML === a && tds[y].innerHTML === a && tds[z].innerHTML === a) {
			myUI.oWin();
			winStatus = true;
		}
	},
	r1x: function(tds){ return myUI.testX(tds,0,1,2,"X") },
	r2x: function(tds){ return myUI.testX(tds,3,4,5,"X") },
	r3x: function(tds){ return myUI.testX(tds,6,7,8,"X") },
	c1x: function(tds){ return myUI.testX(tds,0,3,6,"X") },
	c2x: function(tds){ return myUI.testX(tds,1,4,7,"X") },
	c3x: function(tds){ return myUI.testX(tds,2,5,8,"X") },
	d1x: function(tds){ return myUI.testX(tds,2,4,6,"X") },
	d2x: function(tds){ return myUI.testX(tds,0,4,8,"X") },
	r1o: function(tds){ return myUI.testO(tds,0,1,2,"O") },
	r2o: function(tds){ return myUI.testO(tds,3,4,5,"O") },
	r3o: function(tds){ return myUI.testO(tds,6,7,8,"O") },
	c1o: function(tds){ return myUI.testO(tds,0,3,6,"O") },
	c2o: function(tds){ return myUI.testO(tds,1,4,7,"O") },
	c3o: function(tds){ return myUI.testO(tds,2,5,8,"O") },
	d1o: function(tds){ return myUI.testO(tds,2,4,6,"O") },
	d2o: function(tds){ return myUI.testO(tds,0,4,8,"O") },
	init: function(){ setTimeout(function(){myUI.loadout()},1); },
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
		myUI.r1x(tds);
		myUI.r2x(tds);
		myUI.r3x(tds);
		myUI.c1x(tds);
		myUI.c2x(tds);
		myUI.c3x(tds);
		myUI.d1x(tds);
		myUI.d2x(tds);
		/* O row wins */
		myUI.r1o(tds);
		myUI.r2o(tds);
		myUI.r3o(tds);
		myUI.c1o(tds);
		myUI.c2o(tds);
		myUI.c3o(tds);
		myUI.d1o(tds);
		myUI.d2o(tds);
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