const rowOne = document.getElementById('rowOne')
const rowTwo = document.getElementById('rowTwo')

 /// DATE REFERENCE FOR MARKET DATA PULLS ----------------------------------------

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
const marketDay = today.getDay()
 // CHECK FOR MARKET OPEN - ADJUST DATE SO VWAP STILL PULLS DATA FROM LAST DAY
 if (marketDay === 0) {
    date = date - 2
} else if (marketDay === 6) {
    date = date - 1
}
const todayDate = `${year}-${month}-${date}` // DATE CHECK VARIBLE FOR DATA PERIOD PULLS

// ------------------- TRADABLE STOCK TICKERS --------------------------------------------------------------------------------------------------

async function tradableSymbols() {
    let myStocksNas = []
    let myStocksNyse = []
    try {
    const res = await fetch('https://financialmodelingprep.com/api/v3/available-traded/list?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const data = await res.json()
        
    for (let i = 0; i < data.length; i++) {
        if (data[i].exchange === 'New York Stock Exchange') {
            myStocksNyse.push(data[i].symbol)
        } else if (data[i].exchange === 'Nasdaq Global Select') {
            myStocksNas.push(data[i].symbol)
        }
    }

    await filterTradableSymbols(myStocksNyse, myStocksNas, compileStocks)

        } catch(e) {
             console.log(e)
        }
}

// ---------------------- FILTERS TRADABLE SYMBOLS THAT HAVE DROPPED BELOW THE THRESHOLD -------------------------------------

async function filterTradableSymbols(arr1, arr2, compileCallback) {
    let nyseHolder = [] //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
    let nasdaqHolder = []
    try {
// ------ FETCH NYSE
    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const dataNyse = await res.json()
    // ----- FILTER TRADABLE SYMBOLS ON NYSE THAT HAVE DROPPED
    for (let i = 0; i < dataNyse.length; i++) {
        if (dataNyse[i].changesPercentage < -5 && arr1.indexOf(dataNyse[i].symbol) > 0 && dataNyse[i].price > 1) {
      nyseHolder.push(dataNyse[i])
        }
    }
// ------ FETCH NASDAQ
    const resTwo = await fetch('https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const dataNas = await resTwo.json()
// ----- FILTER TRADABLE SYMBOLS ON NASDAQ THAT HAVE DROPPED
    for (let i = 0; i < dataNas.length; i++) {
        if(dataNas[i].changesPercentage < -5 && arr2.indexOf(dataNas[i].symbol) > 0 && dataNas[i].price > 1) {
      nasdaqHolder.push(dataNas[i])
        }
    }
//--------- CATCH
    } catch(e) {
        console.log(e)
    }

    compileCallback(nasdaqHolder, nyseHolder) // CALLBACK FOR STOCK FILTER
}

//---------------------- COMBINE AND SORT LARGEST DROP ------------------------- 

let finalChart = [] // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT

function compileStocks(arr1, arr2) {

/* ------- THIS IS A FILTER FOR WEIRD STOCK SYMBOLS THAT SLIP IN ----------*/ 

let combinedStockDrop = []
combinedStockDrop = combinedStockDrop.concat(arr1, arr2)

const keys = /^[A-Z]{1,4}$/g
finalChart = combinedStockDrop.filter(stock => {
    return stock.symbol.match(keys) && !stock.symbol.match('GIX') // ! HAD TO ADD GIX BECAUSE ITS NOT TRADABLE BUT STILL ON LIST
})

for (let i = 0; i < finalChart.length; i++) {
finalChart.sort((a,b) => {
    return a.changesPercentage - b.changesPercentage
    })
  }
} 

// ---------------------- FILL WITH TECHNICAL INDICATORS ---------------------------------------------------------------------

async function technicalIndicators() {
let tempVWAP = [] // HOLD VWAP PERIOD - TAKES FROM 0 INDEX FOR MOST CURRENT
let j = 0

while (j < 10) { // VWAP LOOP

 // THIS IS THE ALL MIGHTY SYMBOL
 const {symbol} = finalChart[j]

// SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const resSMA = await  fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
    const dataSMA = await resSMA.json() // SMA PULL USED FOR OTHER CALCS

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


    // EMA ------------------------------------------------------------------------------------------------------------------------------------------       
    
    let emaTwelve = 11
    let emaTwentySix = 25
    let emaFifty = 49
    let emaTwoHun = 199
    let prevDayEmaSub = 0
                    // EMA TWELVE -------------------------------------------------------------------------
                    if (dataSMA.historical.length <= 12) {
                        finalChart[j].emaTwelve = 'Insufficient Data'
                    } else {
                    while (emaTwelve >= 5) {
                        prevDayEmaSub += dataSMA.historical[emaTwelve].close
                        emaTwelve--
                        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                        const subEMA = prevDayEmaSub / 7
                        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                        const finalSubEma = (2/9) * (dataSMA.historical[emaTwelve].close - subEMA) + subEMA
                        emaTwelve--
                        // BALANCE OUT THE EMA FROM SUBBING SMA ON FIRST ONE ------------------------------
                        const finalSubEmaTwo = (2/10) * (dataSMA.historical[emaTwelve].close - finalSubEma) + finalSubEma
                        emaTwelve--
                        const finalSubEmaThree = (2/11) * (dataSMA.historical[emaTwelve].close - finalSubEmaTwo) + finalSubEmaTwo
                        emaTwelve--
                        const finalSubEmaFour = (2/12) * (dataSMA.historical[emaTwelve].close - finalSubEmaThree) + finalSubEmaThree
                        emaTwelve--
                        //FINAL EMA -------------------------------
                        const ema = (2/13) * (dataSMA.historical[emaTwelve].close - finalSubEmaFour) + finalSubEmaFour
                        finalChart[j].emaTwelve = ema.toFixed(2) 
                        prevDayEmaSub = 0
                    }
                    // EMA TWENTY SIX ----------------------------------------------------------------------
                    if (dataSMA.historical.length <= 26) {
                        finalChart[j].emaTwentySix = 'Insufficient Data'
                    } else {
                    while (emaTwentySix >= 5) {
                        prevDayEmaSub += dataSMA.historical[emaTwentySix].close
                        emaTwentySix--
                        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                        const subEMA = prevDayEmaSub / 21
                        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                        const finalSubEma = (2/23) * (dataSMA.historical[emaTwentySix].close - subEMA) + subEMA
                        emaTwentySix--
                        // BALANCE OUT THE EMA FROM SUBBING SMA ON FIRST ONE ------------------------------
                        const finalSubEmaTwo = (2/24) * (dataSMA.historical[emaTwentySix].close - finalSubEma) + finalSubEma
                        emaTwentySix--
                        const finalSubEmaThree = (2/25) * (dataSMA.historical[emaTwentySix].close - finalSubEmaTwo) + finalSubEmaTwo
                        emaTwentySix--
                        const finalSubEmaFour = (2/26) * (dataSMA.historical[emaTwentySix].close - finalSubEmaThree) + finalSubEmaThree
                        emaTwentySix--
                        //FINAL EMA -------------------------------
                        const ema = (2/27) * (dataSMA.historical[emaTwentySix].close - finalSubEmaFour) + finalSubEmaFour
                        finalChart[j].emaTwentySix = ema.toFixed(2) 
                        prevDayEmaSub = 0
                    }
                    // EMA FIFTY -----------------------------------------------------------------------------
                    if (dataSMA.historical.length <= 50) {
                        finalChart[j].emaFifty = 'Insufficient Data'
                    } else {
                    while (emaFifty >= 5) {
                        prevDayEmaSub += dataSMA.historical[emaFifty].close
                        emaFifty--
                        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                        const subEMA = prevDayEmaSub / 45
                        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                        const finalSubEma = (2/47) * (dataSMA.historical[emaFifty].close - subEMA) + subEMA
                        emaFifty--
                        // BALANCE OUT THE EMA FROM SUBBING SMA ON FIRST ONE ------------------------------
                        const finalSubEmaTwo = (2/48) * (dataSMA.historical[emaFifty].close - finalSubEma) + finalSubEma
                        emaFifty--
                        const finalSubEmaThree = (2/49) * (dataSMA.historical[emaFifty].close - finalSubEmaTwo) + finalSubEmaTwo
                        emaFifty--
                        const finalSubEmaFour = (2/50) * (dataSMA.historical[emaFifty].close - finalSubEmaThree) + finalSubEmaThree
                        emaFifty--
                        //FINAL EMA -------------------------------
                        const ema = (2/51) * (dataSMA.historical[emaFifty].close - finalSubEmaFour) + finalSubEmaFour
                        finalChart[j].emaFifty = ema.toFixed(2) 
                        prevDayEmaSub = 0
                    }
                    // EMA TWO HUNDRED -----------------------------------------------------------------------------
                    if (dataSMA.historical.length <= 200) {
                        finalChart[j].emaTwoHun = 'Insufficient Data'
                    } else {
                    while (emaTwoHun >= 5) {
                        prevDayEmaSub += dataSMA.historical[emaTwoHun].close
                        emaTwoHun--
                        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                        const subEMA = prevDayEmaSub / 195
                        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                        const finalSubEma = (2/197) * (dataSMA.historical[emaTwoHun].close - subEMA) + subEMA
                        emaTwoHun--
                        // BALANCE OUT THE EMA FROM SUBBING SMA ON FIRST ONE ------------------------------
                        const finalSubEmaTwo = (2/198) * (dataSMA.historical[emaTwoHun].close - finalSubEma) + finalSubEma
                        emaTwoHun--
                        const finalSubEmaThree = (2/199) * (dataSMA.historical[emaTwoHun].close - finalSubEmaTwo) + finalSubEmaTwo
                        emaTwoHun--
                        const finalSubEmaFour = (2/200) * (dataSMA.historical[emaTwoHun].close - finalSubEmaThree) + finalSubEmaThree
                        emaTwoHun--
                        //FINAL EMA -------------------------------
                        const ema = (2/201) * (dataSMA.historical[emaTwoHun].close - finalSubEmaFour) + finalSubEmaFour
                        finalChart[j].emaTwoHun = ema.toFixed(2) 
                        prevDayEmaSub = 0
                    }

    // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------

                    let iRSI = 14
                    let iRSIAdjusted = 15
                    let recentUpper = 0
                    let recentDowner = 0
                    let upMove = 0
                    let downMove = 0
                    let pastDownPeriod = 0
                    let pastUpPeriod = 0

                     // MOST RECENT DIFFERENCE
                    if (dataSMA.historical[0].close > dataSMA.historical[1].close) {
                        recentUpper = dataSMA.historical[0].close - dataSMA.historical[1].close
                    } else {
                        recentDowner = dataSMA.historical[1].close - dataSMA.historical[0].close
                    }
 
                    // loop to get average
                    while (iRSI >= 1) {
                           if (dataSMA.historical[iRSI].close > dataSMA.historical[iRSIAdjusted].close) {
                               upMove += dataSMA.historical[iRSI].close - dataSMA.historical[iRSIAdjusted].close
                           } else {
                               downMove += dataSMA.historical[iRSIAdjusted].close - dataSMA.historical[iRSI].close 
                           }
                       iRSI--
                       iRSIAdjusted--
                    }
                    
                    let averageUp = upMove / 14
                    let averageDown = downMove / 14

                     pastUpPeriod = ((averageUp * 13) + recentUpper) / 14
                     pastDownPeriod = ((averageDown * 13) + recentDowner) / 14

                    let rsi = 100 - (100 / (1 + pastUpPeriod/pastDownPeriod))
                    finalChart[j].rsi = rsi.toFixed(2)



    
    // ------------------------------ VWAP ------------------------------------------------------------------------------------

          const resVWAP = await  fetch(`https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
          const dataVWAP = await resVWAP.json()

            // -----------ENTIRE VWAP CALUC -------------------------------------------
                let dayLengthPeriod = 0
                let tpvCul = 0
                let volumeCul = 0

                // -------------THIS IS FOR GETTING THE DAY LENGTH FOR VWAP
                while (dataVWAP[dayLengthPeriod].date.slice(0,10) == todayDate) { 
                        dayLengthPeriod++ 
                        } 
        
               // --------------------THIS IS FOR CALCULATING THE VWAP AND PUSHING TO 
                for (let i = 0; i < dayLengthPeriod; i++) {

                    const {volume, high, close, low, date} = dataVWAP[i];   
                    let tpv = (high + low + close) / 3;

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

            // ------------------ EMA FUNCTION --------------------------------
            const resEMA =  await fetch(`https://financialmodelingprep.com/api/v3/technical_indicator/daily/AHT?period=10&type=ema&apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
            const dataEMA = await resEMA.json() 
         
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
    <span class="d-block">Five Minute VWAP: $${vwap}</span></h3>
    </div>
    `
    rowOne.appendChild(litterBox)
 
            j++
        }
}
//----- BUILD TO PAGE ----- // ------- AT SOME POINT THE FUNCTION WILL BE SET IN AN INTERVAL - HAVING THE ARRs CLEAR IS NOT A BAD IDEA

async function buildToPage() {

    try {

    await tradableSymbols()
    
    await technicalIndicators()

    buildIt()

    } catch (e){
        console.log('Build-To-Page Error', (e))
    }
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
