if (typeof $.fn.multiSelect != 'undefined') {
    $(function() {
        /*
     * Multiselect
     */
        var multi1 = $('#multiselect-optgroup');
        if (multi1 && multi1.multiSelect) {
            $('#multiselect-optgroup').multiSelect({ selectableOptgroup: true });
            $('#pre-selected-options').multiSelect();
            $('#multiselect-custom').multiSelect({
                selectableHeader: "<div class='custom-header'>Selectable items</div>",
                selectionHeader: "<div class='custom-header'>Selection items</div>",
                selectableFooter: "<div class='custom-header custom-footer'>Selectable footer</div>",
                selectionFooter: "<div class='custom-header custom-footer'>Selection footer</div>"
            });
        }
    });
}