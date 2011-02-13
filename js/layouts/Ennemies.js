
// -- Init the Background DIV
Layouts.Ennemies = new Layout({

	// -- Define elements to draw with options
	el: [],
	images: ['images/sprites/alien_1.png?_=1', 'images/sprites/alien_2.png?_=1', 'images/sprites/explosion-sprite.png' ],
	
	// -- Define current Speed
	speed: 7,
	direction: 1,
	
	// -- Define canvas parent
	dom: $('div#ground')
	
}) ;

// -- Restart enemy
Layouts.Ennemies.reinitObj = function(obj) {
	var self = this ;
	obj.x = Math.round(Math.random()*self.width)
	obj.y = Math.round(-Math.random()*self.height) ;
	obj.settings.speed = Math.round(Math.max(10, Math.random()*20)) ;
	obj.explosing = false ;
	return obj ;
} ;

// -- Create a random ennemy
Layouts.Ennemies.createRandom = function(opts) {
	var self = this ;
	
	var libsAlien = [
		{
			width: 80,
			height: 80,
			imageSrc: self.settings.images[0],
			sprites: [0,1,2,3]
		},
		{
			width: 80,
			height: 80,
			imageSrc: self.settings.images[1],
			sprites: [0]
		}
	] ;
	
	// Choose one in the lib
	var alien = libsAlien[Math.floor(Math.random()*libsAlien.length)] ;
	
	// Construct global properties
	alien.name = 'ennemy' ;
	alien.type = 'alien' ;
	alien.power = 40 ;
	alien.speed = Math.round(Math.max(10, Math.random()*20)) ;
	alien.direction = 1 ;
	alien.origin = {x:Math.round(Math.random()*self.width), y:Math.round(-Math.random()*self.height)} ;
	alien.explode = function(obj) {
		if ( ! obj || obj.explosing ) return false ;
    	self.createExplosion(obj) ;
    	obj.explosing = true ;
    	obj.box.hide(0);
    	obj = self.reinitObj(obj);
    	
    	Game.score = Game.score || 0 ;
    	Game.score += obj.settings.power ;
    } ;
	alien.animate = function (obj) {
		if ( obj.explosing ) {
    		obj.y = obj.parent.height+1000 ;
    	} else {
     		obj.y += obj.settings.speed*obj.settings.direction ;
     	}
    	if ( obj.y > obj.parent.height+obj.height ) {
    		obj = self.reinitObj(obj);
    	}
    } ;

	// Add it to scene
	this.els.push(this.createObj(alien)) ;
} ;

// -- Create an explosion
Layouts.Ennemies.createExplosion = function(object) {

	var self = this ;
	var explosion = {
		name: 'explosion', 
		type: 'neutral', 
		width:330,
		height:330,
		imageSrc: self.settings.images[2],
		sprites: [0,1,2],
		origin: {x: object.x-330/2+object.width/2, y: object.y-330/2+object.height/2},
		animate: function(obj) {
			obj.settings.spriteMod = 5 ;
		}
	}
	
	var newObj = this.createObj(explosion) ;
	self.els.push(newObj) ;
	
	setTimeout(function() {
		newObj.deleteObj() ;
		if ( ! Layouts.Player.running ) 
			$(document).trigger('gameComplete') ;
	}, 500) ;
	
} ;
