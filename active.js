//SEARCH FUNCTION
$('.search-icon').click(function() {
    $('.search-bar').toggleClass('active-search')
}) 

$('.search-text').on('keyup', function() {
 $('.search-text').val($('.search-text').val().toUpperCase());
})
