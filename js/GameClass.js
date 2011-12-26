// Init Global vars
var FPS = 30;
var Stages = {} ;
var Level = 1 ;
var Layouts = {} ;
var timers = {} ;
var Game = null ;

// -- Init scene prototype
var app = function(opts) {

	this.name = "Wyrian - A Tyrian Arcade Game Clone" ;
	this.version = '0.2a' ;

	// Init uniqId
	this.uniqId = 0 ;

	// Default settings
	var settings = {
		libs: {}
	} ;
	$.extend(true, settings, opts);
	this.settings = settings ;

	// Set Scene size
	this.width = $(document).width() ;
	this.height = $(document).height() ;

	// Listen for inputs
	this.input = new this.Input() ;

	// Return object
	return this;
} ;

// -- Bind init call
app.prototype.init = function() {

	var self = this ;

	require({
	      baseUrl: "js/",
	      urlArgs: "bust=" + GameVersion
	    },

	    // -- Layout to load
	    self.settings.layers,

	    // -- All objects are loaded => can run
	    function() {
			$(document).trigger('gameLoaded') ;
		}
	);

	if ( typeof this.settings.init == 'function') {
		this.settings.init() ;
	}
} ;

// -- A log function
app.prototype.log = function(txt) {
	try {
		console.log(txt);
	} catch(e) {} ;
}

// -- Call all canvas updates if declared as 'running'
app.prototype.loopAnimation = function() {

	// -- Search for elements that have to be updated
	Game.activeElements = 0 ;
	for ( var i in Layouts ) {
		var _layout = Layouts[i] ;
		if ( _layout && _layout.running ) {
			_layout.update() ;
		}
	}

	// -- Get level
	Level = Math.floor((Game.score||0)/1000) ;

	// -- Create ennemies if needed
	var numEnnemies = 0 ;
	if ( Layouts.Ennemies ) {
		for ( var i in Layouts.Ennemies.els ) {
			var _el = Layouts.Ennemies.els[i] ;
			if ( ! _el.deleteAfter ) numEnnemies++ ;
		}
		for ( var i = numEnnemies-1 ; i < Level + 3 ; i++ ) {
			Layouts.Ennemies.createRandom() ;
		}
	}

	// -- Init loops counter
	Game.loops = Game.loops||0 ;

	// -- Init vars
	if ( Game.loops == 0 ) {
 		this.frameCount = 0;
 		this.fps = 0;
 		this.maxfps = 1 / (FPS / 1000);
 		this.lastTime = new Date();
	}

	// -- Calculate time deltas and find fps value
	var nowTime = new Date();
    var diffTime = Math.ceil((nowTime.getTime() - this.lastTime.getTime()));
    if (diffTime >= 1000) {
       this.fps = this.frameCount;
       this.frameCount = 0;
       this.lastTime = nowTime;
    }
    this.frameCount++;

	// -- Increase loop counter
	Game.loops++ ;

	// -- Refresh Scores and HUD informations
	$('#score span').html(Game.score) ;
	$('#activeElements span').html(Game.activeElements) ;
	$('#fpsCounter span').html(this.fps) ;
}

// -- Bind Inputs
app.prototype.Input = function() {

    this.keyboard = {};
    var that = this;
    this.mousedown = false;
    this.keydown = true;

    // this is handling WASD, and arrows keys
    function update_keyboard(e, val) {
        if(e.keyCode==40 || e.keyCode==83)
            that.keyboard['down'] = val;
        if(e.keyCode==38 || e.keyCode==87)
            that.keyboard['up'] = val;
        if(e.keyCode==39 || e.keyCode==68)
            that.keyboard['right'] = val;
        if(e.keyCode==37 || e.keyCode==65)
            that.keyboard['left'] = val;
        if(e.keyCode==32) {
            that.keyboard['space'] = val;
            e.preventDefault() ;
            e.stopPropagation() ;
        }
        if(e.keyCode==17)
            that.keyboard['ctrl'] = val;
        if(e.keyCode==13)
            that.keyboard['enter'] = val;
    };

    document.ontouchstart = function(event) {
        that.mousedown = true;
    }
    document.ontouchend = function(event) {
        that.mousedown = false;
    }
    document.ontouchmove = function(event) {}

    document.onmousedown = function(event) {
        that.mousedown = true;
    }
    document.onmouseup = function(event) {
        that.mousedown = false;
    }
    document.onclick = function(event) {
        //that.click(event);
    }
    /*
    document.onmousemove = function(event) {
        that.xmouse = event.clientX;
        that.ymouse = event.clientY;
    }
    */
    document.onkeydown = function(e) {
        that.keydown = true;
        update_keyboard(e, true);
    };
    document.onkeyup = function(e) {
        that.keydown = false;
        update_keyboard(e, false);
    };
    // can be used to avoid key jamming
    document.onkeypress = function(e) {
    	if ( that.keyboard.space ) {
			e.preventDefault() ;
			e.stopPropagation() ;
		}
    };
    // make sure that the keyboard is rested when
    // the user leave the page
    window.onblur = function (e) {
        that.keyboard = {}
        that.keydown = false;
        that.mousedown = false;
    }
}