/**************************************************************************
* Init Game Bootstrap
***************************************************************************/
Wyrian = new app({
	'libs': [
		'order!jquery.transform-0.9.3.min',
		'order!LayoutClass'
	],
	'layers': [
		'order!layouts/BgLayer',
		'order!layouts/PlayerLayer',
		'order!layouts/Ennemies'
	],
	'wrapper': $('#GameContainer') 
}) ;

	    	    
// Init Application and bind all games events
jQuery(document).ready(function() {
	
	/**************************************************************************
	* Load Dependencies & Create Application
	***************************************************************************/
	require({
	      baseUrl: "/js/",
	      urlArgs: "bust=" + Wyrian.version
	    }, Wyrian.settings.libs,
	    
	    // -- All objects are loaded => can run
	    function() {
	    
	    	// -- Init Stage or show IE popup
	    	if ( ! $.browser.msie ) {
	    		Wyrian.init() ;
	    	} else {
	    		$.facebox.settings.opacity = 0.8 ;
	    		$.facebox.settings.closeImage = '/common/img/facebox/apple-close.png' ;
	    		$(document).unbind('close.facebox') ;
	    		$.facebox({ajax: '/popup-ie/'}, 'popup-ie' ) ;
	    	}
		}
	);	
	
	
	/**************************************************************************
	* Game Controls Events
	***************************************************************************/
	
	// -- Game is loaded
	$(document).bind('gameLoaded', function(e, res) {
		if ( timers.loopGame ) clearInterval(timers.loopGame) ;
		timers.loopGame = setInterval(Wyrian.loopAnimation, 1000/FPS) ;
	}); 
	
	// -- Init Game
	$(document).bind('gameInit', function(e, res) {
		$(document).trigger('gameReset') ;
	}) ;	
	
	// -- Game Reset
	$(document).bind('gameReset', function(e, res) {
		
	}) ;
	
	// -- Start Animation
	$(document).bind('gameStart', function(e, res) {
	
	}) ;
	
	// -- On Complete Launch
	$(document).bind('gameComplete', function(e, res) {

		
	}) ;

}) ;