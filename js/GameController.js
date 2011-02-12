var GameController = function(inputController, displayController) {

	this._loopRunning = false;
	this._loop = null;
	this._inputController = inputController;
	this._displayController = displayController;

	this.start = function() {
		this._loopRunning = true;
		this._loop = setInterval(this.loop, 30);
	};

	this.stop = function() {
		this._loopRunning = false;
	};

	this.loop = function() {
		this._inputController.observe();

		// add other stuff here

		this._displayController.draw();
	};


};