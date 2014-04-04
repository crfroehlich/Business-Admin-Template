(function($)
{
	if (!Modernizr.touch && $('#menu').is(':visible'))
		$('.container-fluid').removeClass('menu-hidden');

	if (Modernizr.touch)
		$('#menu').removeClass('hidden-xs');

	// handle menu toggle button action
	window.toggleMenuHidden = function()
	{
		if ($('.menu-right-visible').length)
			$('body').removeClass('menu-right-visible');

		$('.container-fluid').toggleClass('menu-hidden');
		$('body').toggleClass('menu-left-visible');
		$('#menu').removeClass('hidden-xs');

		resizeNiceScroll();
	}

	// main menu visibility toggle
	$('.navbar.main .btn-navbar, #menu .btn-navbar').click(function()
	{
		toggleMenuHidden();
	});

})(jQuery);