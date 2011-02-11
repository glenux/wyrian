var DisplayController = function() {
	
};

var InputController = function() {
	
};

var GameController = function() {
	
};


var Wyrian = function() {
	// do basic initializations
	
	var 	inputController = new InputController(),
		displayController = new DisplayController(),
		gameController = new GameController(inputController, displayController);
		
}();