if (typeof $.fn.uniform != 'undefined') {
    (function($) {
        if ($('.uniformjs').length)
            $('.uniformjs').find(":checkbox, :radio").uniform();
    })(jQuery);
}