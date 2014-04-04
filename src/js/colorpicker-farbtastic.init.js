if (typeof $.fn.farbtastic != 'undefined') {
    (function($) {
        // farbtastic colorpicker
        if ($('#colorpicker').length)
            $('#colorpicker').farbtastic('#colorpickerColor');

        // farbtastic colorpicker
        if ($('#colorpicker1').length)
            $('#colorpicker1').farbtastic('#colorpickerColor1');
    })(jQuery);
}