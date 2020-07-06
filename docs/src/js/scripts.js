var myUI,player = "X",winStatus = false,cellCount = 9;

myUI = {
	init: function(){
		setTimeout(function(){myUI.loadout()},1); 
	},
	loadout: function(){
		var table = document.createElement("table"), playerLabel;

		playerLabel = document.createElement("div");
		playerLabel.innerHTML = player + " turn";

		for (var r = 0; r < 3; r++) {
			var tr = document.createElement("tr"), j = r + 1;

			for (var c = 0; c < 3; c++) {
				var td = document.createElement("td"),d = c + 1;

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
				var tds = document.querySelectorAll("td");
			} else if(player === "O"){
				td.innerHTML = "O";
				td.onclick = null;
				player = "X";
				playerLabel.innerHTML = player + " turn";
				var tds = document.querySelectorAll("td");
			}
			
			myUI.evalBoard(tds);
		}
	},
	evalBoard: function(tds){
		--cellCount;
		/* X row wins */
		if (tds[0].innerHTML === "X" && tds[1].innerHTML === "X" && tds[2].innerHTML === "X" || tds[3].innerHTML === "X" && tds[4].innerHTML === "X" && tds[5].innerHTML === "X" || tds[6].innerHTML === "X" && tds[7].innerHTML === "X" && tds[8].innerHTML === "X" || tds[0].innerHTML === "X" && tds[3].innerHTML === "X" && tds[6].innerHTML === "X" || tds[1].innerHTML === "X" && tds[4].innerHTML === "X" && tds[7].innerHTML === "X" || tds[2].innerHTML === "X" && tds[5].innerHTML === "X" && tds[8].innerHTML === "X" || tds[0].innerHTML === "X" && tds[4].innerHTML === "X" && tds[8].innerHTML === "X" || tds[2].innerHTML === "X" && tds[4].innerHTML === "X" && tds[6].innerHTML === "X") {
			myUI.xWin();
			winStatus = true;
		}

		/* O row wins */
		if (tds[0].innerHTML === "O" && tds[1].innerHTML === "O" && tds[2].innerHTML === "O" || tds[3].innerHTML === "O" && tds[4].innerHTML === "O" && tds[5].innerHTML === "O" || tds[6].innerHTML === "O" && tds[7].innerHTML === "O" && tds[8].innerHTML === "O" || tds[0].innerHTML === "O" && tds[3].innerHTML === "O" && tds[6].innerHTML === "O" || tds[1].innerHTML === "O" && tds[4].innerHTML === "O" && tds[7].innerHTML === "O" || tds[2].innerHTML === "O" && tds[5].innerHTML === "O" && tds[8].innerHTML === "O" || tds[0].innerHTML === "O" && tds[4].innerHTML === "O" && tds[8].innerHTML === "O" || tds[2].innerHTML === "O" && tds[4].innerHTML === "O" && tds[6].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}

		/* tie game */
		if(cellCount === 0 && winStatus === false){
			myUI.tieGame();
		};
		
		
		
	},
	xWin: function(){
		var blokker = document.createElement("div"),
			btnOver = document.createElement("button");

		btnOver.innerHTML = "PLAY AGAIN!"
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "<p>X WINS</p>";
		blokker.append(btnOver);

		body.append(blokker);
	},
	oWin: function(){
		var blokker = document.createElement("div"),
			btnOver = document.createElement("button");

		btnOver.innerHTML = "PLAY AGAIN!"
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "<p>O WINS</p>";
		blokker.append(btnOver);

		body.append(blokker);
	},
	tieGame: function(){
		var blokker = document.createElement("div"),
			btnOver = document.createElement("button");

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