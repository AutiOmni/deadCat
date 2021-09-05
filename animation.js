$(document).ready(function() {
    $('#hero-text').css('transform', 'translateX(0%)')
    $('#deadCat').css('transform', 'translateX(0%)')
})



$('#deadCat').hover(function() {
    $(this).css('transform', 'rotate(10deg) scale(1.05)')
    
    setTimeout(() => {
        $(this).css('transform', 'rotate(-10deg) scale(1.05)')
    }, 250)

    setTimeout(() => {
        $(this).css('transform', 'rotate(0deg) scale(1)')
    }, 500)
})

var windowTop = window.pageYOffset


$(window).scroll(function() {
    var windowTop = window.pageYOffset;
    var topInfoOne = $('.info-cont-one').offset().top

    var topInfoTwo = $('.confused-chart').offset().top

    var topInfoThree = $('.selector-info').offset().top
console.log(topInfoThree, windowTop)
	if ((windowTop * 3) > topInfoOne)
    {
        $('.info-cont-one').addClass('active-info-one')
    }

	if ((windowTop * 1.5) > topInfoTwo)
    {
        $('.confused-chart-right').addClass('active-info-two-r')
        $('.confused-chart-left').addClass('active-info-two-l')
    }

	if (windowTop * 1.25 > topInfoThree)
    {
        $('.selector-info-r').addClass('active-info-three')
        $('.selector-info-l').addClass('active-info-three')
    }


});
