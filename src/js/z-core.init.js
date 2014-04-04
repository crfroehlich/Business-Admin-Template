/* Remove Envato Frame */
if (window.location != window.parent.location)
    top.location.href = document.location.href;

(function($, window)
{

    // fix for safari back button issue
    window.onunload = function(){};

    $.expr[':'].scrollable = function( elem ) 
    {
      var scrollable = false,
          props = [ '', '-x', '-y' ],
          re = /^(?:auto|scroll)$/i,
          elem = $(elem);
      
      $.each( props, function(i,v){
        return !( scrollable = scrollable || re.test( elem.css( 'overflow' + v ) ) );
      });
      
      return scrollable;
    };

    window.beautify = function (source)
    {
        var output,
            opts = {};

        opts.preserve_newlines = false;
        output = html_beautify(source, opts);
        return output;
    }

    // generate a random number within a range (PHP's mt_rand JavaScript implementation)
    window.mt_rand = function (min, max) 
    {
        var argc = arguments.length;
        if (argc === 0) {
            min = 0;
            max = 2147483647;
        }
        else if (argc === 1) {
            throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
        }
        else {
            min = parseInt(min, 10);
            max = parseInt(max, 10);
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // scroll to element animation
    function scrollTo(id)
    {
        if ($(id).length)
            $('html,body').animate({scrollTop: $(id).offset().top},'slow');
    }

    window.resizeNiceScroll = function()
    {
        if (typeof $.fn.niceScroll == 'undefined')
            return;

        setTimeout(function(){
            $('.hasNiceScroll, #menu').getNiceScroll().show().resize();
            if ($('.container-fluid').is('.menu-hidden'))
                $('#menu').getNiceScroll().hide();
        }, 100);
    }

    // $('#content .modal').appendTo('body');
    
    // tooltips
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
    
    // popovers
    $('[data-toggle="popover"]').popover();
    
    // print
    $('[data-toggle="print"]').click(function(e)
    {
        e.preventDefault();
        window.print();
    });
    
    // carousels
    $('.carousel').carousel();
    
    // Google Code Prettify
    if ($('.prettyprint').length && typeof prettyPrint != 'undefined')
        prettyPrint();

    $('[data-toggle="scrollTo"]').on('click', function(e){
        e.preventDefault();
        scrollTo($(this).attr('href'));
    });

    $('ul.collapse')
    .on('show.bs.collapse', function(e)
    {
        e.stopPropagation();
        $(this).closest('li').addClass('active');
    })
    .on('hidden.bs.collapse', function(e)
    {
        e.stopPropagation();
        $(this).closest('li').removeClass('active');
    });

    window.enableContentNiceScroll = function(hide)
    {
        if ($('html').is('.ie') || Modernizr.touch)
            return;

        if (typeof $.fn.niceScroll == 'undefined')
            return;

        if (typeof hide == 'undefined')
            var hide = true;

        $('#content .col-app, .col-separator, .applyNiceScroll')
        .filter(':scrollable')
        .not('.col-unscrollable')
        .filter(function(){
            return !$(this).find('> .col-table').length;
        })
        .addClass('hasNiceScroll')
        .each(function()
        {
            $(this).niceScroll({
                horizrailenabled: false,
                zindex: 2,
                cursorborder: "none",
                cursorborderradius: "0",
                cursorcolor: primaryColor
            });

            if (hide == true)
                $(this).getNiceScroll().hide();
            else
                $(this).getNiceScroll().resize().show();
        });
    }

    window.disableContentNiceScroll = function()
    {
        $('#content .hasNiceScroll').getNiceScroll().remove();
    }

    enableContentNiceScroll();

    if ($('html').is('.ie'))
        $('html').removeClass('app');

    if (typeof $.fn.niceScroll != 'undefined')
    {
        $('#menu > div')
        .add('#menu_kis > div')
        .addClass('hasNiceScroll')
        .niceScroll({
            horizrailenabled: false, 
            zindex: 2,
            cursorborder: "none",
            cursorborderradius: "0",
            cursorcolor: primaryColor
        }).hide();
    }

    if ($('#sidebar-discover-wrapper.mini').length)
        $('body').addClass('sidebar-discover-mini');

    if (typeof coreInit == 'undefined')
    {
        $('body')
        .on('mouseenter', '.navbar.main [data-toggle="dropdown"]', function()
        { 
            if (!$(this).parent('.dropdown').is('.open'))
                $(this).click();
        });
    }
    else {
        $('[data-toggle="dropdown"]').dropdown();
    }

    $('.navbar.main')
    .on('mouseleave', function(){
        $(this).find('.dropdown.open').find('> [data-toggle="dropdown"]').click();
    });

    $('[data-height]').each(function(){
        $(this).css({ 'height': $(this).data('height') });
    });

    $('.app [data-toggle="tab"]')
    .on('shown.bs.tab', function(e)
    {
        $('.hasNiceScroll').getNiceScroll().resize();
    });

    $(window).setBreakpoints({
        distinct: false,
        breakpoints: [ 768, 992 ]
    });

    $(window).bind('exitBreakpoint768',function() {		
        $('.container-fluid').addClass('menu-hidden');
    });

    $(window).bind('enterBreakpoint768',function() {
        $('.container-fluid').removeClass('menu-hidden');
    });

    $(window).bind('exitBreakpoint992',function() {		
        disableContentNiceScroll();
    });

    $(window).bind('enterBreakpoint992',function() {
        enableContentNiceScroll(false);
    });

    window.coreInit = true;
    
    $(window).on('load', function()
    {
        window.loadTriggered = true;

        if ($(window).width() < 992)
            $('.hasNiceScroll').getNiceScroll().stop();

        if (typeof animations == 'undefined')
            $('.hasNiceScroll, #menu').getNiceScroll().show().resize();

        if (typeof Holder != 'undefined')
        {
            Holder.add_theme("dark", {background:"#424242", foreground:"#aaa", size:9}).run();
            Holder.add_theme("white", {background:"#fff", foreground:"#c9c9c9", size:9}).run();
        }

        if ($('.scripts-async').length)
            $('.scripts-async .container-fluid').css('visibility', 'visible');
    });

    // weird chrome bug, sometimes the window load event isn't triggered
    setTimeout(function(){
        if (!window.loadTriggered)
            $(window).trigger('load');
    }, 2000);

})(jQuery, window);