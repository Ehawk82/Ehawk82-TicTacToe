var myUI;

myUI = {
	init: function(){
		setTimeout(function(){myUI.loadout()},0); 
	},
	loadout: function(){
		console.log("loadout");
	}
};

window.onload = function(){
	myUI.init();
};