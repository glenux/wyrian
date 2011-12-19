
// -- Init the Background DIV
Layouts.Player = new Layout({

	// -- Define elements to draw with options
	el: [{
		id: 'ship',
		name: 'ship',
		width: 160,
		height: 160,
		type: 'human',
		sprites: [0,1],
		origin: {
			x: Game.width/2 - 80,
			y: Game.height-220
		},
		fireInterval: 300,
		explode: function(obj) {
			if ( ! obj ) return false ;
			obj.explosing = true ;
			Layouts.Ennemies.createExplosion(obj) ;
			Layouts.Player.running = false ;
		},
		animate: function(obj) {

			// -- KEY up /down
			if ( Game.input.keyboard.up ) {
				if ( obj.y > 0 ) obj.y -= obj.parent.settings.speed ;
			}
			if ( Game.input.keyboard.down && (obj.y < (Game.height-obj.height) ) ) {
				obj.y += obj.parent.settings.speed;
			}

			// -- Left/Right move : choose sprite sequence to display
			if ( Game.input.keyboard.left && (obj.x > 0)) {
				obj.x -= obj.parent.settings.speed;
			}
			if ( Game.input.keyboard.right && (obj.x < Game.width-obj.width) ) {
				obj.x += obj.parent.settings.speed;
			}

			// -- Press Space : fire
			if ( Game.input.keyboard.space ) {
				obj.parent.fire(obj) ;
			}

		}
	}, {

		id: 'ship_reactor',
		width: 44,
		height: 68,
		imageSrc: 'images/sprites/reactor_fire_sprite.png',
		sprites: [0,1],
		nomove: true,
		animate: function(obj) {
			obj.settings.spriteMod = 3 ;
			obj.settings.sprites = [0,1] ;
			if ( Game.input.keyboard.up ) {
				obj.settings.sprites = [2,3,4] ;
			}
		}

	}],

	// -- Define current Speed
	speed: 20,
	direction: 1,

	// -- Define canvas parent
	dom: $('div#game')

}) ;

// -- Bullets types
Layouts.Player.bulletLib = function(obj, bulletType) {

	var bulletConf = {
		power: 40,
		imageSrc: 'images/bullet-electric-sprite.png',
		sprites: [0,1,2],
		speed:  40,
		direction: -1,
		type: 'human',
		name: 'bullet',
		explode: function(obj) {
			if ( ! obj ) return false ;
			obj.explosing = true ;
	  		obj.deleteAfter = true ;
		},
		origin: {x:0, y:0}
	} ;

	// -- Default Left
	if ( bulletType == 'weapon_pilot' )  {
		bulletConf.width = 16 ;
		bulletConf.height = 64 ;
		bulletConf.sprites = false ;
		bulletConf.imageSrc = 'images/12px-long-blue.png' ;
		bulletConf.origin.x = obj.x-6+obj.width/2 ;
		bulletConf.origin.y = obj.y - bulletConf.height ;
	}

	// -- Big Left
	if ( bulletType == 'big_left' )  {
		bulletConf.width = 60 ;
		bulletConf.height = 60 ;
		bulletConf.speed = 20 ;
		bulletConf.origin.x = obj.x+18+obj.width/2 ;
		bulletConf.origin.y = obj.y + 50 - bulletConf.height ;
	}

	// -- Big Left
	if ( bulletType == 'big_right' )  {
		bulletConf.width = 60 ;
		bulletConf.height = 60 ;
		bulletConf.speed = 20 ;
		bulletConf.origin.x = obj.x-75+obj.width/2 ;
		bulletConf.origin.y = obj.y + 50 - bulletConf.height ;
	}

	// -- The animate function
	bulletConf.animate = function(obj) {
	  	if ( obj.deleteAfter ) return false;
	  	if ( obj.explosing ) {

	  		Game.log(obj) ;
	  		return false ;
	  	}
	    obj.y += obj.settings.speed*obj.settings.direction ;
	    if ( obj.y < -(obj.height+300) ) {
	    	obj.deleteObj() ;
	    }
	} ;

	// Add the bullet to display
	return this.createObj(bulletConf) ;

} ;

// -- Fire bullets on space bar
Layouts.Player.fire = function(obj) {

	// Get now time and lastfired
	this.now = (new Date().getTime()) ;
	this.lastFired = this.lastFired || this.now ;

	// If firing, wait for next interval
	if ( (this.now-this.lastFired) < (obj.settings.fireInterval) ) return false;

	// Store now for last fired event
	this.lastFired = this.now ;

	// Create new bullets
	var bullets = [] ;
	bullets.push(this.bulletLib(obj, 'weapon_pilot')) ;
	bullets.push(this.bulletLib(obj, 'big_left')) ;
	bullets.push(this.bulletLib(obj, 'big_right')) ;
	for ( var i in bullets ) {
		this.els.push(bullets[i]) ;
	}

	// Play sound
	soundManager.play('shoot') ;
}

