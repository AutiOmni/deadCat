const upper = $('.upper')
const downer = $('.downer')
let techIn = $('#tech-in')

const symbolBox = $('.symbol-box')
// THESE FIRE ON LOAD TO GET THE TECH-IN ELEMENT READY FOR CLICK ------------------------
//fillDownTech()
//fillUpTech()
// CONFIGURE DOWN BOXES FOR FUNCTION ----------------------------

downer.each(function() {
    $(this).click(function() {
        if ($(this).hasClass('active-down-symbol')) {

            animatedLoad() 
            setTimeout(() => {
                $(this).removeClass('active-down-symbol')
            }, 500)

            

        } else {

           

            removeDownClass()
            removeUpClass()

            moveTechToTop()

            animatedLoad()
            expandDetract()

      

            setTimeout(() => {
                $(this).addClass('active-down-symbol')
            }, 500)
        }
    })
});

upper.each(function() {
    $(this).click(function() {
        if ($(this).hasClass('active-up-symbol')) {

            animatedLoad() 

            setTimeout( () => {
                $(this).removeClass('active-up-symbol')
                
            }, 500)

           
        } else {




            removeUpClass()
            removeDownClass()

            moveTechToTop()

            expandDetract()
            animatedLoad()

          
            setTimeout(() => {
                $(this).addClass('active-up-symbol')
            }, 500)
        }
    })
})



    function removeDownClass() {
        downer.removeClass('active-down-symbol')
        }

    function removeUpClass() {
        upper.removeClass('active-up-symbol')
    }    

    function expandDetract() {
        setTimeout(() => {
            symbolBox.each(function() {
                $(this).css('width', '30%')
            })
        }, 500)
    }

    function animatedLoad() {
        symbolBox.each(function() {
            $(this).css('width', '50%')
        })
    }
// FILL TECHNICAL INDICATORS WITH THESE
    function fillDownTech() {
        downer.each(function() {
            $(this).click(function() {

                let index = $(this).attr('data-index')
                
                let downerTech = $(`.tech-down-${index}`).html()
                setTimeout(() => {
                    techIn.html(downerTech) 
                }, 500)
            })
        })
    }

    fillDownTech()

    function fillUpTech() {
        upper.each(function() {
            $(this).click(function() {

              
                let index = $(this).attr('data-index')
                
                let upperTech = $(`.tech-up-${index}`).html()
                setTimeout(() => {
                    techIn.html(upperTech)
                }, 500)
            })
        })
              
    }

    fillUpTech()


  // MOVES TECH-IN TO TOP AFTER EACH SYMBOL CLICK  
    function moveTechToTop() {
        setTimeout(() => {
            $('#tech-in').scrollTop(0)
        }, 500)
    }
//SEARCH FUNCTION
   $('.search-icon').click(function() {
       $('.search-bar').toggleClass('active-search')
   }) 

   $('.search-text').on('keyup', function() {
    $('.search-text').val($('.search-text').val().toUpperCase());
   })