if (typeof $.fn.dropzone != 'undefined') {
    (function($) {
        if (typeof Dropzone != 'undefined')
            Dropzone.autoDiscover = false;

        
        var zones = $('.dropzone');
        if (zones && zones.dropzone) {
            zones.dropzone();
        }

    })(jQuery);
}