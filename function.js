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
                upper.removeClass('active-up-symbol')
                
            }, 500)
        } else {

            removeDownClass()
            removeUpClass()
            expandDetract()
            animatedLoad()

          
            setTimeout(() => {
                $(this).addClass('active-up-symbol')
            })
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

    