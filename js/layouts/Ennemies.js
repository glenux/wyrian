
// -- Init the Background DIV
Layouts.Ennemies = new Layout({

	// -- Define elements to draw with options
	el: [],
	
	// -- Define current Speed
	speed: 7,
	direction: 1,
	
	// -- Define canvas parent
	dom: $('div#game')
	
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
	var self = this,
	
	alien = {
		name: 'ennemy',
		type: 'alien',
		width: 60,
		height: 60,
		power: 40,
		imageSrc: '/images/bullet-electric-sprite.png',
		sprites: [0,1,2],
		speed:  Math.round(Math.max(10, Math.random()*20)),
		direction: 1,
		origin: {x:Math.round(Math.random()*self.width), y:Math.round(-Math.random()*self.height)},
		explode: function(obj) {
			if ( ! obj || obj.explosing ) return false ;
			self.createExplosion(obj) ;
			obj.explosing = true ;
			obj.box.hide(0);
			obj = self.reinitObj(obj);
			
			Wyrian.score = Wyrian.score || 0 ;
			Wyrian.score += obj.settings.power ;
		},
		animate: function (obj) {
			if ( obj.explosing ) {
				obj.y = obj.parent.heigh+1000 ;
			} else {
	     		obj.y += obj.settings.speed*obj.settings.direction ;
	     	}
	    	if ( obj.y > obj.parent.height+obj.height ) {
	    		obj = self.reinitObj(obj);
	    	}
		}
	} ;

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
		imageSrc: '/images/sprites/explosion-sprite.png',
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
