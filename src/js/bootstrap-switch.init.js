if (typeof $.fn.bootstrapSwitch != 'undefined') {
    (function($) {
        if ($('.make-switch').length)
            $('.make-switch:not(.has-switch)').bootstrapSwitch();
    })(jQuery);
}