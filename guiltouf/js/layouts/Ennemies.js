
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
	var bulletConf = {
		name: 'ennemy',
		width: 60,
		height: 60,
		power: 40,
		imageSrc: '/images/bullet-electric-sprite.png',
		sprites: [0,1,2],
		speed:  Math.round(Math.max(10, Math.random()*20)),
		direction: 1,
		origin: {x:Math.round(Math.random()*this.width), y:0},
		animate: function (obj) {
			if ( obj.deleteAfter ) return false;
	     	obj.y += obj.settings.speed*obj.settings.direction ;
	    	if ( obj.y > obj.parent.height ) {
	     		obj.deleteAfter = true ;
	    	}
		}
	} ;

	this.els.push(this.createObj(bulletConf)) ;
} ;
