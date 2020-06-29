var myUI;

myUI = {
	init: function(){
		setTimeout(function(){myUI.loadout()},0); 
	},
	loadout: function(){
		var table = createEle("table");

		table.className = "board";
		for (var r = 0; r < 3; r++) {
			var tr = createEle("tr"), j = r + 1;

			tr.className = "r" + j;
			for (var c = 0; c < 3; c++) {
				var td = createEle("td"),d = c + 1;

				td.className = "r" + j + " c" + d;
				td.innerHTML = "&nbsp;";

				tr.append(td);
			}

			table.append(tr);
		}


		body.append(table);
	}
};

window.onload = function(){
	myUI.init();
};