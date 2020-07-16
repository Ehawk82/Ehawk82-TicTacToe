var myUI,
	player = "X",
	winStatus = false,
	cellCount = 9;

myUI = {
	all_tests: function(tds) { 
  		return [ 
    		[0,1,2,"X"],
    		[3,4,5,"X"],
    		[6,7,8,"X"],
    		[0,3,6,"X"],
			[1,4,7,"X"],
			[2,5,8,"X"],
			[2,4,6,"X"],
			[0,4,8,"X"],
			[0,1,2,"O"],
			[3,4,5,"O"],
			[6,7,8,"O"],
			[0,3,6,"O"],
			[1,4,7,"O"],
			[2,5,8,"O"],
			[2,4,6,"O"],
			[0,4,8,"O"]
  		].some( combo => myUI.runTest( tds, ...combo ) );
	},
	runTest: function(tds,x,y,z,a){
		if (tds[x].innerHTML === a && tds[y].innerHTML === a && tds[z].innerHTML === a) {
			//myUI.xWin();
			if(a == "X"){
				myUI.xWin();
			} else if(a == "O") {
				myUI.oWin();
			}
;			winStatus = true;
		}
	},
	creEle: function(x) {return document.createElement(x) },
	bySelAll: function(x) {return document.querySelectorAll(x) },
	init: function(){ 
		setTimeout(function(){
			myUI.loadout();
		},0);
	},
	loadout: function(){
		var table = myUI.creEle("table"), playerLabel;

		playerLabel = myUI.creEle("div");
		playerLabel.innerHTML = player + " turn";

		for (var r = 0; r < 3; r++) {
			var tr = myUI.creEle("tr");

			for (var c = 0; c < 3; c++) {
				var td = myUI.creEle("td");

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
		myUI.all_tests(tds);

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
		blokker.innerHTML = "<p>X WIN</p>";
		blokker.append(btnOver);

		body.append(blokker);
	},
	oWin: function(){
		var blokker = myUI.creEle("div"),
			btnOver = myUI.creEle("button");

		btnOver.innerHTML = "PLAY AGAIN!"
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "<p>O WIN</p>";
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