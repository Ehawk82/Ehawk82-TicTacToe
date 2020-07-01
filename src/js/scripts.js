var myUI,player = 1,winStatus = false,cellCount = 9;

myUI = {
	init: function(){
		
		setTimeout(function(){myUI.loadout()},1); 
	},
	loadout: function(){
		var table = createEle("table"), playerLabel;

		playerLabel = createEle("p");
		playerLabel.innerHTML = "Player " +player + "'s turn";

		for (var r = 0; r < 3; r++) {
			var tr = createEle("tr"), j = r + 1;

			for (var c = 0; c < 3; c++) {
				var td = createEle("td"),d = c + 1;

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

			if(player === 1){
				td.innerHTML = "X";
				td.onclick = null;
				player = 2;
				playerLabel.innerHTML = "Player " +player + "'s turn";
				var tds = bySelAll("td");
			} else if(player === 2){
				td.innerHTML = "O";
				td.onclick = null;
				player = 1;
				playerLabel.innerHTML = "Player " +player + "'s turn";
				var tds = bySelAll("td");
			}
			
			myUI.evalBoard(tds);
		}
	},
	evalBoard: function(tds){
		--cellCount;
		console.log(cellCount);
		/* X row wins */
		if (tds[0].innerHTML === "X" && tds[1].innerHTML === "X" && tds[2].innerHTML === "X" ) {
			myUI.xWin();
			winStatus = true;
		}
		if (tds[3].innerHTML === "X" && tds[4].innerHTML === "X" && tds[5].innerHTML === "X" ) {
			myUI.xWin();
			winStatus = true;
		}
		if (tds[6].innerHTML === "X" && tds[7].innerHTML === "X" && tds[8].innerHTML === "X" ) {
			myUI.xWin();
			winStatus = true;
		}

		/* X col wins */
		if (tds[0].innerHTML === "X" && tds[3].innerHTML === "X" && tds[6].innerHTML === "X" ) {
			myUI.xWin();
			winStatus = true;
		}
		if (tds[1].innerHTML === "X" && tds[4].innerHTML === "X" && tds[7].innerHTML === "X" ) {
			myUI.xWin();
			winStatus = true;
		}
		if (tds[2].innerHTML === "X" && tds[5].innerHTML === "X" && tds[8].innerHTML === "X" ) {
			myUI.xWin();
			winStatus = true;
		}

		/* X diag wins */
		if (tds[0].innerHTML === "X" && tds[4].innerHTML === "X" && tds[8].innerHTML === "X" ) {
			myUI.xWin();
			winStatus = true;
		}
		if (tds[2].innerHTML === "X" && tds[4].innerHTML === "X" && tds[6].innerHTML === "X" ) {
			myUI.xWin();
			winStatus = true;
		}

		/* O row wins */
		if (tds[0].innerHTML === "O" && tds[1].innerHTML === "O" && tds[2].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}

		if (tds[3].innerHTML === "O" && tds[4].innerHTML === "O" && tds[5].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}
		if (tds[6].innerHTML === "O" && tds[7].innerHTML === "O" && tds[8].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}

		/* O col wins */
		if (tds[0].innerHTML === "O" && tds[3].innerHTML === "O" && tds[6].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}
		if (tds[1].innerHTML === "O" && tds[4].innerHTML === "O" && tds[7].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}
		if (tds[2].innerHTML === "O" && tds[5].innerHTML === "O" && tds[8].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}

		/* O diag wins */
		if (tds[0].innerHTML === "O" && tds[4].innerHTML === "O" && tds[8].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}
		if (tds[2].innerHTML === "O" && tds[4].innerHTML === "O" && tds[6].innerHTML === "O" ) {
			myUI.oWin();
			winStatus = true;
		}

		/* tie game */
		for (var n = 0; n < tds.length; n++) {
			if(cellCount === 0 && winStatus === false){
				myUI.tieGame();
			};
		}
		
		
	},
	xWin: function(){
		var blokker = createEle("div"),
			btnOver = createEle("button");

		btnOver.innerHTML = "PLAY AGAIN!"
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "PLAYER ONE HAS ONE THIS ROUND!";
		blokker.append(btnOver);

		body.append(blokker);
	},
	oWin: function(){
		var blokker = createEle("div"),
			btnOver = createEle("button");

		btnOver.innerHTML = "PLAY AGAIN!"
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "PLAYER TW0 HAS ONE THIS ROUND!";
		blokker.append(btnOver);

		body.append(blokker);
	},
	tieGame: function(){
		var blokker = createEle("div"),
			btnOver = createEle("button");

		btnOver.innerHTML = "PLAY AGAIN!";
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = "TIED!";
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