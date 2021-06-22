const rowOne = document.getElementById('rowOne')
const rowTwo = document.getElementById('rowTwo')

let tickers = []
let myStocksNyse = []
let myStocksNas = []


let j = 0
let nyseHolder = []
let nasdaqHolder = []
let combinedStockDrop = []

let tickersLength = 23485
async function apr() {
    const res = await fetch('https://financialmodelingprep.com/api/v3/available-traded/list?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()
    tickers.push(data)
    for (let i = 0; i < tickersLength; i++) {
        if (tickers[0][i].exchange === 'New York Stock Exchange') {
            myStocksNyse.push(tickers[0][i].symbol)
        } else if (tickers[0][i].exchange === 'Nasdaq Global Select') {
            myStocksNas.push(tickers[0][i].symbol)
        }
    }
  console.log(myStocksNyse, myStocksNas)
}

apr()

/*
async function getNyseB() {
   
    const res = await fetch('http://api.marketstack.com/v1?access_key=639c314e89747310d83acee2912614dc');
    const data = await res.json();
    console.log(data)
    
}



    getNyseB() 

*/
/*

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
            


   /* THIS CREATES THE DIV     

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

*/ 


function generateStocks() {



/* ---------------------- NYSE DROP ------------------------- */


async function getNyseBottom() {

    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()

    function pushItNye() {

    for (let i = 0; i < data.length; i++) {
        if (data[i].changesPercentage < -10 && myStocksNyse.indexOf(data[i].symbol) > 0) {
      nyseHolder.push(data[i])
        }
    }
    console.log(nyseHolder)
}

pushItNye()
}

getNyseBottom()

/* ---------------------- NASDAQ DROP ------------------------- */

async function getNasdaqBottom() {

    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()

    function pushItNas() {

    for (let i = 0; i < data.length; i++) {
        if(data[i].changesPercentage < -10 && myStocksNas.indexOf(data[i].symbol) > 0) {
      nasdaqHolder.push(data[i])
        }
    }
console.log(nasdaqHolder)
}

pushItNas()
}

getNasdaqBottom()



}

setTimeout(generateStocks, 2500)



function makeIt() {


/* ---------------------- COMBINE AND SORT LARGEST DROP ------------------------- */

rowOne.innerHTML = ''

combinedStockDrop = combinedStockDrop.concat(nasdaqHolder, nyseHolder)

for (let i = 0; i < combinedStockDrop.length; i++) {
combinedStockDrop.sort((a,b) => {
    return a.changesPercentage - b.changesPercentage
    })
}

while (j < 4) {

    const {symbol, changesPercentage, price, change} = combinedStockDrop[j]

    changesPercentagePositive = changesPercentage * -1

    const litterBox = document.createElement('div')
    litterBox.classList.add('col-lg-6', 'p-3', 'border', 'text-center')
    litterBox.innerHTML = `<div class="row">
    <h2 id="symbol">${symbol}</h2>
    <h3><i class="fas fa-long-arrow-alt-down mx-2" id="percentage-down"></i>${changesPercentagePositive}%</h3>
    </div>
    <div class="row">
    <h3 class="col-6" id="share-price-change">Share Price Loss
    <span class="d-block"> $ ${change}</span></h3>
    <h3 class="col-6" id="current-price">Current Price 
    <span class="d-block"> $ ${price}</span></h3>
    </div>`
    rowOne.appendChild(litterBox)

    j++

}
console.log(combinedStockDrop)
}


setTimeout(makeIt, 5000)

/*console.log(combinedStockDrop)*/
