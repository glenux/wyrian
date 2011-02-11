var keys = {};

function controlship() {
	for (var i in keys) {
		
		//a pressed
	       if (i == 65) {
		$('#ship').css('left', (parseInt($('#ship').css('left'),10) - 10) + 'px');

		}
		// s pressed
		if (i == 83) {
			$('#ship').css('top', (parseInt($('#ship').css('top'),10) + 10) + 'px');
		}
		// d pressed
		if (i == 68) {
			$('#ship').css('left', (parseInt($('#ship').css('left'),10) + 10) + 'px');
		}
		// w pressed
		if (i == 87) {
			$('#ship').css('top', (parseInt($('#ship').css('top'),10) - 10) + 'px');
		}
	    }

		
}

$(document).keydown(function (evt) {
	var code = evt.keyCode || evt.which;
	keys[code] = true;
});

$(document).keyup(function (evt) {
	var code = evt.keyCode || evt.which;
	delete keys[code];
    	
	
});

function onTimerTick() {
    controlship();
}

setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec



