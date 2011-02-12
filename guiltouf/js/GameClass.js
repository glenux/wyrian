// Init Global vars
var FPS = 40;
var Stages = {} ;
var Level = 1 ;
var Layouts = {} ;
var timers = {} ;
var Game = null ;

// -- Init scene prototype
var app = function(opts) {
	
	this.version = 0.1 ;
	
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
	
	// If canvas supported in native or use extended support for croos browsing like excnvas for ie
	this.support = this.support || {} ;
	if ( typeof G_vmlCanvasManager != 'undefined' ) {
		this.support.canvas = {extended: true} ;
	} else {
		this.support.canvas = {isNative: true} ;
	}
	
	// Listen for inputs
	this.input = new this.Input() ;
	
	// Return object
	return this;
} ;

// -- Bind init call
app.prototype.init = function() {
	
	var self = this ;
	
	require({
	      baseUrl: "/js/",
	      urlArgs: "bust=" + self.version
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

	// -- Build an active elements list
	this.activeEls = [] ;
	
	// -- Detect collisions
	
	
	// -- Search for elements that have to be updated
	for ( var i in Layouts ) {
		var _layout = Layouts[i] ;
		if ( _layout && _layout.running ) {
			_layout.update() ;
		}
	}
	
	// -- Create ennemies
	var numEnnemies = 0 ;
	for ( var i in Layouts.Ennemies.els ) {
		var _el = Layouts.Ennemies.els[i] ;
		if ( ! _el.deleteAfter ) numEnnemies++ ;
	}
	for ( var i = numEnnemies-1 ; i < Level + 3 ; i++ ) {
		Layouts.Ennemies.createRandom() ;
	}
	
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