	
	/**************************************************************************
	* SOUNDMANAGER CONFIG
	***************************************************************************/
	soundManager.useFlashBlock = false;
	soundManager.bgColor = '#ffffff';
	soundManager.debugMode = false;
	soundManager.url = 'js/libs/soundmanager/swf/';
	soundManager.wmode = 'transparent'; // hide initial flash of white on everything except firefox/win32	
	soundManager.allowScriptAccess = 'always'; 
	soundManager.useFastPolling = true; 
	soundManager.flashVersion = 9; 
	soundManager.flashLoadTimeout = 3000; 
	soundManager.useHTML5Audio = true;
	
	// -- when ready, preload sounds
	soundManager.onready(function() {

		// -- Background Music
		soundManager.createSound({
		  id: 'music',
		  url: 'audio/bg_music.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  multiShot: false,
		  volume: 10,
		  loop: true,
		  onload: function() {
		  	var soundObj = this;
		  	setTimeout(function() {
		  		soundObj.play() ;
		  	}, 1000) ;
  		  },
  		  onfinish: function() {
		    this.play();
  		  }
		});
		
		// -- Click 
		soundManager.createSound({
		  id: 'click',
		  url: 'audio/click.ogg',
		  autoLoad: false,
		  autoPlay: false,
		  multiShot: false,
		  volume: 50
		});
		
		// -- Fire
		soundManager.createSound({
		  id: 'shoot',
		  url: 'audio/big_laser.ogg',
		  autoLoad: false,
		  autoPlay: false,
		  multiShot: true,
		  volume: 30
		});
		
		// -- Explode
		soundManager.createSound({
		  id: 'explode',
		  url: 'audio/explode.ogg',
		  autoLoad: false,
		  autoPlay: false,
		  multiShot: true,
		  volume: 10
		});
		
		// -- Game Over
		soundManager.createSound({
		  id: 'gameOver',
		  url: 'audio/game-over.ogg',
		  autoLoad: false,
		  autoPlay: false,
		  multiShot: true,
		  volume: 10
		});
		
		
	});
	
	soundManager.ontimeout(function() {
		var smLoadFailWarning = 'Oh snap! : ' + (soundManager.hasHTML5 ? 'The flash portion of ' : '') + 'SoundManager 2 was unable to start. ';
		_log(smLoadFailWarning) ;
	});
	