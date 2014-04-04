if (typeof $.fn.prettyPhoto != 'undefined') {
    (function($) {
        if ($('[data-toggle="prettyPhoto"]').length)
            $('[data-toggle="prettyPhoto"]').prettyPhoto();
    })(jQuery);
}