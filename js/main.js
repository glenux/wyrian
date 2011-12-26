var Game = new app({
	'layers': [
		'order!layouts/BgLayer',
		'order!layouts/PlayerLayer',
		'order!layouts/Ennemies'
	],
	'wrapper': $('#GameContainer')
}),
GameVersion = 0 ;

// Init Application and bind all games events
jQuery(document).ready(function() {

	/**************************************************************************
	* Load Dependencies & Create Application
	***************************************************************************/
	GameVersion = $('#version').html() ;
	var baseLibs = [
		'order!libs/jquery.transform-0.9.3.min',
		'order!layouts/LayoutClass'
	] ;

	require({
	      baseUrl: "js/",
	      urlArgs: "bust=" + GameVersion
	    },
	    baseLibs,

	    // -- All objects are loaded => can run
	    function() {

	    	// -- Init Stage or show IE popup
	    	if ( ! $.browser.msie  || ( $.browser.msie && $.browser.version >= 9 ) ) {
	    		Game.init() ;
	    	} else {
	    		alert('Sorry but this game only works in good navigators. Please download Google Chrome or Firefox' ) ;
	    	}

		}
	);


	/**************************************************************************
	* Game Controls Events
	***************************************************************************/

	// -- Game is loaded
	$(document).bind('gameLoaded', function(e, res) {

	});

	// -- Init Game
	$(document).bind('gameInit', function(e, res) {
		$(document).trigger('gameReset') ;
	}) ;

	// -- Game Reset
	$(document).bind('gameReset', function(e, res) {
		Game.score = 0 ;
		Game.loops = 0 ;
		Layouts.Ennemies.els = [] ;
		$('.sprite').remove() ;
		$.each(Layouts, function(key, val){
			Layouts[key].running = true ;
			$.each(val.els, function(key2, val2){
				if ( Layouts[key].els.length && Layouts[key].els[key2] ) {
					Layouts[key].els[key2].x = Layouts[key].els[key2].settings.origin.x ;
					Layouts[key].els[key2].y = Layouts[key].els[key2].settings.origin.y ;
				}
			}) ;
		}) ;

		$('#ground, #ship').fadeTo(500, 1) ;

		if ( timers.loopGame ) clearInterval(timers.loopGame) ;
		timers.loopGame = setInterval(Game.loopAnimation, 1000/FPS) ;
	}) ;

	// -- Start Animation
	$(document).bind('gameStart', function(e, res) {

		$('#hud').fadeIn(500) ;

		if ( timers.loopGame ) clearInterval(timers.loopGame) ;
		timers.loopGame = setInterval(Game.loopAnimation, 1000/FPS) ;
	}) ;

	// -- On Complete Launch
	$(document).bind('gameComplete', function(e, res) {

		// -- Stop layouts running
		$('.sprite').not('.explosion').remove() ;
		Layouts.Ennemies.running = false ;
		Layouts.Background.running = false ;

		// -- Show game over overlay
		$('#game-over:hidden').fadeIn(500) ;
		$('#ground, #ship').fadeTo(500, 0.2) ;

		// -- Play Sound
		soundManager.play('gameOver') ;

		// -- Stop loopAnimation
		if ( timers.loopGame ) clearInterval(timers.loopGame) ;

	}) ;


	// -- Bind Start Button
	$('#start-game').click(function() {
		soundManager.play('click') ;
		$('#game-intro:visible').fadeOut(500, function() {
			$(document).trigger('gameStart') ;
		}) ;
	}).hover(function() {
		$(this).addClass('hover') ;
	}, function() {
		$(this).removeClass('hover') ;
	}) ;


	// -- Bind Restart Screen controls
	$('#restart-game').click(function() {
		soundManager.play('click') ;
		$('#game-over:visible').fadeOut(500, function() {
			$(document).trigger('gameReset') ;
		}) ;
	}).hover(function() {
		$(this).addClass('hover') ;
	}, function() {
		$(this).removeClass('hover') ;
	}) ;


}) ;