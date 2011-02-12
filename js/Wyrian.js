var Wyrian = function() {
	// do basic initializations

	var inputController = new InputController(),
		displayController = new DisplayController(),
		gameController = new GameController(inputController, displayController);

	gameController.start();
}();