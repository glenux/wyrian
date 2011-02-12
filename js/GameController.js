var GameController = function(inputController, displayController) {
	var that = {};
	that._loopRunning = false;
	that._loop = null;
	that._inputController = inputController;
	that._displayController = displayController;

	that.start = function() {
		that._loopRunning = true;
		that._loop = setInterval(that.loop, 30);
	};

	that.stop = function() {
		that._loopRunning = false;
	};

	that.loop = function() {
		that._inputController.observe();
		// add other stuff here

		that._displayController.draw();
	};
	
	return that;
};