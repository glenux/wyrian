	
	/**************************************************************************
	* SOUNDMANAGER CONFIG
	***************************************************************************/
	soundManager.useFlashBlock = false;
	soundManager.bgColor = '#ffffff';
	soundManager.debugMode = false;
	soundManager.url = 'http://patator.socialmixmedia.fr/assets/js/soundmanager/swf/';
	soundManager.wmode = 'transparent'; // hide initial flash of white on everything except firefox/win32	
	soundManager.allowScriptAccess = 'always'; 
	soundManager.useFastPolling = true; 
	soundManager.flashVersion = 9; 
	soundManager.flashLoadTimeout = 3000; 
	soundManager.useHTML5Audio = true;
	
	// -- when ready, preload sounds
	soundManager.onready(function() {

		
		// -- Click
		soundManager.createSound({
		  id: 'click',
		  url: '/assets/mp3/50559__broumbroum__sf3_sfx_menu_select_L.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  multiShot: false,
		  volume: 50
		});
		
		// -- Validate
		soundManager.createSound({
		  id: 'validate',
		  url: '/assets/mp3/50562__broumbroum__sf3_sfx_menu_validate_L.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  multiShot: false,
		  volume: 50
		});
		
		
		// -- Boom
		soundManager.createSound({
		  id: 'boom',
		  url: '/assets/mp3/boom.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  volume: 50
		});
		
		// -- Touch
		soundManager.createSound({
		  id: 'touch',
		  url: '/assets/mp3/hopping.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  volume: 50
		});
		
		// -- End
		soundManager.createSound({
		  id: 'endGame',
		  url: '/assets/mp3/fall-explosion.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  volume: 50
		});
		
		// -- Nitro
		soundManager.createSound({
		  id: 'nitro',
		  url: '/assets/mp3/rocket-burn.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  loops: 10,
		  volume: 50
		});
		
		
		// -- Mad Cow
		soundManager.createSound({
		  id: 'cow',
		  url: '/assets/mp3/cow.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  volume: 50
		});
		
		// -- Wizz
		soundManager.createSound({
		  id: 'wizz',
		  url: '/assets/mp3/siren.ogg',
		  autoLoad: true,
		  autoPlay: false,
		  volume: 50
		});
		
	});
	
	soundManager.ontimeout(function() {
		var smLoadFailWarning = 'Oh snap! : ' + (soundManager.hasHTML5 ? 'The flash portion of ' : '') + 'SoundManager 2 was unable to start. ';
		_log(smLoadFailWarning) ;
	});
	