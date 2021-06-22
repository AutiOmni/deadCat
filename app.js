const rowOne = document.getElementById('rowOne')
const rowTwo = document.getElementById('rowTwo')

let tickers = []
let myStocksNyse = []
let myStocksNas = []

regex = /A-Z/g

let j = 0
let nyseHolder = []
let nasdaqHolder = []
let combinedStockDrop = []

let tickersLength = 23485

async function tradableSymbols() {

    try {

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

  } catch(e) {

    console.log(e)
 }

}


/* ---------------------- NYSE DROP ------------------------- */

async function getNyseBottom() {
    try {

    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()

    for (let i = 0; i < data.length; i++) {
        if (data[i].changesPercentage < -5 && myStocksNyse.indexOf(data[i].symbol) > 0) {
      nyseHolder.push(data[i])
        }
    }
    console.log(nyseHolder)
    } catch(e) {
        console.log(e)
    }
  
}


/* ---------------------- NASDAQ DROP ------------------------- */

async function getNasdaqBottom() {
    try {
    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()

    for (let i = 0; i < data.length; i++) {
        if(data[i].changesPercentage < -5 && myStocksNas.indexOf(data[i].symbol) > 0) {
      nasdaqHolder.push(data[i])
        }
    }
    console.log(nasdaqHolder)
    } catch(e) {
        console.log(e)
    }
}



/* ---------------------- COMBINE AND SORT LARGEST DROP ------------------------- */
function compileStocks() {

rowOne.innerHTML = ''

/* ------- THIS IS A FILTER FOR WEIRD STOCK SYMBOLS THAT SLIP IN ----------*/ 


combinedStockDrop = combinedStockDrop.concat(nasdaqHolder, nyseHolder)
console.log(combinedStockDrop)

const keys = /[\W\d]/g
finalChart = combinedStockDrop.filter(stock => {
    return !stock.symbol.match(keys)
})
console.log(finalChart)

for (let i = 0; i < finalChart.length; i++) {
finalChart.sort((a,b) => {
    return a.changesPercentage - b.changesPercentage
    })
}

while (j < 4) {

    const {symbol, changesPercentage, price, change} = finalChart[j]

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
 
}

/*----- BUILD TO PAGE -----*/

async function buildToPage() {
    try {

    await tradableSymbols()
    await getNyseBottom()
    await getNasdaqBottom()
   
    compileStocks()

    } catch {
        console.log('Build To Page Error')
    }
}

buildToPage()