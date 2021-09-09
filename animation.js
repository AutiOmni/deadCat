$(document).ready(function() {
    $('#hero-text').css('transform', 'translateX(0%)')
    $('#deadCat').css('transform', 'translateX(0%)')
})



$('#deadCat').mouseenter(function() {
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

    var topInfoTwoL = $('.confused-chart-left').offset().top

    var topInfoTwoR = $('.confused-chart-right').offset().top

    var topInfoThreeR = $('.selector-info-r').offset().top
    var topInfoThreeL = $('.selector-info-l').offset().top


	if ((windowTop * 1.75) > topInfoOne)
    {
        $('.info-cont-one').addClass('active-info-one')
    }

	if ((windowTop * 1.75) > topInfoTwoR)
    {
        $('.confused-chart-right').addClass('active-info-two-r')
       
    }

	if ((windowTop * 1.75) > topInfoTwoL)
    {
        $('.confused-chart-left').addClass('active-info-two-l')       
    }

	if ((windowTop * 1.75) > topInfoThreeR)
    {
        $('.selector-info-r').addClass('active-info-three-r')
    }
	if ((windowTop * 1.75) > topInfoThreeL)
    {
        $('.selector-info-l').addClass('active-info-three-l')
    }


});
