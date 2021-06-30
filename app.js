const rowOne = document.getElementById('rowOne') 

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
 if (marketDay == 0) {
    date = date - 2
} else if (marketDay == 6) {
    date = date - 1
}

const hour = today.getHours()
let min = today.getMinutes()
if (min < 10) {
    min = `0${min}`
}
const time = `${hour}${min}`
const timeNum = parseInt(time)
// THIS IS TO CHECK FOR MARKET DAY OPEN BEFORE MONDAY
if (marketDay == 1 && timeNum < 830) {
    date = date - 3
} else if (marketDay >= 2 && marketDay < 6 && timeNum < 830) {
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
    let nyseHolderDown = [] //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
    let nyseHolderUp = [] //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
    let nasdaqHolderDown = []
    let nasdaqHolderUp = []
    try {
// ------ FETCH NYSE
    const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const dataNyse = await res.json()
    // ----- FILTER TRADABLE SYMBOLS ON NYSE THAT HAVE DROPPED
    for (let i = 0; i < dataNyse.length; i++) {
        if (dataNyse[i].changesPercentage < -7.5 && arr1.indexOf(dataNyse[i].symbol) > 0 && dataNyse[i].price > 1) {
      nyseHolderDown.push(dataNyse[i])
        }
    }

    for (let i = 0; i < dataNyse.length; i++) {
        if (dataNyse[i].changesPercentage > 7.5 && arr1.indexOf(dataNyse[i].symbol) > 0 && dataNyse[i].price > 1) {
      nyseHolderUp.push(dataNyse[i])
        }
    }
// ------ FETCH NASDAQ
    const resTwo = await fetch('https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
    const dataNas = await resTwo.json()
// ----- FILTER TRADABLE SYMBOLS ON NASDAQ THAT HAVE DROPPED
    for (let i = 0; i < dataNas.length; i++) {
        if (dataNas[i].changesPercentage < -7.5 && arr2.indexOf(dataNas[i].symbol) > 0 && dataNas[i].price > 1) {
      nasdaqHolderDown.push(dataNas[i])
        }
    }

    for (let i = 0; i < dataNas.length; i++) {
        if (dataNas[i].changesPercentage > 7.5 && arr2.indexOf(dataNas[i].symbol) > 0 && dataNas[i].price > 1) {
      nasdaqHolderUp.push(dataNas[i])
        }
    }
//--------- CATCH
    } catch(e) {
        console.log(e)
    }

    compileCallback(nasdaqHolderDown, nyseHolderDown, nyseHolderUp, nasdaqHolderUp) // CALLBACK FOR STOCK FILTER
}

//---------------------- COMBINE AND SORT LARGEST DROP ------------------------- 

let finalChartFatDown = [] // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT
let finalChartFatUp = [] // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT
let finalChart = [] // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT

function compileStocks(arr1, arr2, arr3, arr4) {

// ------- THIS IS A FILTER FOR WEIRD STOCK SYMBOLS THAT SLIP IN ----------

let combinedStockDrop = []
combinedStockDrop = combinedStockDrop.concat(arr1, arr2)

let combinedStockUp = []
combinedStockUp = combinedStockUp.concat(arr3, arr4)

const keys = /^[A-Z]{1,4}$/g
finalChartFatDown = combinedStockDrop.filter(stock => {
    return stock.symbol.match(keys) && !stock.symbol.match('GIX') // ! HAD TO ADD GIX BECAUSE ITS NOT TRADABLE BUT STILL ON LIST
})

finalChartFatUp = combinedStockUp.filter(stock => {
    return stock.symbol.match(keys) && !stock.symbol.match('GIX') // ! HAD TO ADD GIX BECAUSE ITS NOT TRADABLE BUT STILL ON LIST
})

for (let i = 0; i < finalChartFatDown.length; i++) {
finalChartFatDown.sort((a,b) => {
    return a.changesPercentage - b.changesPercentage
    })
  }

for (let i = 0; i < finalChartFatUp.length; i++) {
finalChartFatUp.sort((a,b) => {
    return b.changesPercentage - a.changesPercentage 
    })
  }
// SLIM CHAT DOWN SO IT'S NOT BLOATED
  let slimChartDown = 4
  while (slimChartDown >= 0) {
    finalChart.unshift(finalChartFatDown[slimChartDown])
    slimChartDown--
  }

  let slimChartUp = 4
  while (slimChartUp >= 0) {
    finalChart.unshift(finalChartFatUp[slimChartUp])
    slimChartUp--
  }
} 

// ---------------------- FILL WITH TECHNICAL INDICATORS ------------------------------------------------------------------------------------

// SMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
function smaFunction(chartArr, dataPull, num) {
    let culSMA = 0

    // ------- SMA INDEX IS - 1 FROM TOTAL BECAUSE OF 0 INDEX = 1 -------------------- 
    let fiveTeenSMA = 14
    let twentySMA = 19
    let thirtySMA = 29
    let fiftySMA = 49
    let hunSMA = 99
    let twoHunSMA = 199

                        // ------------- 15 DAY SMA -------------------------------
        if (dataPull.historical.length <= 15) {
            chartArr[num].smaFiveTeen = 'Insufficient Data'
        } else {
            while (fiveTeenSMA >= 0) {
                culSMA += dataPull.historical[fiveTeenSMA].close
                fiveTeenSMA--
                }
                let smaFiveResult = (culSMA / 15) 
                chartArr[num].smaFiveTeen = smaFiveResult.toFixed(2) 
                culSMA = 0
                }
                        // ------------- 20 DAY SMA -------------------------------
        if (dataPull.historical.length <= 20) {
            chartArr[num].smaTwenty = 'Insufficient Data'
        } else {
            while (twentySMA >= 0) {
                culSMA += dataPull.historical[twentySMA].close
                twentySMA--
                }
                let smaTwentyResult = (culSMA / 20)
                chartArr[num].smaTwenty = smaTwentyResult.toFixed(2)
                culSMA = 0
                }
                        // ------------- 30 DAY SMA -------------------------------
        if (dataPull.historical.length <= 30) {
            chartArr[num].smaThirty = 'Insufficient Data'
        } else {
            while (thirtySMA >= 0) {
                culSMA += dataPull.historical[thirtySMA].close
                thirtySMA--
                }
                let smaThirtyResult = (culSMA / 30)
                chartArr[num].smaThirty = smaThirtyResult.toFixed(2) 
                culSMA = 0
                }
                        // ------------- 50 DAY SMA -------------------------------
        if (dataPull.historical.length <= 50) {
            chartArr[num].smaFifty = 'Insufficient Data'
        } else {
            while (fiftySMA >= 0) {
                culSMA += dataPull.historical[fiftySMA].close
                fiftySMA--
                }
                let smaFiftyResult = (culSMA / 50)
                chartArr[num].smaFifty = smaFiftyResult.toFixed(2)
                culSMA = 0
                } 
                        // ------------- 100 DAY SMA -------------------------------
        if (dataPull.historical.length <= 100) {
            chartArr[num].smaHun = 'Insufficient Data'
        } else {
            while (hunSMA >= 0) {
                culSMA += dataPull.historical[hunSMA].close
                hunSMA--
                }
                let smaHunResult = (culSMA / 100)
                chartArr[num].smaHun = smaHunResult.toFixed(2)
                culSMA = 0
                }
                        // ------------- 200 DAY SMA -------------------------------
        if (dataPull.historical.length <= 200) {
            chartArr[num].smaTwoHun = 'Insufficient Data'
        } else {
            while (twoHunSMA >= 0) {
                culSMA += dataPull.historical[twoHunSMA].close
                twoHunSMA--
                }
                let smaTwoHunResult = (culSMA / 200)
                chartArr[num].smaTwoHun = smaTwoHunResult.toFixed(2)
                culSMA = 0 
                }
            } 
// EMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------       
let macdTwelve = [] // ARRs USED FOR MACD TWELVE HISTORY
let macdTwentySix = [] // ARRs USED FOR MACD TWENTY SIX HISTORY

function emaFunction(chartArr, dataPull, num) {
                let emaTwelve = 23
                let emaTwentySix = 53
                let emaFifty = 99
                let emaTwoHun = 399
                let prevDayEmaSub = 0
                let arrEma = []
            
                                // EMA TWELVE ------------------------------------------------------------------------- 
                                if (dataPull.historical.length <= 24) {
                                    chartArr[num].emaTwelve = 'Insufficient Data Available'
                                } else {
                                while (emaTwelve >= 12) {
                                    prevDayEmaSub += dataPull.historical[emaTwelve].close
                                    emaTwelve--
                                    } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                                    const subEMA = prevDayEmaSub / 12
                                    //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                                    const finalSubEma = (2/13) * (dataPull.historical[emaTwelve].close - subEMA) + subEMA
                                    arrEma.unshift(finalSubEma)
                                    emaTwelve--
                                    while (emaTwelve >= 0) {
                                        let derp = (2/13) * (dataPull.historical[emaTwelve].close - arrEma[0]) + arrEma[0]
                                        arrEma.unshift(derp)
                                        arrEma.pop()
                                        if (emaTwelve < 10 && emaTwelve >= 1) { //THIS IF STATEMENT IS TO STORE VARIABLES FOR LATER MACD SIGNAL LINE
                                            macdTwelve.unshift(derp)
                                        }
                                        emaTwelve--
                                    }
                                    chartArr[num].emaTwelve = arrEma[0].toFixed(2) 
                                    arrEma.pop()
                                    prevDayEmaSub = 0 
                                }
                                // EMA TWENTY SIX ----------------------------------------------------------------------
                                if (dataPull.historical.length <= 54) {
                                    chartArr[num].emaTwentySix = 'Insufficient Data Available'
                                } else {
                                while (emaTwentySix >= 26) {
                                    prevDayEmaSub += dataPull.historical[emaTwentySix].close
                                    emaTwentySix--
                                    } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                                    const subEMA = prevDayEmaSub / 26
                                    //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                                    const finalSubEma = (2/27) * (dataPull.historical[emaTwentySix].close - subEMA) + subEMA
                                    arrEma.unshift(finalSubEma)
                                    emaTwentySix--
                                    while (emaTwentySix >= 0) {
                                        let derp = (2/27) * (dataPull.historical[emaTwentySix].close - arrEma[0]) + arrEma[0]
                                        arrEma.unshift(derp)
                                        arrEma.pop()
                                        if (emaTwentySix < 10 && emaTwentySix >= 1) { //THIS IF STATEMENT IS TO STORE VARIABLES FOR LATER MACD SIGNAL LINE
                                            macdTwentySix.unshift(derp)
                                        }
                                        
                                        emaTwentySix--
                                    }
                                    chartArr[num].emaTwentySix = arrEma[0].toFixed(2) 
                                    arrEma.pop() 
                                    prevDayEmaSub = 0
                                }   
                                // EMA FIFTY -----------------------------------------------------------------------------
                                if (dataPull.historical.length <= 100) {
                                    chartArr[num].emaFifty = 'Insufficient Data Available'
                                } else {
                                while (emaFifty >= 50) {
                                    prevDayEmaSub += dataPull.historical[emaFifty].close
                                    emaFifty--
                                    } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                                    const subEMA = prevDayEmaSub / 50
                                    //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                                    const finalSubEma = (2/51) * (dataPull.historical[emaFifty].close - subEMA) + subEMA
                                    arrEma.unshift(finalSubEma)
                                    emaFifty--
                                    while (emaFifty >= 0) {
                                        let derp = (2/51) * (dataPull.historical[emaFifty].close - arrEma[0]) + arrEma[0]
                                        arrEma.unshift(derp)
                                        arrEma.pop()
                                        emaFifty--
                                    }
                                    chartArr[num].emaFifty = arrEma[0].toFixed(2) 
                                    arrEma.pop() 
                                    prevDayEmaSub = 0
                                }
                                // EMA TWO HUNDRED -----------------------------------------------------------------------------
                                if (dataPull.historical.length <= 400) {
                                    chartArr[num].emaTwoHun = 'Insufficient Data Available'
                                } else {
                                while (emaTwoHun >= 200) {
                                    prevDayEmaSub += dataPull.historical[emaTwoHun].close
                                    emaTwoHun--
                                    } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                                    const subEMA = prevDayEmaSub / 200
                                    //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                                    const finalSubEma = (2/201) * (dataPull.historical[emaTwoHun].close - subEMA) + subEMA
                                    arrEma.unshift(finalSubEma)
                                    emaTwoHun--
                                    while (emaTwoHun >= 0) {
                                        let derp = (2/201) * (dataPull.historical[emaTwoHun].close - arrEma[0]) + arrEma[0]
                                        arrEma.unshift(derp)
                                        arrEma.pop()
                                        emaTwoHun--
                                    }
                                    chartArr[num].emaTwoHun = arrEma[0].toFixed(2) 
                                    arrEma.pop() 
                                    prevDayEmaSub = 0
                                }
            
                            }
// MACD FUNCTION -----------------------------------------------------------------------------------------------------------------------------------------       
function macdFunction(chartArr, num) {
    const macd = chartArr[num].emaTwelve - chartArr[num].emaTwentySix
    chartArr[num].macd = macd.toFixed(2)
    // CALCULATE SIGNAL LINE ----------------
    let averageMacd = []
    let iMacd = 8
    while (iMacd >= 0) {
        averageMacd.unshift(macdTwelve[iMacd] - macdTwentySix[iMacd])
        iMacd--
    }
    let averageSum = averageMacd.reduce((a,b) => a + b)
    let finalAverageMacd = averageSum / 9
    let macdSignalLine = (2/9) * (chartArr[num].macd - finalAverageMacd) + finalAverageMacd
    chartArr[num].macdSignalLine = macdSignalLine.toFixed(2)
    // HISTORGRAM CALC ------------------------------------- IF HISTOGRAM GOES FROM NEGATIVE TO POSITIVE IT IS BULLISH
    let histogram = chartArr[num].macd - chartArr[num].macdSignalLine
    chartArr[num].macdHistogram = histogram.toFixed(2)
// FOR NO DATA TO PULL FROM
    if (chartArr[num].macdHistogram === 'NaN') {
        chartArr[num].macdHistogram = 'Insufficient Data Available'
    }
    if (chartArr[num].macd === 'NaN') {
        chartArr[num].macd = 'Insufficient Data Available'
    }
    if (chartArr[num].macdSignalLine === 'NaN') {
        chartArr[num].macdSignalLine = 'Insufficient Data Available'
    }

   
}
// RSI FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------      
function rsiFunction(chartArr, dataPull, num) {

    let iRSI = 15
    let iRSIAdjusted = 16
    let recentUpper = 0
    let recentDowner = 0
    let upMove = 0
    let downMove = 0
    let pastDownPeriod = 0
    let pastUpPeriod = 0

   // CHECK TO SEE IF DATA PULL CAN PULL ENOUGH DATA TO BE EFFECTIVE 
    if (dataPull.historical.length <= 16) {
        chartArr[num].rsi = 'Insufficient Data Available'
    } else {

    // LOOP FOR AVERAGE
    while (iRSI > 1) {
           if (dataPull.historical[iRSI].close > dataPull.historical[iRSIAdjusted].close) {
               upMove += (dataPull.historical[iRSI].close - dataPull.historical[iRSIAdjusted].close)
           } else {
               downMove += (dataPull.historical[iRSIAdjusted].close - dataPull.historical[iRSI].close)
           }
       iRSI--
       iRSIAdjusted--
    }

    
    let averageUp = upMove / 14
    let averageDown = downMove / 14

     // MOST RECENT DIFFERENCE
    if (dataPull.historical[0].close > dataPull.historical[1].close) {
            recentUpper = dataPull.historical[0].close - dataPull.historical[1].close
         } else {
            recentDowner = dataPull.historical[1].close - dataPull.historical[0].close
         }
   

     pastUpPeriod = ((averageUp * 13) + recentUpper) / 14
     pastDownPeriod = ((averageDown * 13) + recentDowner) / 14

    let rsi = 100 - (100 / (1 + pastUpPeriod/pastDownPeriod))
    chartArr[num].rsi = rsi.toFixed(2)

}

} 
// VWAP FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------       
function vwapFunction(chartArr, dataPull, num ) {



                
    // ----------- VWAP CALUC -------------------------------------------
        let dayLengthPeriod = 0
        let tpvCul = 0
        let volumeCul = 0
        let tempVWAP = [] // HOLD VWAP PERIOD - TAKES FROM 0 INDEX FOR MOST CURRENT

        // -------------THIS IS FOR GETTING THE DAY LENGTH FOR VWAP
        while (dataPull[dayLengthPeriod].date.slice(0,10) == todayDate) { 
                dayLengthPeriod++ 
                } 

       // --------------------THIS IS FOR CALCULATING THE VWAP AND PUSHING TO 
        for (let i = 0; i < dayLengthPeriod; i++) {

            const {volume, high, close, low, date} = dataPull[i];   
            let tpv = (high + low + close) / 3;
            if (date.slice(0,10) == todayDate) {
            tpvCul += tpv * volume
            volumeCul += volume
            }
            vwapFinal = tpvCul / volumeCul // --------- THIS IS VWAP!!!!!!!!
            tempVWAP.unshift(vwapFinal) //ADD VWAP TO SYMBOL OBJECT
        }
        chartArr[num].vwap = tempVWAP[0].toFixed(2)
        tempVWAP = []
         } 


// TA FUNCTION ---------------------------------

async function technicalIndicators() {

    let j = 0

    while (j < 10) { // LOOP FOR TECHNICAL SYMBOL

        // THIS IS THE ALL MIGHTY SYMBOL USED FOR PULLS
        const {symbol} = finalChart[j]

        //THIS PULL IS FOR CLOSE PRICES TO CALC TAs
        const resSMA = await  fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
        const dataSMA = await resSMA.json() // SMA PULL USED FOR OTHER CALCS

        // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        smaFunction(finalChart, dataSMA, j)
                        
        // EMA ------------------------------------------------------------------------------------------------------------------------------------------       

        emaFunction(finalChart, dataSMA, j)

        // MACD ------------------------------------------------------------------------------------------------------------------------------

        macdFunction(finalChart, j)

        // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------

        rsiFunction(finalChart, dataSMA, j)

        // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------

        const resVWAP = await  fetch(`https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
        const dataVWAP = await resVWAP.json()

        vwapFunction(finalChart, dataVWAP, j)

        j++ // UPDATE WHILE LOOP

    }// THIS IS THE END OF LOOP
            console.log(finalChart)
}
    
// ------------------BUILD OUT HTML

let stocksUp = []
let stocksDown = []

function filterUpDownStocks() {

    let j = 0

    while (j < 10) {

        const {changesPercentage} = finalChart[j]
        
        if (changesPercentage > 0) {
            stocksUp.push(finalChart[j])
        } else {
            stocksDown.push(finalChart[j])
        }

        j++

    } // END OF FILTER LOOP TO NEW UP/DOWN ARR

        // REASSIGN OBJECT NAMES FOR UP AND DOWN STOCKS
    for (let i = 0; i < stocksUp.length; i++) {
        // UPPERS ---------------------------------------------
        stocksUp[i].symbolUp = stocksUp[i].symbol
        delete stocksUp[i].symbol
        stocksUp[i].changeUp = stocksUp[i].change
        delete stocksUp[i].change
        stocksUp[i].avgVolumeUp = stocksUp[i].avgVolume
        delete stocksUp[i].avgVolume
        stocksUp[i].changesPercentageUp = stocksUp[i].changesPercentage
        delete stocksUp[i].changesPercentage
        stocksUp[i].emaTwelveUp = stocksUp[i].emaTwelve
        delete stocksUp[i].emaTwelve
        stocksUp[i].emaTwentySixUp = stocksUp[i].emaTwentySix
        delete stocksUp[i].emaTwentySix
        stocksUp[i].emaFiftyUp = stocksUp[i].emaFifty
        delete stocksUp[i].emaFifty
        stocksUp[i].emaTwoHunUp = stocksUp[i].emaTwoHun
        delete stocksUp[i].emaTwoHun
        stocksUp[i].macdUp = stocksUp[i].macd
        delete stocksUp[i].macd
        stocksUp[i].macdHistogramUp = stocksUp[i].macdHistogram
        delete stocksUp[i].macdHistogram
        stocksUp[i].macdSignalLineUp = stocksUp[i].macdSignalLine
        delete stocksUp[i].macdSignalLine
        stocksUp[i].priceUp = stocksUp[i].price
        delete stocksUp[i].price
        stocksUp[i].rsiUp = stocksUp[i].rsi
        delete stocksUp[i].rsi
        stocksUp[i].smaFiveTeenUp = stocksUp[i].smaFiveTeen
        delete stocksUp[i].smaFiveTeen
        stocksUp[i].smaTwentyUp = stocksUp[i].smaTwenty
        delete stocksUp[i].smaTwenty
        stocksUp[i].smaThirtyUp = stocksUp[i].smaThirty
        delete stocksUp[i].smaThirty
        stocksUp[i].smaFiftyUp = stocksUp[i].smaFifty
        delete stocksUp[i].smaFifty
        stocksUp[i].smaHunUp = stocksUp[i].smaHun
        delete stocksUp[i].smaHun
        stocksUp[i].smaTwoHunUp = stocksUp[i].smaTwoHun
        delete stocksUp[i].smaTwoHun
        stocksUp[i].volumeUp = stocksUp[i].volume
        delete stocksUp[i].volume
        stocksUp[i].vwapUp = stocksUp[i].vwap
        delete stocksUp[i].vwap
        // DOWNERS ---------------------------------------------
        stocksDown[i].symbolDown = stocksDown[i].symbol
        delete stocksDown[i].symbol
        stocksDown[i].changeDown = stocksDown[i].change
        delete stocksDown[i].change
        stocksDown[i].avgVolumeDown = stocksDown[i].avgVolume
        delete stocksDown[i].avgVolume
        stocksDown[i].changesPercentageDown = stocksDown[i].changesPercentage
        delete stocksDown[i].changesPercentage
        stocksDown[i].emaTwelveDown = stocksDown[i].emaTwelve
        delete stocksDown[i].emaTwelve
        stocksDown[i].emaTwentySixDown = stocksDown[i].emaTwentySix
        delete stocksDown[i].emaTwentySix
        stocksDown[i].emaFiftyDown = stocksDown[i].emaFifty
        delete stocksDown[i].emaFifty
        stocksDown[i].emaTwoHunDown = stocksDown[i].emaTwoHun
        delete stocksDown[i].emaTwoHun
        stocksDown[i].macdDown = stocksDown[i].macd
        delete stocksDown[i].macd
        stocksDown[i].macdHistogramDown = stocksDown[i].macdHistogram
        delete stocksDown[i].macdHistogram
        stocksDown[i].macdSignalLineDown = stocksDown[i].macdSignalLine
        delete stocksDown[i].macdSignalLine
        stocksDown[i].priceDown = stocksDown[i].price
        delete stocksDown[i].price
        stocksDown[i].rsiDown = stocksDown[i].rsi
        delete stocksDown[i].rsi
        stocksDown[i].smaFiveTeenDown = stocksDown[i].smaFiveTeen
        delete stocksDown[i].smaFiveTeen
        stocksDown[i].smaTwentyDown = stocksDown[i].smaTwenty
        delete stocksDown[i].smaTwenty
        stocksDown[i].smaThirtyDown = stocksDown[i].smaThirty
        delete stocksDown[i].smaThirty
        stocksDown[i].smaFiftyDown = stocksDown[i].smaFifty
        delete stocksDown[i].smaFifty
        stocksDown[i].smaHunDown = stocksDown[i].smaHun
        delete stocksDown[i].smaHun
        stocksDown[i].smaTwoHunDown = stocksDown[i].smaTwoHun
        delete stocksDown[i].smaTwoHun
        stocksDown[i].volumeDown = stocksDown[i].volume
        delete stocksDown[i].volume
        stocksDown[i].vwapDown = stocksDown[i].vwap
        delete stocksDown[i].vwap
    }
}

function buildIt() {


console.log(stocksUp, stocksDown)

for (let i = 0; i < stocksDown.length; i++) {

// YOURE GOING TO HAVE TO MAKE ANOTHER LOOP THAT GOES THROUGH THESE TWO ARRAY AT THE SAME TIME JUST LIKE YOU DID WITH FINALCHART[J]. 
// AND PLACES THEM SELECTIVELY INTO A NEW RESTYLED HTML ELEMENT. ONE SIDE DOWN ONE SIDE UP

    const {avgVolumeUp, changeUp, changesPercentageUp, priceUp, symbolUp, volumeUp, vwapUp} = stocksUp[i]

    const {avgVolumeDown, changeDown, changesPercentageDown, priceDown, symbolDown, volumeDown, vwapDown} = stocksDown[i]

    let volumeIncreaseUp = (volumeUp / avgVolumeUp) * 100 
    let volumeIncreaseDown = (volumeDown / avgVolumeDown) * 100 
   
   

    const litterBox = document.createElement('div')
    litterBox.classList.add('row')
    litterBox.innerHTML = `            
    <div class="col-md-6 p-3 border text-center">
    <h2 id="symbol">${symbolDown}</h2>
    <h3><i class="fas fa-long-arrow-alt-down mx-2" id="percentage-down"></i>${changesPercentageDown.toFixed(2)}%</h3>

    <div class="row">

        <h3 class="col-md-6" id="share-price-change">Share Price Loss
            <span class="d-block bear">$ ${changeDown.toFixed(2)}</span></h3>
        <h3 class="col-md-6" id="current-price">Current Price 
            <span class="d-block bear">$ ${priceDown.toFixed(2)}</span></h3>

    </div>
    
    <div class="row mt-3">

        <h3 class="col-6" id="share-price-change">Today's Volume
            <span class="d-block">${volumeDown}</span></h3>
        <h3 class="col-6" id="current-price">Volume Change
            <span class="d-block">${volumeIncreaseDown.toFixed(2)}%</span></h3>
            <span class="d-block">Five Minute VWAP:${vwapDown}</span></h3>
            
    </div>

</div>
<!----------------------------------- UPPER ---------------------------------------->
<div class="col-md-6 p-3 border text-center">
        <h2 id="symbol">${symbolUp}</h2>
        <h3><i class="fas fa-long-arrow-alt-up mx-2" id="percentage-up"></i>${changesPercentageUp.toFixed(2)}%</h3>

        <div class="row">

        <h3 class="col-md-6" id="share-price-change">Share Price Loss
            <span class="d-block bull">$ ${changeUp.toFixed(2)}</span></h3>
        <h3 class="col-md-6" id="current-price">Current Price 
            <span class="d-block bull">$ ${priceUp.toFixed(2)}</span></h3>

        </div>

        <div class="row mt-3">

            <h3 class="col-6" id="share-price-change">Today's Volume
                <span class="d-block"></span>${volumeUp}</h3>
            <h3 class="col-6" id="current-price">Volume Change
                <span class="d-block">${volumeIncreaseUp.toFixed(2)}%</span></h3>
                <span class="d-block">Five Minute VWAP:${vwapUp}</span></h3>
        </div>
</div>
    `
    rowOne.appendChild(litterBox)

    }

   

}
//----- BUILD TO PAGE ----- // ------- AT SOME POINT THE FUNCTION WILL BE SET IN AN INTERVAL - HAVING THE ARRs CLEAR IS NOT A BAD IDEA

async function buildToPage() {

    try {

    await tradableSymbols()
    
    await technicalIndicators()

    filterUpDownStocks()

    rowOne.innerHTML = '' // THIS CLEAR HTML BEFORE BUILD

    buildIt()
    

    } catch (e){
        console.log('Build-To-Page Error', (e))
    }

    
}

buildToPage()

//setInterval(buildToPage, 10000)
