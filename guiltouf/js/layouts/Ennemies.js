
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

// -- Create a random ennemy
Layouts.Ennemies.createRandom = function(opts) {
	var self = this ;
	var bulletConf = {
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
		
		},
		animate: function (obj) {
	     	obj.y += obj.settings.speed*obj.settings.direction ;
	    	if ( obj.y > obj.parent.height+obj.height ) {
	    		obj.x = Math.round(Math.random()*self.width)
	     		obj.y = Math.round(-Math.random()*self.height) ;
	    	}
		}
	} ;

	this.els.push(this.createObj(bulletConf)) ;
} ;
