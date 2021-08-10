const upper = document.querySelectorAll('.upper')
const downer = document.querySelectorAll('.downer')

const symbolBox = document.querySelectorAll('.symbol-box')
// THESE FIRE ON LOAD TO GET THE TECH-IN ELEMENT READY FOR CLICK ------------------------
fillDownTech()
fillUpTech()
// CONFIGURE DOWN BOXES FOR FUNCTION ----------------------------
downer.forEach(down => {
        down.addEventListener('click', () => {
            if (down.classList.contains('active-down-symbol')) {

                    setTimeout(() => {
                    down.classList.remove('active-down-symbol')
                    }, 500)

                    animatedLoad() 

                } else {

                    removeDownClass()
                    removeUpClass()
                    animatedLoad()
                    expandDetract()

                    fillDownTech()

                    setTimeout(() => {
                    down.classList.add('active-down-symbol')
                    }, 500)
            }
        })
})
// CONFIGURE UP BOXES FOR FUNCTION ----------------------------
upper.forEach(up => {
    up.addEventListener('click', () => {
        if (up.classList.contains('active-up-symbol')) {

                    setTimeout(() => {
                    up.classList.remove('active-up-symbol')
                    }, 500)

                    animatedLoad() 

                } else {

                    removeUpClass()
                    removeDownClass()
                    animatedLoad()
                    expandDetract()

                    fillUpTech()

                    setTimeout(() => {
                    up.classList.add('active-up-symbol')
                     }, 500)
            }
    })
})

// THIS REMOVES DOWN CLASS FROM SYMBOLBOX ----------------------------
function removeDownClass() {
    downer.forEach(down => {
        setTimeout(() => {
            down.classList.remove('active-down-symbol')
        }, 500)
    })
}

// THIS REMOVES UP CLASS FROM SYMBOLBOX ----------------------------
function removeUpClass() {
    upper.forEach(up => {
        setTimeout(() => {
            up.classList.remove('active-up-symbol')
        }, 500)
    })
}

// THIS GIVE THE FEELING THAT INFO IS LOADED WHEN DOORS CLOSE ------------------------------
function expandDetract() {
    setTimeout(() => {
        symbolBox.forEach(box => {
            box.style.width = '30%'
        })
    }, 500)

}
// TECHNICAL ANALYSIS LOADING  ------------------------------------------
function animatedLoad() {
    symbolBox.forEach(box => {
        box.style.width = "50%"
    })
}

// need to get index # of thing clicked on - then have it match `tech-down-${index}` to fill html

var tech = document.getElementById('tech-in')

function fillDownTech() {

        for (const down of downer) {
         
            down.addEventListener('click', () => {

            let index = down.getAttribute('data-index') 

            const downerTech = document.querySelector(`.tech-down-${index}`)
            setTimeout(() => {
                tech.innerHTML = downerTech.innerHTML
            }, 500)
            })
        }   
}

function fillUpTech() {
    for (const up of upper) {
        up.addEventListener('click', () => {

        let index = up.getAttribute('data-index') 

        const upperTech = document.querySelector(`.tech-up-${index}`)
        setTimeout(() => {
            tech.innerHTML = upperTech.innerHTML
        }, 500)
        })
    }

}
