if (typeof $.fn.bootpag != 'undefined') {
    $(function() {
        /* 
     * JQuery Pagination Examples 
     */
        var pagination = $('.jquery-bootpag-pagination');
        if (pagination && pagination.bootpag) {
            pagination.bootpag({
                total: 23,
                page: 1,
                maxVisible: 10
            }).on('page', function(event, num) {
                $(".jquery-bootpag-content").html("Page " + num); // or some ajax content loading ...
            });
        }
    });
}