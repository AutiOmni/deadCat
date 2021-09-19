$(document).ready(function() {
    $('#hero-text').css('transform', 'translateX(0%)')
    $('#deadCat').css('transform', 'translateX(0%)')
})

if ($(window).width() > 800) {

    $('#deadCat').mouseenter(function() {
        $(this).css('transform', 'rotate(10deg) scale(1.05)')
        
        setTimeout(() => {
            $(this).css('transform', 'rotate(-10deg) scale(1.05)')
        }, 250)

        setTimeout(() => {
            $(this).css('transform', 'rotate(0deg) scale(1)')
        }, 500)
    })

}
else 
{
    $('#deadCat').click(function() {
        $(this).css('transform', 'rotate(10deg) scale(1.05)')
        
        setTimeout(() => {
            $(this).css('transform', 'rotate(-10deg) scale(1.05)')
        }, 250)

        setTimeout(() => {
            $(this).css('transform', 'rotate(0deg) scale(1)')
        }, 500)
    })
}

var windowTop = window.pageYOffset

$(window).scroll(function() {
    var windowTop = window.pageYOffset;
    var topInfoOne = $('.info-cont-one').offset().top

    var topInfoTwoL = $('.confused-chart-left').offset().top

    var topInfoTwoR = $('.confused-chart-right').offset().top

    var topInfoThreeR = $('.selector-info-r').offset().top
    var topInfoThreeL = $('.selector-info-l').offset().top

    var topInfoConfCover = $('.confused-cover').offset().top
    var topInfoChoiceCover = $('.choice-cover').offset().top


	if ((windowTop * 3.5) > topInfoOne)
    {
        $('.info-cont-one').addClass('active-info-one')
    }

	if ((windowTop * 1.25) > topInfoConfCover)
    {
        $('.confused-cover').css('transform', 'translateX(100%)') 
    }


	if ((windowTop * 1.25) > topInfoTwoR)
    {
        $('.confused-chart-right').addClass('active-info-two-r')
    }

	if ((windowTop * 1.25) > topInfoTwoL)
    {
        $('.confused-chart-left').addClass('active-info-two-l')       
    }

    if ((windowTop * 1.5) > topInfoChoiceCover)
    {
        $('.choice-cover').css({'opacity': '0', 'z-index': '0'});
        $('#download').css('background-color', 'var(--main-background)');

    }

	if ((windowTop * 1.45) > topInfoThreeR)
    {
        $('.selector-info-r').addClass('active-info-three-r')
    }
	if ((windowTop * 1.45) > topInfoThreeL)
    {
        $('.selector-info-l').addClass('active-info-three-l')
        for (let i = 1; i <= 5; i++) {
            setTimeout(() => {
                $(`.alert-fly-${i}`).css('transform', 'translate(0%, 0%)');
            }, `${i}50`)
        }
    }

     // different animation per window size


});


if ($(window).width() < 800) {

    for (let i = 1; i <= 5; i++) {
        $(`.alert-fly-${i}`).css('transform', 'translate(0%, 100%)');
    }
}
else 
{
    for (let i = 1; i <= 5; i++) {
        $(`.alert-fly-${i}`).css('transform', 'translate(100%, 0%)');
    }
}