

// -- Build Background Scene
var Layout = function(opts) {

	// -- Default settings
	var settings = {
		el: [],
		dom: null
	} ;
	$.extend(settings, opts) ;
	
	// -- Set running or not
	this.running = true ;
	
	// -- Store settings
	this.settings = settings ; 
	
	// -- Declare Scene here
	this.dom = this.settings.dom.get(0) ;
		
	// -- Set width and height shortcuts
	this.width = this.settings.dom.width() ;
	this.height = this.settings.dom.height() ;
	
	// -- Create objects in scene
	this.els = [] ;
	if ( typeof settings.el == 'object' ) {
		for ( var i in settings.el ) {
		  this.els.push(this.createObj(settings.el[i])) ;
		}
	}
	
	return this;
}; 

// -- Return or set settings
Layout.prototype.option = function(optName, optValue) {
	
	// No params => return all settings
	if ( typeof optName == 'undefined' ) return this.settings;
	
	// If optName and optValue set => modify it
	else if ( typeof optValue != 'undefined' ) this.settings[optName] = this.settings ;
	
	// In other cases, simply return the setting value
	else return this.settings[optName] ;

}; 

// -- Return an object by name
Layout.prototype.getObj = function(name) {
	this.cache = this.cache || {} ;
	
	if ( this.cache[name] ) return this.cache[name] ;
	
	for ( var i in this.els ) {
		if ( this.els[i].settings.name == name ) {
			this.cache[name] = this.els[i] ;
			return this.cache[name] ;
		}
	}
}

// -- Update elements into layout
Layout.prototype.update = function() {
	for ( var j in this.els ) {
		var _el = this.els[j] ;
		if ( _el ) {
			if( ! _el.deleteAfter ) {
				_el.animate() ;
			}
			else { 
				_el.box.addClass('removed').remove() ; 
			}
		}
	}
}

// -- Create an object
Layout.prototype.createObj = function(opts) {
	
	var self = this ;

	// -- Init and build Framebuffer object
	var Obj = function (optsObj) {
	
		// -- Parse options
		var settingsObj = {
			origin: { x: 0, y: 0},
			imageSrc: false,
			backgroundColor: 'transparent', 
			backgroundRepeat: 'no-repeat', 
			backgroundPosition: '0 0',  
			imageOrigin: { x:0, y:0 }
		} ;
		$.extend(true, settingsObj, optsObj) ;
		
		// -- Store options
		this.parent = self ;
		this.name = settingsObj.name || 'default' ;
		this.id = settingsObj.id || 'element_'+Wyrian.uniqId++ ;
		this.width = settingsObj.width ? settingsObj.width : self.width  ;
		this.height = settingsObj.height ? settingsObj.height : self.height  ;
		this.settings = settingsObj ;
		
		// -- Find backgroundImage in CSS if specified
		if ( ! settingsObj.imageSrc ) {
			var bgImg = self.settings.dom.css('backgroundImage') ;
			if ( bgImg != 'none' ) {
				settingsObj.imageSrc = bgImg ;
			}
		}
		
		// -- Init position
		this.init() ;
		
		// -- Create a DOM object
		this.box = $('#'+this.id) ;
		if ( ! this.box.length ) {
			this.box = $('<div>', {
				class:'sprite '+this.name,
				id: this.id,
				css:{
					position: 'absolute', 
				    display: 'block', 
				    top: 0,
				    left: 0,
				    backgroundColor: settingsObj.backgroundColor, 
				    backgroundRepeat: settingsObj.backgroundRepeat,
				    backgroundPosition: settingsObj.backgroundPosition,
				    backgroundImage: settingsObj.imageSrc ? 'url('+settingsObj.imageSrc+')' : ''
				}
			}).appendTo(self.dom) ;
		} else {
			this.box.show(0) ;
		}
		
		// -- Apply CSS
		this.box.css({
		    width: this.width,
		    height: this.height
		}) ;
		
		// -- Move
		if ( ! this.settings.nomove ) {
			this.box.transform({'translate': this.x+'px, '+this.y+'px'}) ;
		}
		
	} ;
	
	// -- Init 
	Obj.prototype.init = function() {
		this.x = this.settings.origin.x ;
		this.y = this.settings.origin.y ;
	} ;	
	
	// -- Return instance
	Obj.prototype.getInstance = function() {
		return this;
	} ;
	
	// -- Draw object into scene
	Obj.prototype.draw = function() {
		if ( (this.y >= -2*this.height) && (this.y <= (Wyrian.height+this.height)) && this.x >= -this.width && this.x <= (Wyrian.width+this.width) ) {
		
			// -- Set sprite to display
			if ( this.settings.sprites ) {
				this.lastSprite = this.lastSprite || 0 ;
				this.lastSprite++ ;
				if ( typeof this.settings.sprites[this.lastSprite] == 'undefined' ) this.lastSprite = 0 ;
				this.box.css({'backgroundPosition': -1*this.settings.sprites[this.lastSprite]*this.settings.width+'px 0'}) ;
			}
			
			// -- Move div
			if ( ! this.settings.nomove ) {
				if ( this.settings.moveParent ) {
					this.box.parent().css({'translate': this.x+'px, '+this.y+'px'}) ;
				} else {
					this.box.css({'translate': this.x+'px, '+this.y+'px'}) ;
				}
			}
		}
		
	} ;
	
	// -- Animate the Framebuffer into the scene
	Obj.prototype.animate = function() {	
	
		// -- Execute custom animate function if specified
		if ( $.isFunction(this.settings.animate) ) {
			this.parent = self ;
			this.settings.animate(this) ;
		} 
		
		// -- Detect collision
		this.detectCollision() ;
		
		// -- Apply effects
		if ( ! this.nodraw ) this.draw() ;
	} ;
	
	// -- Detect collision
	Obj.prototype.detectCollision = function() {
	
    	// -- Build an active elements list
    	this.activeEls = [] ;
    	
    	// -- Detect collisions
    	for ( var i in Layouts ) {
    		var _layout = Layouts[i] ;
    		if ( _layout && _layout.running ) {
    			for ( var j in _layout.els ) {
    				var el = _layout.els[j],
    					type = el.name ;
    				
    				// -- Make some clean
    				if (el.deleteAfter) {
    					delete Layouts[i].els[j] ;
    				} 
    				
    				// -- Detect only defined types
    				else {
    					if ( type == 'ennemy' || type == 'bullet' || type == 'ship' || type == 'ship' ) {
    						
    						var A = {
    							x: this.x,
    							y: this.y,
    							xX: this.x+this.width,
    							yY: this.y+this.height
    						} ;
    						
    						var B = {
    							x: el.x,
    							y: el.y,
    							xX: el.x + el.width,
    							yY: el.y + el.height							
    						} ;
    						
    						// -- Test if in viewport
    						if ( (type != this.name) && (this.name != 'default') && (el.settings.type != this.settings.type) ) {
    							
    							var touchTopRight = ( 
    								( B.x <= A.xX && B.x >= A.x ) 
    								&& 
    								( B.yY >= A.y) && ( B.yY <= A.yY )  
    							) ? true : false ;
    							
    							var touchTopLeft = ( 
    								( B.x >= A.x && B.x <= A.xX ) 
    								&& 
    								( B.yY >= A.y) && ( B.yY <= A.yY )  
    							) ? true : false ;
    							
    							var touchBottomRight = ( 
    								( B.x >= A.x && B.x <= A.xX ) 
    								&& 
    								( B.y >= A.yY) && ( B.y <= A.y )  
    							) ? true : false ;
    							
    							var touchBottomLeft = ( 
    								( B.xX >= A.x && B.xX <= A.xX ) 
    								&& 
    								( B.y >= A.yY) && ( B.y <= A.y )  
    							) ? true : false ;	
    							
    							if ( touchTopRight || touchTopLeft || touchBottomRight || touchBottomLeft ) {
    								console.log('█▬█ █ ▀█▀') ;
    							}
    						}
    						
    					}
    				}
    			}
    		}
    	}
		
		
	} ;
	
	// -- Remove object
	Obj.prototype.deleteObj = function() {
		this.deleteAfter = true ;
	}
	
	return new Obj(opts) ;
}; 
