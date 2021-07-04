const rowOne = document.getElementById('rowOne') 

 /// DATE REFERENCE FOR MARKET DATA PULLS ----------------------------------------

const today = new Date
const year = today.getFullYear()
let date = today.getDate()
let month = today.getMonth() + 1

const marketDay = today.getDay()
 // CHECK FOR MARKET OPEN - ADJUST DATE SO VWAP STILL PULLS DATA FROM LAST DAY
 if (marketDay == 0) {
    date = date - 2
} else if (marketDay == 6) {
    date = date - 1
}
// GET TIME FOR CLOSING AND OPENING MARKET
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
// THIS IS TO CORRECT MISSING 0 ON SINGLE DIGITS
if (date < 10) {
    date = `0${date}`
}
if (month < 10) {
    month = `0${month}`
}
// DATE CHECK VARIBLE FOR DATA PERIOD PULLS
const todayDate = `${year}-${month}-${date}` 

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

// ---------------------- TECHNICAL INDICATOR FUNCTIONS ------------------------------------------------------------------------------------

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
            chartArr[num].smaOneHun = 'Insufficient Data'
        } else {
            while (hunSMA >= 0) {
                culSMA += dataPull.historical[hunSMA].close
                hunSMA--
                }
                let smaOneHunResult = (culSMA / 100)
                chartArr[num].smaOneHun = smaOneHunResult.toFixed(2)
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
// WMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
function wmaFunction(chartArr, dataPull, num) {

                // WMA FiveTeen --------------------------------------------------------------------
                let wmaCul = 0
                let weight = 15
                let wmaInterval = 0
                let iWma = 0
    
                if (dataPull.historical.length < 15) {
                    chartArr[num].wmaFiveTeen = 'Insufficient Data Available'
                } else {
    
                    for (let i = 0; i <= 14; i++) {
                        wmaInterval = dataPull.historical[i].close * weight
                        wmaCul += wmaInterval
                        iWma = iWma += weight
                        weight--
                    }
                   const wmaFiveTeen = wmaCul / iWma
                   chartArr[num].wmaFiveTeen = wmaFiveTeen.toFixed(2)
                }
    
                // WMA Twenty --------------------------------------------------------------------
                wmaCul = 0
                weight = 20
                wmaInterval = 0
                iWma = 0
    
                if (dataPull.historical.length < 20) {
                    chartArr[num].wmaTwenty = 'Insufficient Data Available'
                } else {
    
                    for (let i = 0; i <= 19; i++) {
                        wmaInterval = dataPull.historical[i].close * weight
                        wmaCul += wmaInterval
                        iWma = iWma += weight
                        weight--
                    }
                   const wmaTwenty = wmaCul / iWma
                   chartArr[num].wmaTwenty = wmaTwenty.toFixed(2)
                }
    
            // WMA THIRTY --------------------------------------------------------------------
            
                wmaCul = 0
                weight = 30
                wmaInterval = 0
                iWma = 0
    
                if (dataPull.historical.length < 30) {
                    chartArr[num].wmaThirty = 'Insufficient Data Available'
                } else {
    
                    for (let i = 0; i <= 29; i++) {
                        wmaInterval = dataPull.historical[i].close * weight
                        wmaCul += wmaInterval
                        iWma = iWma += weight
                        weight--
                    }
                   const wmaThirty = wmaCul / iWma
                   chartArr[num].wmaThirty = wmaThirty.toFixed(2)
                }
    
            // WMA FIFTY --------------------------------------------------------------------
    
                wmaCul = 0
                weight = 50
                wmaInterval = 0
                iWma = 0
    
                if (dataPull.historical.length < 50) {
                    chartArr[num].wmaFifty = 'Insufficient Data Available'
                } else {
    
                    for (let i = 0; i <= 49; i++) {
                        wmaInterval = dataPull.historical[i].close * weight
                        wmaCul += wmaInterval
                        iWma = iWma += weight
                        weight--
                    }
                   const wmaFifty = wmaCul / iWma
                   chartArr[num].wmaFifty = wmaFifty.toFixed(2)
                }
    
            // WMA ONE HUNDRED --------------------------------------------------------------------
    
                wmaCul = 0
                weight = 100
                wmaInterval = 0
                iWma = 0
    
                if (dataPull.historical.length < 100) {
                    chartArr[num].wmaOneHun = 'Insufficient Data Available'
                } else {
    
                    for (let i = 0; i <= 99; i++) {
                        wmaInterval = dataPull.historical[i].close * weight
                        wmaCul += wmaInterval
                        iWma = iWma += weight
                        weight--
                    }
                   const wmaOneHun = wmaCul / iWma
                   chartArr[num].wmaOneHun = wmaOneHun.toFixed(2)
                }

            // WMA TWO HUNDRED --------------------------------------------------------------------
    
                wmaCul = 0
                weight = 200
                wmaInterval = 0
                iWma = 0
    
                if (dataPull.historical.length < 200) {
                    chartArr[num].wmaTwoHun = 'Insufficient Data Available'
                } else {
    
                    for (let i = 0; i <= 199; i++) {
                        wmaInterval = dataPull.historical[i].close * weight
                        wmaCul += wmaInterval
                        iWma = iWma += weight
                        weight--
                    }
                   const wmaTwoHun = wmaCul / iWma
                   chartArr[num].wmaTwoHun = wmaTwoHun.toFixed(2)
                }
}
// VWMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
function vwmaFunction(chartArr, dataPull, num) {

    // VWMA FIVETEEN --------------------------------------------------------------------

    let volCul = 0
    let totalCul = 0
    let price = 0
    let volume = 0

    if (dataPull.historical.length < 15) {
        chartArr[num].vwmaFiveTeen = 'Insufficient Data Available'
    } else {
        for (let i = 0; i < 14; i++) {
            price = dataPull.historical[i].close
            volume = dataPull.historical[i].volume
            totalCul += price * volume
            volCul += dataPull.historical[i].volume
        }
        const vwmaFiveTeen = totalCul/volCul
        chartArr[num].vwmaFiveTeen = vwmaFiveTeen.toFixed(2)
    }

    // VWMA TWENTY --------------------------------------------------------------------

    volCul = 0
    totalCul = 0
    price = 0
    volume = 0

    if (dataPull.historical.length < 20) {
        chartArr[num].vwmaTwenty = 'Insufficient Data Available'
    } else {
        for (let i = 0; i < 19; i++) {
            price = dataPull.historical[i].close
            volume = dataPull.historical[i].volume
            totalCul += price * volume
            volCul += dataPull.historical[i].volume
        }
        const vwmaTwenty = totalCul/volCul
        chartArr[num].vwmaTwenty = vwmaTwenty.toFixed(2)
    }

    // VWMA THIRTY --------------------------------------------------------------------

    volCul = 0
    totalCul = 0
    price = 0
    volume = 0

    if (dataPull.historical.length < 30) {
        chartArr[num].vwmaThirty = 'Insufficient Data Available'
    } else {
        for (let i = 0; i < 29; i++) {
            price = dataPull.historical[i].close
            volume = dataPull.historical[i].volume
            totalCul += price * volume
            volCul += dataPull.historical[i].volume
        }
        const vwmaThirty = totalCul/volCul
        chartArr[num].vwmaThirty = vwmaThirty.toFixed(2)
    }

    // VWMA FIFTY --------------------------------------------------------------------

    volCul = 0
    totalCul = 0
    price = 0
    volume = 0

    if (dataPull.historical.length < 50) {
        chartArr[num].vwmaFifty = 'Insufficient Data Available'
    } else {
        for (let i = 0; i < 49; i++) {
            price = dataPull.historical[i].close
            volume = dataPull.historical[i].volume
            totalCul += price * volume
            volCul += dataPull.historical[i].volume
        }
        const vwmaFifty = totalCul/volCul
        chartArr[num].vwmaFifty = vwmaFifty.toFixed(2)
    }

    // VWMA ONEHUN --------------------------------------------------------------------

    volCul = 0
    totalCul = 0
    price = 0
    volume = 0

    if (dataPull.historical.length < 100) {
        chartArr[num].vwmaOneHun = 'Insufficient Data Available'
    } else {
        for (let i = 0; i < 99; i++) {
            price = dataPull.historical[i].close
            volume = dataPull.historical[i].volume
            totalCul += price * volume
            volCul += dataPull.historical[i].volume
        }
        const vwmaOneHun = totalCul/volCul
        chartArr[num].vwmaOneHun = vwmaOneHun.toFixed(2)
    }

    // VWMA TWOHUN --------------------------------------------------------------------

    volCul = 0
    totalCul = 0
    price = 0
    volume = 0

    if (dataPull.historical.length < 200) {
        chartArr[num].vwmaTwoHun = 'Insufficient Data Available'
    } else {
        for (let i = 0; i < 199; i++) {
            price = dataPull.historical[i].close
            volume = dataPull.historical[i].volume
            totalCul += price * volume
            volCul += dataPull.historical[i].volume
        }
        const vwmaTwoHun = totalCul/volCul
        chartArr[num].vwmaTwoHun = vwmaTwoHun.toFixed(2)
    }
}
// EMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------       
function emaFunction(chartArr, dataPull, num, macdCallBack) {
                let emaTwelve = 23
                let emaTwentySix = 51
                let emaFifty = 99
                let emaTwoHun = 399
                let prevDayEmaSub = 0
                let arrEma = []

                let macdTwelve = [] // ARRs USED FOR MACD TWELVE HISTORY
                let macdTwentySix = [] // ARRs USED FOR MACD TWENTY SIX HISTORY
            
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
                                if (dataPull.historical.length <= 52) {
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
            
            // MACD CALLBACK -----------------------------------------------------------------------------------------------------------------------------------------       
            macdCallBack(chartArr, num, macdTwelve, macdTwentySix)
}
// MACD FUNCTION -----------------------------------------------------------------------------------------------------------------------------------------       
function macdFunction(chartArr, num, arr1, arr2) {
    const macd = chartArr[num].emaTwelve - chartArr[num].emaTwentySix
    chartArr[num].macd = macd.toFixed(2)
    // CALCULATE SIGNAL LINE ----------------
    let averageMacd = []
    let iMacd = 8
    while (iMacd >= 0) {
        averageMacd.unshift(arr1[iMacd] - arr2[iMacd])
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

    let iRSI = 14
    let iRSIAdjusted = 15
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
    while (iRSI >= 1) {
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
// STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
function stochOsc1433Function(chartArr, dataPull, num) {

        

        let iSO = 13

        let soLowHolder = []
        let soHighHolder = []
        let highestHigh = 0
        let lowestLow = 0
    // FIRST %D
        let topForm = []
        let bottomForm = []
    // SECOND %D
        let topFormTwo = []
        let bottomFormTwo = []
    // THIRD %D
        let topFormThree = []
        let bottomFormThree = []
    // HOLDING SET OF %D FOR 14 3 3 
        let signalLineHolder = []

    if (dataPull.historical.length < 19) {
    chartArr[num].stochasticK = 'Insufficient Data Available'
    } else {

    // GETTING HIGHS AND LOWS OF PERIOD------------------------------------------------------

            while (iSO >= 0) {
                soLowHolder.push(dataPull.historical[iSO].low)
                soHighHolder.push(dataPull.historical[iSO].high)
                iSO--
            }

            highestHigh = Math.max(...soHighHolder)
            lowestLow = Math.min(...soLowHolder) 

            topForm.push(dataPull.historical[0].close - lowestLow)
            bottomForm.push(highestHigh - lowestLow)

// RESET HOLDER AND VARs --------------------------------------------------------

       iSO = 14
       soLowHolder = []
       soHighHolder = []
       highestHigh = 0
       lowestLow = 0

// GETTING HIGHS AND LOWS OF PERIOD-----------------------------------------------

            while (iSO >= 1) {
                    soLowHolder.push(dataPull.historical[iSO].low)
                    soHighHolder.push(dataPull.historical[iSO].high)
                    iSO--
            }

            highestHigh = Math.max(...soHighHolder)
            lowestLow = Math.min(...soLowHolder)

            topForm.push(dataPull.historical[1].close - lowestLow)
            bottomForm.push(highestHigh - lowestLow )

            topFormTwo.push(dataPull.historical[1].close - lowestLow)
            bottomFormTwo.push(highestHigh - lowestLow )


// RESET HOLDER AND VARs ------------------------------------------------

        iSO = 15
        soLowHolder = []
        soHighHolder = []
        highestHigh = 0
        lowestLow = 0

// GETTING HIGHS AND LOWS OF PERIOD-----------------------------------

            while (iSO >= 2) {
                soLowHolder.push(dataPull.historical[iSO].low)
                soHighHolder.push(dataPull.historical[iSO].high)
                iSO--
            }
            highestHigh = Math.max(...soHighHolder)
            lowestLow = Math.min(...soLowHolder)

            topForm.push(dataPull.historical[2].close - lowestLow)
            bottomForm.push(highestHigh - lowestLow)

// AFTER 3 WE SUM IT UP --------------- TO GET 1 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------


            let sumTop = topForm.reduce((a,b) => a + b, 0)
            let sumBottom = bottomForm.reduce((a,b) => a + b, 0)

            let slowD = (sumTop / sumBottom) * 100

            signalLineHolder.push(slowD)

// -------------------------------------------------------------------------

            topFormTwo.push(dataPull.historical[2].close - lowestLow)
            bottomFormTwo.push(highestHigh - lowestLow)

            topFormThree.push(dataPull.historical[2].close - lowestLow)
            bottomFormThree.push(highestHigh - lowestLow)

//RESET VARS ---------------------------------------------------------------------

            iSO = 16
            soLowHolder = []
            soHighHolder = []
            highestHigh = 0
            lowestLow = 0

// GETTING HIGHS AND LOWS OF PERIOD------------------------------------------------

                while (iSO >= 3) {
                    soLowHolder.push(dataPull.historical[iSO].low)
                    soHighHolder.push(dataPull.historical[iSO].high)
                    iSO--
                }
                highestHigh = Math.max(...soHighHolder)
                lowestLow = Math.min(...soLowHolder)

                topFormTwo.push(dataPull.historical[3].close - lowestLow)
                bottomFormTwo.push(highestHigh - lowestLow)

// AFTER 3 WE SUM IT UP --------------- TO GET 2 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------

                sumTop = topFormTwo.reduce((a,b) => a + b, 0)
                sumBottom = bottomFormTwo.reduce((a,b) => a + b, 0)

                slowD = (sumTop / sumBottom) * 100

                signalLineHolder.push(slowD)

        // -----------------------------------------------------------------

                topFormThree.push(dataPull.historical[3].close - lowestLow)
                bottomFormThree.push(highestHigh - lowestLow)

//RESET VARS ---------------------------------------------

                iSO = 17
                soLowHolder = []
                soHighHolder = []
                highestHigh = 0
                lowestLow = 0

// GETTING HIGHS AND LOWS OF PERIOD-----------------------------------

                    while (iSO >= 4) {
                        soLowHolder.push(dataPull.historical[iSO].low)
                        soHighHolder.push(dataPull.historical[iSO].high)
                        iSO--
                    }
                    highestHigh = Math.max(...soHighHolder)
                    lowestLow = Math.min(...soLowHolder)

                    topFormThree.push(dataPull.historical[4].close - lowestLow)
                    bottomFormThree.push(highestHigh - lowestLow)


// AFTER 3 WE SUM IT UP --------------- TO GET 3 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------

                    sumTop = topFormThree.reduce((a,b) => a + b, 0)
                    sumBottom = bottomFormThree.reduce((a,b) => a + b, 0)

                    slowD = (sumTop / sumBottom) * 100

                    signalLineHolder.push(slowD)

             // ----------- TALLY UP LAST SMOOTHING -------------------------------

                    const sumStochD = signalLineHolder.reduce((a,b) => a + b, 0)

                    const smaD = sumStochD / 3

                    chartArr[num].stochastic1433 = smaD.toFixed(2)

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
            tempVWAP.unshift(vwapFinal) //ADD VWAP FRONT OF ARR
            }
        
            chartArr[num].vwap = tempVWAP[0].toFixed(2)
            tempVWAP = []
            
}




// TA FUNCTION ---------------------------------------------------------------------
async function technicalIndicators() {

    let j = 0

    while (j < 10) { // LOOP FOR TECHNICAL SYMBOL

        // THIS IS THE ALL MIGHTY SYMBOL USED FOR PULLS
        const {symbol} = finalChart[j]

        //THIS PULL IS FOR CLOSE PRICES TO CALC TAs
        const resSMA = await  fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
        const dataSMA = await resSMA.json() // SMA PULL USED FOR OTHER CALCS
        console.log(dataSMA)
            // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            smaFunction(finalChart, dataSMA, j)
                            
            // EMA WITH MACD CALLBACK ------------------------------------------------------------------------------------------------------------------------------------------       
            emaFunction(finalChart, dataSMA, j, macdFunction)

            // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            rsiFunction(finalChart, dataSMA, j)
        
            // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            stochOsc1433Function(finalChart, dataSMA, j)

            // WMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            wmaFunction(finalChart, dataSMA, j) 

            // VWMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            vwmaFunction(finalChart, dataSMA, j)

            // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------

            let highs = []
            let lows = []
            let lowestLow = 0
            let highestHigh = 0

            if (dataSMA.historical.length < 14) {
                finalChart[j].williams = 'Poop'
            } else {
                for (let i = 0; i < 13; i++) {
                    highs.push(dataSMA.historical[i].high)
                    lows.push(dataSMA.historical[i].low)
                }

                lowestLow = Math.min(...lows)
                highestHigh = Math.max(...highs)

                const williams = (highestHigh - dataSMA.historical[0].close) / (highestHigh - lowestLow) * -100
                
                finalChart[j].williamsR = williams.toFixed(2)
            }


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
        // UPPERS ------------------------------------------------------------------------
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
        stocksUp[i].smaOneHunUp = stocksUp[i].smaOneHun
        delete stocksUp[i].smaOneHun
        stocksUp[i].smaTwoHunUp = stocksUp[i].smaTwoHun
        delete stocksUp[i].smaTwoHun
        stocksUp[i].volumeUp = stocksUp[i].volume
        delete stocksUp[i].volume
        stocksUp[i].vwapUp = stocksUp[i].vwap
        delete stocksUp[i].vwap
        stocksUp[i].stochastic1433Up = stocksUp[i].stochastic1433
        delete stocksUp[i].stochastic1433
        stocksUp[i].wmaFiveTeenUp = stocksUp[i].wmaFiveTeen
        delete stocksUp[i].wmaFiveTeen
        stocksUp[i].wmaTwentyUp = stocksUp[i].wmaTwenty
        delete stocksUp[i].wmaTwenty
        stocksUp[i].wmaThirtyUp = stocksUp[i].wmaThirty
        delete stocksUp[i].wmaThirty
        stocksUp[i].wmaFiftyUp = stocksUp[i].wmaFifty
        delete stocksUp[i].wmaFifty
        stocksUp[i].wmaOneHunUp = stocksUp[i].wmaOneHun
        delete stocksUp[i].wmaOneHun
        stocksUp[i].wmaTwoHunUp = stocksUp[i].wmaTwoHun
        delete stocksUp[i].wmaTwoHun
        stocksUp[i].vwmaFiveTeenUp = stocksUp[i].vwmaFiveTeen
        delete stocksUp[i].vwmaFiveTeen
        stocksUp[i].vwmaTwentyUp = stocksUp[i].vwmaTwenty
        delete stocksUp[i].vwmaTwenty
        stocksUp[i].vwmaThirtyUp = stocksUp[i].vwmaThirty
        delete stocksUp[i].vwmaThirty
        stocksUp[i].vwmaFiftyUp = stocksUp[i].vwmaFifty
        delete stocksUp[i].vwmaFifty
        stocksUp[i].vwmaOneHunUp = stocksUp[i].vwmaOneHun
        delete stocksUp[i].vwmaOneHun
        stocksUp[i].vwmaTwoHunUp = stocksUp[i].vwmaTwoHun
        delete stocksUp[i].vwmaTwoHun
        stocksUp[i].williamsRUp = stocksUp[i].williamsR
        delete stocksUp[i].williamsR
        // DOWNERS ------------------------------------------------------------------------------
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
        stocksDown[i].smaOneHunDown = stocksDown[i].smaOneHun
        delete stocksDown[i].smaOneHun
        stocksDown[i].smaTwoHunDown = stocksDown[i].smaTwoHun
        delete stocksDown[i].smaTwoHun
        stocksDown[i].volumeDown = stocksDown[i].volume
        delete stocksDown[i].volume
        stocksDown[i].vwapDown = stocksDown[i].vwap
        delete stocksDown[i].vwap
        stocksDown[i].stochastic1433Down = stocksDown[i].stochastic1433
        delete stocksDown[i].stochastic1433
        stocksDown[i].wmaFiveTeenDown = stocksDown[i].wmaFiveTeen
        delete stocksDown[i].wmaFiveTeen
        stocksDown[i].wmaTwentyDown = stocksDown[i].wmaTwenty
        delete stocksDown[i].wmaTwenty
        stocksDown[i].wmaThirtyDown = stocksDown[i].wmaThirty
        delete stocksDown[i].wmaThirty
        stocksDown[i].wmaFiftyDown = stocksDown[i].wmaFifty
        delete stocksDown[i].wmaFifty
        stocksDown[i].wmaOneHunDown = stocksDown[i].wmaOneHun
        delete stocksDown[i].wmaOneHun
        stocksDown[i].wmaTwoHunDown = stocksDown[i].wmaTwoHun
        delete stocksDown[i].wmaTwoHun
        stocksDown[i].vwmaFiveTeenDown = stocksDown[i].vwmaFiveTeen
        delete stocksDown[i].vwmaFiveTeen
        stocksDown[i].vwmaTwentyDown = stocksDown[i].vwmaTwenty
        delete stocksDown[i].vwmaTwenty
        stocksDown[i].vwmaThirtyDown = stocksDown[i].vwmaThirty
        delete stocksDown[i].vwmaThirty
        stocksDown[i].vwmaFiftyDown = stocksDown[i].vwmaFifty
        delete stocksDown[i].vwmaFifty
        stocksDown[i].vwmaOneHunDown = stocksDown[i].vwmaOneHun
        delete stocksDown[i].vwmaOneHun
        stocksDown[i].vwmaTwoHunDown = stocksDown[i].vwmaTwoHun
        delete stocksDown[i].vwmaTwoHun
        stocksDown[i].williamsRDown = stocksDown[i].williamsR
        delete stocksDown[i].williamsR
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

    rowOne.innerHTML = '' // THIS CLEARS PRIOR HTML BEFORE BUILD

    buildIt()
    

    } catch (e) {
        console.log('Build-To-Page Error', (e))
    }

    
}

buildToPage()

//setInterval(buildToPage, 10000)  FOR LATER AUTO UPDATE
