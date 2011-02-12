
// -- Init the Background DIV
Layouts.Background = new Layout({

	// -- Define elements to draw with options
	el: [{
		id: 'ground',
		animate: function(obj) { 
			obj.y -= obj.parent.settings.speed*obj.parent.settings.direction;
			obj.parent.settings.dom.css({backgroundPosition: '0 '+obj.y+'px'}) ;
		}
	}],
	
	// -- Define current Speed
	speed: 5,
	direction: -1,
	
	// -- Define canvas parent
	dom: $('div#background')
	
}) ;

