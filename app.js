const rowOne = document.getElementById('rowOne')
const rowTwo = document.getElementById('rowTwo')

let ticker = []

const url = 'https://financialmodelingprep.com/api/v3/losers?apikey=4d4593bc9e6bc106ee9d1cbd6400b218'

async function derpy() {
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
    } catch {
        console.log('Error')
    }
}

derpy()

function createFeed() {

fetch(url)
.then(res => res.json())
.then(data => {

  

    for (let i = 0; i < 5; i++) {


    const {ticker, changesPercentage, price, changes} = data[i]

        let urlTwo = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`

        fetch(urlTwo)
            .then(res => res.json())
            .then(dataTwo => {
                
                const {avgVolume, volume} = dataTwo[0]

                

                const volIncrease = (volume - avgVolume) / avgVolume * 100

                var volumeChange = volIncrease.toFixed(0)
                
                const nerpy = document.createElement('div')
                nerpy.classList.add('text-center')
                nerpy.classList.add('col', 'border', 'p-2')
                nerpy.innerHTML = `<h3 id="current-price">Volume Change:${volumeChange}%</h3>`
                rowTwo.appendChild(nerpy)
                
            })
            


   /* THIS CREATES THE DIV */     

    const derpy = document.createElement('div')
    derpy.classList.add('text-center')
    derpy.classList.add('col', 'border', 'p-2')
    derpy.innerHTML = `<h2 id="ticker">${ticker}</h2>
    <h3 id="percentage-down">Down: ${changesPercentage}</h3>
    <h3 id="share-price-change">Share Price Change:$${changes}</h3>
    <h3 id="current-price">Current Price: $${price}</h3>`
    rowOne.appendChild(derpy)
    }

}).catch(error => {
    console.log(('Error Depr'), error)
})
 


}
createFeed() 

let holder = []

async function getBottom() {
    
    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        if (data[i].changesPercentage < -10) {
        holder.push([data[i].symbol, data[i].changesPercentage])
        }
    }

    console.log(holder)
   
}

getBottom()

