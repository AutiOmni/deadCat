//SEARCH FUNCTION
$('.search-icon').click(function() {

    $('.search-bar').toggleClass('active-search');

    if ($('.search-bar').hasClass('active-search'))
    {
        $(".search-bar input[type=text]").focus();
    }
}) 

$('.search-text').on('keyup', function() {
 $('.search-text').val($('.search-text').val().toUpperCase());
})
