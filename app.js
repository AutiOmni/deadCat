const rowOne = document.getElementById('rowOne')
const rowTwo = document.getElementById('rowTwo')







 /// DATE REFERENCE

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

// ------------------- TRADABLE STOCK TICKERS --------------------------------------------------------------------------------------------------
let tickers = []
async function tradableSymbols() {
    try {
    const res = await fetch('https://financialmodelingprep.com/api/v3/available-traded/list?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()

    tickers.push(data) // YOU COULD LITERALLY COPY THIS AND HAVE IT IN THE CODE INSTEAD OF FETCHING EVERYTIME
        console.log(tickers)
    for (let i = 0; i < tickers[0].length; i++) {
            if (tickers[0][i].exchange === 'New York Stock Exchange') {
                myStocksNyse.push(tickers[0][i].symbol)
            } else if (tickers[0][i].exchange === 'Nasdaq Global Select') {
                myStocksNas.push(tickers[0][i].symbol)
            }
        }
            } catch(e) {
                console.log(e)
            }

}


// ---------------------- NYSE DROP -------------------------------------
let myStocksNyse = []
let nyseHolder = []
async function getNyseBottom() {
    try {

    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()

    for (let i = 0; i < data.length; i++) {
        if (data[i].changesPercentage < -5 && myStocksNyse.indexOf(data[i].symbol) > 0 && data[i].price > 1) {
      nyseHolder.push(data[i])
        }
    }
   
    } catch(e) {
        console.log(e)
    }
  
}

//---------------------- NASDAQ DROP ------------------------- 
let myStocksNas = []
let nasdaqHolder = []
async function getNasdaqBottom() {
    try {
    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()

    for (let i = 0; i < data.length; i++) {
        if(data[i].changesPercentage < -5 && myStocksNas.indexOf(data[i].symbol) > 0 && data[i].price > 1) {
      nasdaqHolder.push(data[i])
        }
    }
  
    } catch(e) {
        console.log(e)
    }
}

//---------------------- COMBINE AND SORT LARGEST DROP ------------------------- 
let combinedStockDrop = []
let finalChart = [] // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE THE OBJECTS
async function compileStocks() {

/* ------- THIS IS A FILTER FOR WEIRD STOCK SYMBOLS THAT SLIP IN ----------*/ 


combinedStockDrop = combinedStockDrop.concat(nasdaqHolder, nyseHolder)

const keys = /^[A-Z]{1,4}$/g
finalChart = combinedStockDrop.filter(stock => {
    return stock.symbol.match(keys)
})

for (let i = 0; i < finalChart.length; i++) {
finalChart.sort((a,b) => {
    return a.changesPercentage - b.changesPercentage
    })
  }
} 


// ---------------------- FILL WITH TECHNICAL INDICATORS
let tempVWAP = [] // HOLD VWAP PERIOD - TAKES FROM 0 INDEX FOR CURRENT
async function technicalIndicators() {

let j = 0


while (j < 10) { // VWAP LOOP

 // THIS IS THE ALL MIGHTY SYMBOL
 const {symbol} = finalChart[j]

    // ------------------- SMA --------------------------------------------------------------------------------------------------

    const resSMA = await  fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
    const dataSMA = await resSMA.json()
        let culSMA = 0

        // ------- SMA INDEX IS - 1 FROM TOTAL BECAUSE OF 0 INDEX = 1 -------------------- 
        let fiveTeenSMA = 14
        let twentySMA = 19
        let thirtySMA = 29
        let fiftySMA = 49
        let hunSMA = 99
        let twoHunSMA = 199

                            // ------------- 15 DAY SMA -------------------------------
            if (dataSMA.historical.length <= 15) {
                finalChart[j].smaFiveTeen = 'Insufficient Data'
            } else {
                while (fiveTeenSMA >= 0) {
                    culSMA += dataSMA.historical[fiveTeenSMA].close
                    fiveTeenSMA--
                    }
                    let smaFiveResult = (culSMA / 15) 
                    finalChart[j].smaFiveTeen = smaFiveResult.toFixed(2) 
                    culSMA = 0
                    }
                            // ------------- 20 DAY SMA -------------------------------
            if (dataSMA.historical.length <= 20) {
                finalChart[j].smaTwenty = 'Insufficient Data'
            } else {
                while (twentySMA >= 0) {
                    culSMA += dataSMA.historical[twentySMA].close
                    twentySMA--
                    }
                    let smaTwentyResult = (culSMA / 20)
                    finalChart[j].smaTwenty = smaTwentyResult.toFixed(2)
                    culSMA = 0
                    }
                            // ------------- 30 DAY SMA -------------------------------
            if (dataSMA.historical.length <= 30) {
                finalChart[j].smaThirty = 'Insufficient Data'
            } else {
                while (thirtySMA >= 0) {
                    culSMA += dataSMA.historical[thirtySMA].close
                    thirtySMA--
                    }
                    let smaThirtyResult = (culSMA / 30)
                    finalChart[j].smaThirty = smaThirtyResult.toFixed(2) 
                    culSMA = 0
                    }
                            // ------------- 50 DAY SMA -------------------------------
            if (dataSMA.historical.length <= 50) {
                finalChart[j].smaFifty = 'Insufficient Data'
            } else {
                while (fiftySMA >= 0) {
                    culSMA += dataSMA.historical[fiftySMA].close
                    fiftySMA--
                    }
                    let smaFiftyResult = (culSMA / 50)
                    finalChart[j].smaFifty = smaFiftyResult.toFixed(2)
                    culSMA = 0
                    } 
                            // ------------- 100 DAY SMA -------------------------------
            if (dataSMA.historical.length <= 100) {
                finalChart[j].smaHun = 'Insufficient Data'
            } else {
                while (hunSMA >= 0) {
                    culSMA += dataSMA.historical[hunSMA].close
                    hunSMA--
                    }
                    let smaHunResult = (culSMA / 100)
                    finalChart[j].smaHun = smaHunResult.toFixed(2)
                    culSMA = 0
                    }
                            // ------------- 200 DAY SMA -------------------------------
            if (dataSMA.historical.length <= 200) {
                finalChart[j].smaTwoHun = 'Insufficient Data'
            } else {
                while (twoHunSMA >= 0) {
                    culSMA += dataSMA.historical[twoHunSMA].close
                    twoHunSMA--
                    }
                    let smaTwoHunResult = (culSMA / 200)
                    finalChart[j].smaTwoHun = smaTwoHunResult.toFixed(2)
                    culSMA = 0 
                    }
    
    // ------------------------------ VWAP ------------------------------------------------------------------------------------

          const res = await  fetch(`https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
          const data = await res.json()

            // -----------ENTIRE VWAP CALUC -------------------------------------------
                let dayLengthPeriod = 0
                let tpvCul = 0
                let volumeCul = 0
                // -------------THIS IS FOR GETTING THE DAY LENGTH FOR VWAP
                while (data[dayLengthPeriod].date.slice(0,10) === todayDate) {
                        dayLengthPeriod++
                        }
               // --------------------THIS IS FOR CALCULATING THE VWAP AND PUSHING TO 
                for (let i = 0; i < dayLengthPeriod; i++) {

                    var {volume, high, close, low, date} = data[i];   
                    var tpv = (high + low + close) / 3;

                    if (date.slice(0,10) == todayDate) {
                    tpvCul += tpv * volume
                    volumeCul += volume
                    }
                    vwapFinal = tpvCul / volumeCul // --------- THIS IS VWAP!!!!!!!!
                    tempVWAP.unshift(vwapFinal) //ADD VWAP TO SYMBOL OBJECT
                }
                finalChart[j].vwap = tempVWAP[0].toFixed(2)
                tempVWAP = []
                j++
            } // END OF J LOOP
        


            console.log(finalChart)
        }
    
// ------------------BUILD OUT HTML
function buildIt() {
        let j = 0
        rowOne.innerHTML = ''
        while (j < 10) {

        const {symbol, changesPercentage, price, change, dayHigh, dayLow, avgVolume, volume, vwap} = finalChart[j]
    
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
    <span class="d-block">One Minute VWAP: $${vwap}</span></h3>
    </div>
    `
    rowOne.appendChild(litterBox)
 
            j++
        }
}
//----- BUILD TO PAGE -----

async function buildToPage() {

    try {

    await tradableSymbols()
    await getNyseBottom()
    await getNasdaqBottom()
    await compileStocks()

    await technicalIndicators()

     buildIt()
  


    } catch (e){
        console.log('Build-To-Page Error', (e))
    }
            // -------------------- RESET HOLDERS
            tickers = []
            myStocksNyse = []
            myStocksNas = []

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
