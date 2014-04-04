(function($)
{

	window.animations = true;

	window.animateElements = function()
	{
		// restore visibility
		$("#menu, .navbar.main, #footer").css('visibility', 'visible').show();

		// disable animations on touch devices
		if (Modernizr.touch)
			return;

		// // disable animations if browser doesn't support css transitions & 3d transforms
		if (!$('html.csstransitions.csstransforms3d').length)
			return;

		// animate sidebar
		$("#menu").addClass('animated fadeInLeft');

		// animate main navbar & footer
		$(".navbar.main").addClass('animated fadeInUp');
		$("#footer").addClass('animated fadeInUp');

		// animate tabs
		$('.widget-tabs .tab-pane').addClass('animated fadeInUp');

		// animate thumbnails
		$(".thumbnail")
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInDown');
			}, 200*k);
		});

		// animate thumbnails
		$(".thumb")
		.filter(function(index) {
			return !$(this).closest('.list-group-item').length;
		})
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInDown');
			}, 100*k);
		});

		// animate dashboard friend list
		$(".friends-list > li")
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInUp');
			}, 150*k);
		});

		// animate statistical widgets
		$(".widget-stats")
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInDown');
			}, 200*k);
		});

		// animate generic widgets
		$(".box-generic")
		.filter(function(){
			return !$(this).parents('.timeline-activity').length;
		})
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInUp');
			}, 250*k);
		});
	}

	// animate only after page finished loading
	$(window).on('load', function()
	{
		animateElements();

		// animate page exits
		$('body')
		.on('click', 'a', function(e)
		{
			if (typeof $.LazyJaxDavis != 'undefined')
				return true;

			if ($(this).is('.ajaxify')) 
				return true;

			if ($(this).is('[data-edit]') || $(this).is('[data-gallery]') || $(this).is('.no-ajaxify') || $(this).is('[data-toggle]') || $(this).is('[data-dismiss]') || $(this).attr('target') == '_blank')
				return true;

			if ($(this).is('.not-animated'))
				return true;

			if ($(this).parents('.bootstrap-select').length)
				return true;

			if ($(this).attr('href') == '#')
				return true;

			if ($(this).attr('href').substring(0,11) == "javascript:")
    			return true;

			e.preventDefault();
			var t = $(this);

			$('body').addClass('animated fadeOutLeft');
			setTimeout(function()
			{
				if (t.attr('href') == '#')
					location.reload();
				else
					location = t.attr('href');
			}, 
			500);
		});

		// resize nicescroll areas after animations ended
		setTimeout(function(){
			resizeNiceScroll();
		}, 1000);

	});

})(jQuery);