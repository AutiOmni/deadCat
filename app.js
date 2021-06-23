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

 /// date

const today = new Date
const year = today.getFullYear()
let date = today.getDate()
if (date < 10) {
    date = `0${month}`
}
let month = today.getMonth() + 1
if (month < 10) {
    month = `0${month}`
}
const hour = today.getHours()
const min = today.getMinutes()

const todayDate = `${year}-${month}-${date}`


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


// ---------------------- NYSE DROP ------------------------- 

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


//---------------------- NASDAQ DROP ------------------------- 

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



//---------------------- COMBINE AND SORT LARGEST DROP ------------------------- 
async function compileStocks() {


rowOne.innerHTML = ''

/* ------- THIS IS A FILTER FOR WEIRD STOCK SYMBOLS THAT SLIP IN ----------*/ 


combinedStockDrop = combinedStockDrop.concat(nasdaqHolder, nyseHolder)
console.log(combinedStockDrop)

const keys = /^[A-Z]{1,4}$/g
finalChart = combinedStockDrop.filter(stock => {
    return stock.symbol.match(keys)
})
console.log(finalChart)

for (let i = 0; i < finalChart.length; i++) {
finalChart.sort((a,b) => {
    return a.changesPercentage - b.changesPercentage
    })
}

//this is what builds to page

let tempVWAP = []
let finalVWApArr = []
let dateTimeLength = []
let x = 0
while (j < 6) {
    
    const {symbol, changesPercentage, price, change, dayHigh, dayLow, avgVolume, volume} = finalChart[j]
    
    // VWAP FUNCTION 
            async function vwap() {
                const res = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
                const data = await res.json()
            
                let tpvCul = 0
                let volumeCul = 0
                //THIS IS FOR GETTING THE DAY LENGTH
                while (data[x].date.slice(0,10) === todayDate) {
                    dateTimeLength.push('interval')
                    x++
                }
               //THIS IS FOR CALCULATING THE VWAP AND PUSHING TO 
                for (let i = 0; i < dateTimeLength.length; i++) {

                    const {volume, high, close, low, date} = data[i];   
                    const tpv = (high + low + close) / 3;
            
                    if (date.slice(0,10) === todayDate) {
                    tpvCul += (tpv * volume)
                    volumeCul += volume
                    }
                    vwapFinal = tpvCul / volumeCul //THIS IS VWAP!!!!!!!!
                    tempVWAP.unshift(vwapFinal.toFixed(2))
                }
                console.log(dateTimeLength)
                finalVWApArr.push(tempVWAP[0])
                console.log(finalVWApArr)
                tempVWAP = []
            };

           await vwap() // AWAITING VWAP CALC
    
    
    changesPercentagePositive = changesPercentage * -1

    const litterBox = document.createElement('div')
    litterBox.classList.add('col-lg-6', 'p-3', 'border', 'text-center')
    litterBox.innerHTML = `<div class="row">
    <h2 id="symbol">${symbol}</h2>
    <h3><i class="fas fa-long-arrow-alt-down mx-2" id="percentage-down"></i>${changesPercentagePositive}%</h3>
    </div>
    <div class="row mt-3">
    <h3 class="col-6" id="share-price-change">Share Price Loss
    <span class="d-block"> $ ${change.toFixed(2)}</span></h3>
    <h3 class="col-6" id="current-price">Current Price 
    <span class="d-block"> $ ${price.toFixed(2)}</span></h3>
    </div>
    <div class="row mt-3">
    <h3 class="col-6" id="share-price-change">Today's Volume
    <span class="d-block"> ${volume}</span></h3>
    <h3 class="col-6" id="current-price">Average Daily Volume
    <span class="d-block">${avgVolume}</span></h3>
    <span class="d-block">Five Minute VWAP: $${finalVWApArr[j]}</span></h3>
    </div>
    `
    rowOne.appendChild(litterBox)
    j++

  } // LOOP END
 derpy = []
} // FUNCTION END

//----- BUILD TO PAGE -----

async function buildToPage() {

    try {

    await tradableSymbols()
    await getNyseBottom()
    await getNasdaqBottom()
   
    compileStocks()

    } catch(e) {
        console.log('Build-To-Page Error'(e))
    }
            // -------------------- RESET HOLDERS
            tickers = []
            myStocksNyse = []
            myStocksNas = []

            j = 0

            nyseHolder = []
            nasdaqHolder = []
            combinedStockDrop = []
}

buildToPage()

//setInterval(buildToPage, 10000)

// --------------------- DATE FOR GETTING HISTORICAL DATA


/*
// ------------- TPV FORMULA ------------------------------
let vwapHolder = []

async function vwap() {
    const res = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/5min/AHT?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
    const data = await res.json()

    let tpvCul = 0
    let volumeCul = 0

    for (let i = 0; i < 78; i++) {

        const {volume, high, close, low, date } = data[i];   
        const tpv = (high + low + close) / 3;

        if (date.slice(0,10) === todayDate) {
           tpvCul += (tpv * volume)
           volumeCul += volume
        }
        vwapFinal = tpvCul / volumeCul //THIS IS VWAP!!!!!!!!
        vwapHolder.push(vwapFinal.toFixed(2))
       
    }
    console.log(vwapHolder)
}


vwap()*/
