var myUI,
	player = "X",
	winStatus = false,
	cellCount = 9;
var stats = {
	x: 0,
	o: 0,
	t: 0
};
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
			myUI.winFunc(a);
			winStatus = true;
		}
	},
	creEle: function(x) {return document.createElement(x) },
	bySelAll: function(x) {return document.querySelectorAll(x) },
	init: function(){ 
		setTimeout(function(){
			LSinit("records", stats);
			var records = parseLS("records");
			myUI.loadout(records);
		},0);
	},
	backFunc: function(statPage){
		return function(){
			statPage.remove();
		}
	},
	statLoad: function(records){
		return function(){
			var statPage = myUI.creEle("div"),
				xWins = myUI.creEle("div"),
				oWins = myUI.creEle("div"),
				ties = myUI.creEle("div"),
				backOut = myUI.creEle("button");

			backOut.innerHTML = "BACK";
			backOut.onclick = myUI.backFunc(statPage);

			xWins.innerHTML = "X Wins: " + records.x;
			oWins.innerHTML = "O Wins: " + records.o;
			ties.innerHTML = "Ties: " + records.t;

			statPage.className = "statPage";
			statPage.append(xWins,oWins,ties,backOut);

			body.append(statPage);
		}
	},
	loadout: function(records){
		var table = myUI.creEle("table"), playerLabel,
			statButton = myUI.creEle("button");

		statButton.innerHTML = "View Stats";
		statButton.onclick = myUI.statLoad(records);

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

		body.append(table,playerLabel,statButton);
	},
	boxSelect: function(td,playerLabel){
		return function(){
         td.innerHTML = player;
         player = (player === "X")? "O" : "X";
			td.onclick = null;
			playerLabel.innerHTML = player + " turn";
			var tds = myUI.bySelAll("td");

			myUI.evalBoard(tds);
		}
	},
	evalBoard: function(tds){
		--cellCount;
		myUI.all_tests(tds);

		/* tie game */
		if(cellCount === 0 && winStatus === false){
			myUI.winFunc("t");
		};
	},
	winFunc: function(a){
		var records = parseLS("records"),
			aa = a.toLowerCase(),con;

		records[aa]++;

		saveLS("records", records);

		const inset = (a === "t")? 'TIE GAME' : (a + ' WIN');

		con = `<p>${inset}</p>`;

		var blokker = myUI.creEle("div"),
			btnOver = myUI.creEle("button");

		btnOver.innerHTML = "PLAY AGAIN!"
		btnOver.onclick = myUI.restart();

		blokker.className = "blokker";
		blokker.innerHTML = con;
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
