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
 let todayDate = `${year}-${month}-${date}`
 if (todayDate === '2021-07-05') {
     todayDate = '2021-07-02'
 } 
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

     } catch(e) {
         
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
     return stock.symbol.match(keys) && !stock.symbol.match('CBO') // ! HAD TO ADD CBO BECAUSE ITS NOT TRADABLE BUT STILL ON LIST
 })
 
 finalChartFatUp = combinedStockUp.filter(stock => {
     return stock.symbol.match(keys) && !stock.symbol.match('CBO') // ! HAD TO ADD CBO BECAUSE ITS NOT TRADABLE BUT STILL ON LIST
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
     function smaFunction(chartArr, dataPull, newestPull, num) {
         
        let culSMA = 0

        // ------- SMA INDEX IS - 2 FROM TOTAL BECAUSE OF 0 INDEX = 1 AND ADDING RECENT PRICE DATA -------------------- 
        let fiveTeenSMA = 13
        let twentySMA = 18
        let thirtySMA = 28
        let fiftySMA = 48
        let hunSMA = 98
        let twoHunSMA = 198

        const todayPricePull = newestPull[0].price

        try {
                            // ------------- 15 DAY SMA -------------------------------
            if (dataPull.historical.length <= 13) {
                chartArr[num].smaFiveTeen = 'No Data'
            } else {
                while (fiveTeenSMA >= 0) {
                    culSMA += dataPull.historical[fiveTeenSMA].close
                    fiveTeenSMA--
                    }
                    let smaFiveResult = ((culSMA + todayPricePull) / 15) 
                    chartArr[num].smaFiveTeen = smaFiveResult.toFixed(2) 
                    culSMA = 0
                    }
                            // ------------- 20 DAY SMA -------------------------------
            if (dataPull.historical.length <= 19) {
                chartArr[num].smaTwenty = 'No Data'
            } else {
                while (twentySMA >= 0) {
                    culSMA += dataPull.historical[twentySMA].close
                    twentySMA--
                    }
                    let smaTwentyResult = ((culSMA + todayPricePull) / 20)
                    chartArr[num].smaTwenty = smaTwentyResult.toFixed(2)
                    culSMA = 0
                    }
                            // ------------- 30 DAY SMA -------------------------------
            if (dataPull.historical.length <= 29) {
                chartArr[num].smaThirty = 'No Data'
            } else {
                while (thirtySMA >= 0) {
                    culSMA += dataPull.historical[thirtySMA].close
                    thirtySMA--
                    }
                    let smaThirtyResult = ((culSMA + todayPricePull) / 30) 
                    chartArr[num].smaThirty = smaThirtyResult.toFixed(2) 
                    culSMA = 0
                    }
                            // ------------- 50 DAY SMA -------------------------------
            if (dataPull.historical.length <= 49) {
                chartArr[num].smaFifty = 'No Data'
            } else {
                while (fiftySMA >= 0) {
                    culSMA += dataPull.historical[fiftySMA].close
                    fiftySMA--
                    }
                    let smaFiftyResult = ((culSMA + todayPricePull) / 50) 
                    chartArr[num].smaFifty = smaFiftyResult.toFixed(2)
                    culSMA = 0
                    } 
                            // ------------- 100 DAY SMA -------------------------------
            if (dataPull.historical.length <= 99) {
                chartArr[num].smaOneHun = 'No Data'
            } else {
                while (hunSMA >= 0) {
                    culSMA += dataPull.historical[hunSMA].close
                    hunSMA--
                    }
                    let smaOneHunResult = ((culSMA + todayPricePull) / 100) 
                    chartArr[num].smaOneHun = smaOneHunResult.toFixed(2)
                    culSMA = 0
                    }
                            // ------------- 200 DAY SMA -------------------------------
            if (dataPull.historical.length <= 199) {
                chartArr[num].smaTwoHun = 'No Data'
            } else {
                while (twoHunSMA >= 0) {
                    culSMA += dataPull.historical[twoHunSMA].close
                    twoHunSMA--
                    }
                    let smaTwoHunResult = ((culSMA + todayPricePull) / 200) 
                    chartArr[num].smaTwoHun = smaTwoHunResult.toFixed(2)
                    culSMA = 0 
                    }

                }
                catch(e) 
                {
                      
                }
                    
    } 
    // WMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
    function wmaFunction(chartArr, dataPull, newestPull, num) {


                    // WMA FiveTeen --------------------------------------------------------------------
                    let wmaCul = newestPull[0].price * 15
                    let weight = 14
                    let wmaInterval = 0
                    let iWma = 15
                   
                    try {
                    if (dataPull.historical.length < 14) {
                        chartArr[num].wmaFiveTeen = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 13; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaFiveTeen = wmaCul / iWma
                    chartArr[num].wmaFiveTeen = wmaFiveTeen.toFixed(2)
                    }
        
                    // WMA Twenty --------------------------------------------------------------------
                    wmaCul = newestPull[0].price * 20
                    weight = 19
                    wmaInterval = 0
                    iWma = 20
        
                    if (dataPull.historical.length < 19) {
                        chartArr[num].wmaTwenty = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 18; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaTwenty = wmaCul / iWma
                    chartArr[num].wmaTwenty = wmaTwenty.toFixed(2)
                    }
        
                // WMA THIRTY --------------------------------------------------------------------
                
                    wmaCul = newestPull[0].price * 30
                    weight = 29
                    wmaInterval = 0
                    iWma = 30
        
                    if (dataPull.historical.length < 30) {
                        chartArr[num].wmaThirty = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 28; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaThirty = wmaCul / iWma
                    chartArr[num].wmaThirty = wmaThirty.toFixed(2)
                    }
        
                // WMA FIFTY --------------------------------------------------------------------
        
                    wmaCul = newestPull[0].price * 50
                    weight = 49
                    wmaInterval = 0
                    iWma = 50
        
                    if (dataPull.historical.length < 50) {
                        chartArr[num].wmaFifty = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 48; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaFifty = wmaCul / iWma
                    chartArr[num].wmaFifty = wmaFifty.toFixed(2)
                    }
        
                // WMA ONE HUNDRED --------------------------------------------------------------------
        
                    wmaCul = newestPull[0].price * 100
                    weight = 99
                    wmaInterval = 0
                    iWma = 100
        
                    if (dataPull.historical.length < 100) {
                        chartArr[num].wmaOneHun = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 98; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaOneHun = wmaCul / iWma
                    chartArr[num].wmaOneHun = wmaOneHun.toFixed(2)
                    }

                // WMA TWO HUNDRED --------------------------------------------------------------------
        
                    wmaCul = newestPull[0].price * 200
                    weight = 199
                    wmaInterval = 0
                    iWma = 200
        
                    if (dataPull.historical.length < 200) {
                        chartArr[num].wmaTwoHun = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 198; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaTwoHun = wmaCul / iWma
                    chartArr[num].wmaTwoHun = wmaTwoHun.toFixed(2)
                    }

                }
                catch(e) 
                {
                      
                }
                
    }
    // VWMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
    function vwmaFunction(chartArr, dataPull, newestPull, num) {

        // VWMA FIVETEEN --------------------------------------------------------------------

        const newPrice = newestPull[0].price
        const newVol = newestPull[0].volume

        let volCul = newestPull[0].volume
        let totalCul = newPrice * newVol
        let price = 0
        let volume = 0

        try {
        if (dataPull.historical.length < 14) {
            chartArr[num].vwmaFiveTeen = 'No Data'
        } else {
            for (let i = 0; i <= 13; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaFiveTeen = totalCul/volCul
            chartArr[num].vwmaFiveTeen = vwmaFiveTeen.toFixed(2)
        }

        // VWMA TWENTY --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 19) {
            chartArr[num].vwmaTwenty = 'No Data'
        } else {
            for (let i = 0; i <= 18; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaTwenty = totalCul/volCul
            chartArr[num].vwmaTwenty = vwmaTwenty.toFixed(2)
        }

        // VWMA THIRTY --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 29) {
            chartArr[num].vwmaThirty = 'No Data'
        } else {
            for (let i = 0; i <= 28; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaThirty = totalCul/volCul
            chartArr[num].vwmaThirty = vwmaThirty.toFixed(2)
        }

        // VWMA FIFTY --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 49) {
            chartArr[num].vwmaFifty = 'No Data'
        } else {
            for (let i = 0; i <= 48; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaFifty = totalCul/volCul
            chartArr[num].vwmaFifty = vwmaFifty.toFixed(2)
        }

        // VWMA ONEHUN --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 99) {
            chartArr[num].vwmaOneHun = 'No Data'
        } else {
            for (let i = 0; i <= 98; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaOneHun = totalCul/volCul
            chartArr[num].vwmaOneHun = vwmaOneHun.toFixed(2)
        }

        // VWMA TWOHUN --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 199) {
            chartArr[num].vwmaTwoHun = 'No Data'
        } else {
            for (let i = 0; i <= 198; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaTwoHun = totalCul/volCul
            chartArr[num].vwmaTwoHun = vwmaTwoHun.toFixed(2)
        }

        }
        catch(e) 
        {
            
        }
    }
    // EMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------       
    function emaFunction(chartArr, dataPull, newestPull, num, macdCallBack) {

        const newPrice = newestPull[0].price

                    let emaTwelve = 22
                    let emaTwentySix = 50
                    let emaFifty = 98
                    let emaTwoHun = 398
                    let prevDayEmaSub = 0
                    let arrEma = []

                    let macdTwelve = [] // ARRs USED FOR MACD TWELVE HISTORY
                    let macdTwentySix = [] // ARRs USED FOR MACD TWENTY SIX HISTORY
                   
// EMA TWELVE ----------------------------------------------------------------------
try {
                    if (dataPull.historical.length <= 24) {
                        chartArr[num].emaTwelve = 'No Data'
                    } else {
                    while (emaTwelve >= 11) {
                        prevDayEmaSub += dataPull.historical[emaTwelve].close
                        emaTwelve--
                        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                        
                        const subEMA = prevDayEmaSub / 12
                        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                        const finalSubEma = ((2/13) * (dataPull.historical[emaTwelve].close - subEMA)) + subEMA
                        arrEma.unshift(finalSubEma)
                        emaTwelve--

                        while (emaTwelve >= 0) {
                            let derp = ((2/13) * (dataPull.historical[emaTwelve].close - arrEma[0])) + arrEma[0]
                            arrEma.unshift(derp)
                            arrEma.pop()
                            if (emaTwelve < 8 && emaTwelve >= 0) { //THIS IF STATEMENT IS TO STORE VARIABLES FOR LATER MACD SIGNAL LINE
                                macdTwelve.unshift(derp)
                            }
                            emaTwelve--
                        }

                        const finalEma = ((2/13) * (newPrice - arrEma[0])) + arrEma[0]
                            arrEma.unshift(finalEma)
                            arrEma.pop()
                            macdTwelve.unshift(finalEma)

                        chartArr[num].emaTwelve = arrEma[0].toFixed(2) 
                        arrEma.pop()
                        prevDayEmaSub = 0 
                    }

 // EMA TWENTY SIX ----------------------------------------------------------------------

                    if (dataPull.historical.length <= 51) {
                        chartArr[num].emaTwentySix = 'No Data'
                    } else {
                    while (emaTwentySix >= 25) {
                        prevDayEmaSub += dataPull.historical[emaTwentySix].close
                        emaTwentySix--
                        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                        const subEMA = prevDayEmaSub / 26
                        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                        const finalSubEma = ((2/27) * (dataPull.historical[emaTwentySix].close - subEMA)) + subEMA
                        arrEma.unshift(finalSubEma)
                        emaTwentySix--
                        while (emaTwentySix >= 0) {
                            let derp = ((2/27) * (dataPull.historical[emaTwentySix].close - arrEma[0])) + arrEma[0]
                            arrEma.unshift(derp)
                            arrEma.pop()
                            if (emaTwentySix < 8 && emaTwentySix >= 0) { //THIS IF STATEMENT IS TO STORE VARIABLES FOR LATER MACD SIGNAL LINE
                                macdTwentySix.unshift(derp)
                            }
                            emaTwentySix--
                        }

                        const finalEma = ((2/27) * (newPrice - arrEma[0])) + arrEma[0]
                        arrEma.unshift(finalEma)
                        arrEma.pop()
                        macdTwentySix.unshift(finalEma)

                        chartArr[num].emaTwentySix = arrEma[0].toFixed(2) 
                        arrEma.pop() 
                        prevDayEmaSub = 0
                    }   

// EMA FIFTY -----------------------------------------------------------------------------

                    if (dataPull.historical.length <= 100) {
                        chartArr[num].emaFifty = 'No Data'
                    } else {
                    while (emaFifty >= 49) {
                        prevDayEmaSub += dataPull.historical[emaFifty].close
                        emaFifty--
                        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                        const subEMA = prevDayEmaSub / 50
                        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                        const finalSubEma = ((2/51) * (dataPull.historical[emaFifty].close - subEMA)) + subEMA
                        arrEma.unshift(finalSubEma)
                        emaFifty--
                        while (emaFifty >= 0) {
                            let derp = ((2/51) * (dataPull.historical[emaFifty].close - arrEma[0])) + arrEma[0]
                            arrEma.unshift(derp)
                            arrEma.pop()
                            emaFifty--
                        }

                        const finalEma = ((2/51) * (newPrice - arrEma[0])) + arrEma[0]
                        arrEma.unshift(finalEma)
                        arrEma.pop()

                        chartArr[num].emaFifty = arrEma[0].toFixed(2) 
                        arrEma.pop() 
                        prevDayEmaSub = 0
                    }

// EMA TWO HUNDRED -----------------------------------------------------------------------------

                    if (dataPull.historical.length <= 400) {
                        chartArr[num].emaTwoHun = 'No Data'
                    } else {
                    while (emaTwoHun >= 199) {
                        prevDayEmaSub += dataPull.historical[emaTwoHun].close
                        emaTwoHun--
                        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                        const subEMA = prevDayEmaSub / 200
                        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                        const finalSubEma = ((2/201) * (dataPull.historical[emaTwoHun].close - subEMA)) + subEMA
                        arrEma.unshift(finalSubEma)
                        emaTwoHun--
                        while (emaTwoHun >= 0) {
                            let derp = ( (2/201) * (dataPull.historical[emaTwoHun].close - arrEma[0])) + arrEma[0]
                            arrEma.unshift(derp)
                            arrEma.pop()
                            emaTwoHun--
                        }

                        const finalEma = ((2/201) * (newPrice - arrEma[0])) + arrEma[0]
                        arrEma.unshift(finalEma)
                        arrEma.pop()

                        chartArr[num].emaTwoHun = arrEma[0].toFixed(2) 
                        arrEma.pop() 
                        prevDayEmaSub = 0
                    }

                }
                    catch(e) 
                    {
                          
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

    try {

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
            chartArr[num].macdHistogram = 'No Data'
        }
        if (chartArr[num].macd === 'NaN') {
            chartArr[num].macd = 'No Data'
        }
        if (chartArr[num].macdSignalLine === 'NaN') {
            chartArr[num].macdSignalLine = 'No Data'
        }

        }
        catch(e) 
        {
            
        }

    }
    // RSI FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------      
    function rsiFunction(chartArr, dataPull, newestPull, num) {

        const newPrice = newestPull[0].price

        let iRSI = 13
        let iRSIAdjusted = 14
        let recentUpper = 0
        let recentDowner = 0
        let upMove = 0
        let downMove = 0
        let pastDownPeriod = 0
        let pastUpPeriod = 0

        try {
    // CHECK TO SEE IF DATA PULL CAN PULL ENOUGH DATA TO BE EFFECTIVE 
        if (dataPull.historical.length <= 14) {
            chartArr[num].rsi = 'No Data'
        } else {
        // LOOP FOR AVERAGE
        while (iRSI >= 0) {
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
        if (newPrice > dataPull.historical[0].close) {
                recentUpper = newPrice - dataPull.historical[0].close
            } else {
                recentDowner = dataPull.historical[0].close - newPrice
            }
    
        pastUpPeriod = ((averageUp * 13) + recentUpper) / 14
        pastDownPeriod = ((averageDown * 13) + recentDowner) / 14

        let rsi = 100 - (100 / (1 + pastUpPeriod/pastDownPeriod))
        chartArr[num].rsi = rsi.toFixed(2)

        }

        }
        catch(e) 
        {
            
        }

    } 
    // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function stochOsc1433Function(chartArr, dataPull, newestPull, num) {

        let newPrice = newestPull[0].price
        
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

       try { 
    if (dataPull.historical.length < 18) {
    chartArr[num].stochasticK = 'No Data'
    } else {

    // GETTING HIGHS AND LOWS OF PERIOD------------------------------------------------------

            while (iSO >= 0) {
                soLowHolder.push(dataPull.historical[iSO].low)
                soHighHolder.push(dataPull.historical[iSO].high)
                iSO--
            }

            soHighHolder.push(newPrice)
            soLowHolder.push(newPrice)

            
            highestHigh = Math.max(...soHighHolder)
            lowestLow = Math.min(...soLowHolder)

            if (lowestLow === newPrice) {
                newPrice = dataPull.historical[0].close
            }

            if (highestHigh === newPrice) {
                newPrice = dataPull.historical[0].close
            }
            
            topForm.push(newPrice - lowestLow)
            bottomForm.push(highestHigh - lowestLow)

            //FOR %K
            chartArr[num].stochasticK = (((newPrice - lowestLow) / (highestHigh - lowestLow)) * 100).toFixed(2)
                // VERY IMPORT - REWORK THE STOCHASTIC NAMES AND THATS WHY ITS UNDEFINDED. REWRITE TO SHOW IN TECHIN

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

                topForm.push(dataPull.historical[0].close - lowestLow)
                bottomForm.push(highestHigh - lowestLow)

                topFormTwo.push(dataPull.historical[0].close - lowestLow)
                bottomFormTwo.push(highestHigh - lowestLow)


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

                topForm.push(dataPull.historical[1].close - lowestLow)
                bottomForm.push(highestHigh - lowestLow)

                topFormTwo.push(dataPull.historical[1].close - lowestLow)
                bottomFormTwo.push(highestHigh - lowestLow)

                topFormThree.push(dataPull.historical[1].close - lowestLow)
                bottomFormThree.push(highestHigh - lowestLow)

    // AFTER 3 WE SUM IT UP --------------- TO GET 1 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------

                let sumTop = topForm.reduce((a,b) => a + b, 0)
                let sumBottom = bottomForm.reduce((a,b) => a + b, 0)

                let slowD = (sumTop / sumBottom) * 100
                
                // FOR %D
                chartArr[num].stochasticD = (slowD / 3).toFixed(2)

                signalLineHolder.push(slowD)
  

    //RESET VARS ---------------------------------------------------------------------

                iSO = 16
                soLowHolder = []
                soHighHolder = []
                highestHigh = 0
                lowestLow = 0
                sumTop = 0
                sumBottom = 0
                slowD = 0

    // GETTING HIGHS AND LOWS OF PERIOD------------------------------------------------

                    while (iSO >= 3) { 
                        soLowHolder.push(dataPull.historical[iSO].low)
                        soHighHolder.push(dataPull.historical[iSO].high)
                        iSO--
                    }
                    highestHigh = Math.max(...soHighHolder)
                    lowestLow = Math.min(...soLowHolder)

                    topFormTwo.push(dataPull.historical[2].close - lowestLow)
                    bottomFormTwo.push(highestHigh - lowestLow)

                    topFormThree.push(dataPull.historical[2].close - lowestLow)
                    bottomFormThree.push(highestHigh - lowestLow)

    // AFTER 3 WE SUM IT UP --------------- TO GET 2 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------

                    sumTop = topFormTwo.reduce((a,b) => a + b, 0)
                    sumBottom = bottomFormTwo.reduce((a,b) => a + b, 0)

                    slowD = (sumTop / sumBottom) * 100

                    signalLineHolder.push(slowD)

    //RESET VARS ---------------------------------------------

                    iSO = 17
                    soLowHolder = []
                    soHighHolder = []
                    highestHigh = 0
                    lowestLow = 0
                    sumTop = 0
                    sumBottom = 0
                    slowD = 0

    // GETTING HIGHS AND LOWS OF PERIOD-----------------------------------

                        while (iSO >= 4) {
                            soLowHolder.push(dataPull.historical[iSO].low)
                            soHighHolder.push(dataPull.historical[iSO].high)
                            iSO--
                        }
                        highestHigh = Math.max(...soHighHolder)
                        lowestLow = Math.min(...soLowHolder)

                        topFormThree.push(dataPull.historical[3].close - lowestLow)
                        bottomFormThree.push(highestHigh - lowestLow)


    // AFTER 3 WE SUM IT UP --------------- TO GET 3 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------
                        
                        sumTop = topFormThree.reduce((a,b) => a + b, 0)
                        sumBottom = bottomFormThree.reduce((a,b) => a + b, 0)

                        slowD = (sumTop / sumBottom) * 100

                        signalLineHolder.push(slowD)

                // ----------- TALLY UP LAST SMOOTHING -------------------------------
                        const sumStochD = signalLineHolder.reduce((a,b) => a + b, 0)
                        let smaD = sumStochD / 3

                        if (smaD < 0) {
                            smaD *= -1
                            chartArr[num].stochasticSignal = smaD.toFixed(2)
                        } else {
                            chartArr[num].stochasticSignal = smaD.toFixed(2)
                        }

        }

                }
                catch(e) 
                {
                    
                }

    }
   // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function williamsRFunction(chartArr, dataPull, newestPull, num) {

        const newPrice = newestPull[0].price


                    let highs = []
                    let lows = []
                    let lowestLow = 0
                    let highestHigh = 0
        try {
                    if (dataPull.historical.length < 14) {
                        chartArr[num].williams = 'No Data'
                    } else {
                        for (let i = 0; i <= 13; i++) {
                            highs.push(dataPull.historical[i].high)
                            lows.push(dataPull.historical[i].low)
                        }

                        highs.push(newPrice)
                        lows.push(newPrice)

                        lowestLow = Math.min(...lows)
                        highestHigh = Math.max(...highs)
        
                        const williams = (highestHigh - dataPull.historical[0].close) / (highestHigh - lowestLow) * -100
                        
                        chartArr[num].williamsR = williams.toFixed(2)
                    }

                }
                catch(e) 
                {
                      
                }
    }

    // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function cciFunction(chartArr, dataPull, newestPull, num) {

        const newPrice = newestPull[0].price


                    let tpvCul = 0
                    let tpv = []
                    let tpvMa = 0
                    let tpvCurrent  = newPrice
                    const recentTpv = newPrice
        try {
                    if (dataPull.historical.length < 19) {
                        chartArr[num].cciTwenty = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 19; i++) {
                            
                            const {high, close, low} = dataPull.historical[i];  
                            tpv.push(tpvCurrent) // PUSH FIRST NUMBER IN
                            tpvCurrent = (close + high + low) / 3
        
                           
                        }
                        // ---- TPV SMA ------------------------
                        tpvCul = tpv.reduce((a, b) => a + b)
                        tpvMa = tpvCul / 20
                        // TOP HALF OF FORMULA - DIVIDE BY PART TWO
                        const partOne = recentTpv - tpvMa
        
                        const meanD = tpv.map(x => x - tpvMa)
                        const meanDMap = meanD.map(x => Math.abs(x))
                        const meanDSum = meanDMap.reduce((a,b) => a + b)
                        const meanDiv = meanDSum / 20
                        // PART TWO OF FORMULA --------------
                        const partTwo = meanDiv * 0.015
                        // CCI ------------------------------
                        const cci = (partOne / partTwo)
                        
                        chartArr[num].cciTwenty = cci.toFixed(2)
                    }
                }
                catch(e) 
                {
                      
                }
    }
    // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function bollingerBandsFunction(chartArr, dataPull, newestPull, num) {
        
        const newPrice = newestPull[0].price

        let smaCul = 0
        let closeHolder = []
try {
        if (dataPull.historical.length < 19) {
            chartArr[num].bbUpper = 'No Data'
            chartArr[num].bbLower = 'No Data'
            chartArr[num].bbMiddle = 'No Data'
        } else {
                let closeP = newPrice
            for (let i = 0; i <= 19; i++) {
                closeHolder.push(closeP)
                smaCul += closeP
                closeP = dataPull.historical[i].close
            }
                // STANDARD DEVIATION CALC --------------------------------
                const smaTwenty = smaCul / 20
            
                const priceAdj = closeHolder.map(x => x - smaTwenty)
            
                const priceAdjAbs = priceAdj.map(x => Math.abs(x))

                const priceAdjSqrt = priceAdjAbs.map(x => x * x)
                
                const partOneDev = priceAdjSqrt.reduce((a,b) => a + b)
                
                const partTwoDev = partOneDev / 20
                const standardDev = Math.sqrt(partTwoDev)
                // BB BAND CALC --------------------------------------------
                const bbUpper = smaTwenty + (standardDev * 2)
                const bbLower = smaTwenty - (standardDev * 2)

                chartArr[num].bbUpper = bbUpper.toFixed(2)
                chartArr[num].bbLower = bbLower.toFixed(2)
                chartArr[num].bbMiddle = smaTwenty.toFixed(2)
        }
    }
    catch(e) 
    {
          
    }

    }
    // VWAP FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------       
    function vwapFunction(chartArr, dataPull, num) {
      
        // ----------- VWAP CALUC -------------------------------------------
            let dayLengthPeriod = 0
            let tpvCul = 0
            let volumeCul = 0
            let tempVWAP = [] // HOLD VWAP PERIOD - TAKES FROM 0 INDEX FOR MOST CURRENT
            try {
        // -------------THIS IS FOR GETTING THE DAY LENGTH FOR VWAP
        while (dataPull[dayLengthPeriod].date.slice(0,10) === todayDate) { 
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
                let vwap =  tempVWAP[0].toFixed(2)
                chartArr[num].vwap = vwap  
                
            }
            catch(e) 
            {
                  
            }
    }

    

 // TA FUNCTION ---------------------------------------------------------------------
 async function technicalIndicators() {
 
    let j = 0

    while (j < 10) { // LOOP FOR TECHNICAL SYMBOL

        // THIS IS THE ALL MIGHTY SYMBOL USED FOR PULLS
        const {symbol} = finalChart[j]

        //THIS PULL IS FOR CLOSE PRICES TO CALC TAs PAST CLOSE DATA // 
        const resSMA = await  fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
        const dataSMA = await resSMA.json() // SMA PULL USED FOR OTHER CALCS
        // SET RECENT YESTERDAY VOLUME
        finalChart[j].yesterdayVolume = dataSMA.historical[0].volume
         //THIS PULL IS FOR OSCILLATORS ALL CURRENT CLOSE DATA
         const resOscPulled = await fetch(`https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
         const dataRecentPulled = await resOscPulled.json()
        // SET RECENT VOLUME
        finalChart[j].volume = dataRecentPulled[0].volume

        // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
        const resVWAP = await  fetch(`https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
        const dataVWAP = await resVWAP.json()
         
            vwapFunction(finalChart, dataVWAP, j)
         
            // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
           smaFunction(finalChart, dataSMA, dataRecentPulled, j)

            // WMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            wmaFunction(finalChart, dataSMA, dataRecentPulled, j) 

            // VWMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            vwmaFunction(finalChart, dataSMA, dataRecentPulled, j)
                  
            // EMA WITH MACD CALLBACK ------------------------------------------------------------------------------------------------------------------------------------------       
            emaFunction(finalChart, dataSMA, dataRecentPulled, j, macdFunction)
 
            // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            rsiFunction(finalChart, dataSMA, dataRecentPulled, j)
        
            // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            stochOsc1433Function(finalChart, dataSMA, dataRecentPulled, j) //DATA VWAP USED FOR RECETN CLOSE DATA

            // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            williamsRFunction(finalChart, dataSMA, dataRecentPulled, j)

            // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            cciFunction(finalChart, dataSMA, dataRecentPulled, j)

            // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
           bollingerBandsFunction(finalChart, dataSMA, dataRecentPulled, j)
           
        j++ // UPDATE WHILE LOOP

    }// THIS IS THE END OF LOOP
           
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
         stocksUp[i].volumeYesterdayUp = stocksDown[i].yesterdayVolume
         delete stocksUp[i].yesterdayVolume
         stocksUp[i].vwapUp = stocksUp[i].vwap
         delete stocksUp[i].vwap
         stocksUp[i].stochasticDUp = stocksUp[i].stochasticD
         delete stocksUp[i].stochasticD
         stocksUp[i].stochasticKUp = stocksUp[i].stochasticK
         delete stocksUp[i].stochasticK
         stocksUp[i].stochasticSignalUp = stocksUp[i].stochasticSignal
         delete stocksUp[i].stochasticSignal
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
         stocksUp[i].cciUp = stocksUp[i].cciTwenty
         delete stocksUp[i].cciTwenty
         stocksUp[i].bbUpperUp = stocksUp[i].bbUpper
         delete stocksUp[i].bbUpper
         stocksUp[i].bbLowerUp = stocksUp[i].bbLower
         delete stocksUp[i].bbLower
         stocksUp[i].bbMiddleUp = stocksUp[i].bbMiddle
         delete stocksUp[i].bbMiddle
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
         stocksDown[i].volumeYesterdayDown = stocksDown[i].yesterdayVolume
         delete stocksDown[i].yesterdayVolume
         stocksDown[i].vwapDown = stocksDown[i].vwap
         delete stocksDown[i].vwap
         stocksDown[i].stochasticDDown = stocksDown[i].stochasticD
         delete stocksDown[i].stochasticD
         stocksDown[i].stochasticKDown = stocksDown[i].stochasticK
         delete stocksDown[i].stochasticK
         stocksDown[i].stochasticSignalDown = stocksDown[i].stochasticSignal
         delete stocksDown[i].stochasticSignal
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
         stocksDown[i].cciDown = stocksDown[i].cciTwenty
         delete stocksDown[i].cciTwenty
         stocksDown[i].bbUpperDown = stocksDown[i].bbUpper
         delete stocksDown[i].bbUpper
         stocksDown[i].bbLowerDown = stocksDown[i].bbLower
         delete stocksDown[i].bbLower
         stocksDown[i].bbMiddleDown = stocksDown[i].bbMiddle
         delete stocksDown[i].bbMiddle
     }
 }
 // PARENT TO APPEND ---------------------------------------------------
 const litterBox = document.getElementById('litter-box') 
 
 function buildIt() {
  
 for (let i = 0; i < stocksDown.length; i++) {
 
 // DECONSTRUCTING UP AND DOWN VAR
     const {avgVolumeUp, volumeYesterdayUp, changeUp, changesPercentageUp, priceUp, symbolUp, volumeUp, vwapUp, smaFiveTeenUp, smaTwentyUp, smaThirtyUp, smaFiftyUp, smaOneHunUp, smaTwoHunUp, emaTwelveUp, emaTwentySixUp, emaFiftyUp, emaTwoHunUp, wmaFiveTeenUp, wmaTwentyUp, wmaThirtyUp, wmaFiftyUp, wmaOneHunUp, wmaTwoHunUp, vwmaFiveTeenUp, vwmaTwentyUp, vwmaThirtyUp, vwmaFiftyUp, vwmaOneHunUp, vwmaTwoHunUp, macdUp, macdHistogramUp, macdSignalLineUp, rsiUp, stochasticDUp, stochasticKUp, stochasticSignalUp, cciUp, bbMiddleUp, bbLowerUp, bbUpperUp, williamsRUp} = stocksUp[i]
 
     const {avgVolumeDown, volumeYesterdayDown, changeDown, changesPercentageDown, priceDown, symbolDown, volumeDown, vwapDown, smaFiveTeenDown, smaTwentyDown, smaThirtyDown, smaFiftyDown, smaOneHunDown, smaTwoHunDown, emaTwelveDown, emaTwentySixDown, emaFiftyDown, emaTwoHunDown, wmaFiveTeenDown, wmaTwentyDown, wmaThirtyDown, wmaFiftyDown, wmaOneHunDown, wmaTwoHunDown, vwmaFiveTeenDown, vwmaTwentyDown, vwmaThirtyDown, vwmaFiftyDown, vwmaOneHunDown, vwmaTwoHunDown, macdDown, macdHistogramDown, macdSignalLineDown, rsiDown, stochasticDDown, stochasticKDown, stochasticSignalDown, cciDown, bbMiddleDown, bbLowerDown, bbUpperDown , williamsRDown} = stocksDown[i]
 

// VOLUME INCREASE TODAY ------------------------

// UP VOLUME INCREASE ----------------------------

   let volumeIncreaseUp = 0;

    if (volumeUp > avgVolumeUp) {
        let increase = volumeUp - avgVolumeUp;
        volumeIncreaseUp = (increase / avgVolumeUp) * 100
    }
    else
    {
        let decrease = avgVolumeUp - volumeUp;
        volumeIncreaseUp = (decrease / avgVolumeUp) * -100
    }
// DOWN VOLUME INCREASE ----------------------------
     let volumeIncreaseDown = 0;

    if (volumeDown > avgVolumeDown) {
        let increase = volumeDown - avgVolumeDown;
        volumeIncreaseDown = (increase / avgVolumeDown) * 100
    }
    else
    {
        let decrease = avgVolumeDown - volumeDown;
        volumeIncreaseDown = (decrease / avgVolumeDown) * -100
    }

// TO GET AVERAGE DAILY VOLUME FOR YESTERDAY ----------------

// YESTERDAY UP VOLUME INCREASE ----------------------------

   let yesterdayVolIncreaseUp = 0;

    if (volumeYesterdayUp > avgVolumeUp) {
        let increase =  volumeYesterdayUp - avgVolumeUp;
        yesterdayVolIncreaseUp = (increase / avgVolumeUp) * 100
    }
    else
    {
        let decrease = avgVolumeUp - volumeYesterdayUp;
        yesterdayVolIncreaseUp = (decrease / avgVolumeUp) * -100
    }

// YESTERDAY DOWN VOLUME INCREASE ----------------------------

   let yesterdayVolIncreaseDown = 0;

    if (volumeYesterdayDown > avgVolumeDown) {
        let increase = volumeYesterdayDown - avgVolumeDown;
        yesterdayVolIncreaseDown = (increase / avgVolumeDown) * 100
    }
    else
    {
        let decrease = avgVolumeDown - volumeYesterdayDown;
        yesterdayVolIncreaseDown = (decrease / avgVolumeDown) * -100
    }
    
     let changeDownAdjusted = changeDown
  // ADJUST PERCENTAGE TO POSITIVE - ARROW WILL SIGNAL UP OR DOWN 
    if (changeDownAdjusted < 0) {
        changeDownAdjusted = changeDownAdjusted * -1
    }
 
     const litter = document.createElement('div')
     litter.classList.add('row-ex')
     litter.innerHTML = `
 
 
     <!----------------------------------- DOWNER --------------------------------------->
     <div class="downer symbol-box" data-index="${i}">
         <h2 id="symbol">${symbolDown}</h2>
         <p class="price">Price: $${priceDown.toFixed(2)}</p>
         <div class="changes-row">
         <p>${changesPercentageDown.toFixed(2)}%</p>
         <svg id="downArrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 400" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g id="eJjdz69mVex2" transform="matrix(0.99132899255994 0.00125353493548 0.00179456906301 -1.41919326774185 0 5360)"><g id="eJjdz69mVex3" transform="matrix(0.10000000000000 0 0 0.10000000000000 0.00000000000023 0.00000000000023)"><path id="eJjdz69mVex4" d="M29164.905156,10134.800000L28991.385074,10784.799602L28821.634757,10614.426482L27244.542329,12197.305156L27102.400000,12054.641316L28679.492428,10471.762642L28517.281642,10308.956716L29164.905156,10134.800000" transform="matrix(0.70853823648212 -0.70567242219234 0.70567242219234 0.70853823648212 -27361.22396364336601 48339.92537327134050)" fill="rgb(230,102,102)" stroke="none" stroke-width="1"/><path id="eJjdz69mVex5" d="M36131.700000,8167.800000C36128.200000,8167.800000,36124.700000,8168.900000,36121.700000,8170.900000C34563.300000,9219.200000,32199.200000,8231.400000,32175.500000,8221.300000C32169.500000,8218.300000,32162.200000,8218.800000,32156.700000,8222.800000C32151.200000,8226.700000,32148.300000,8233.400000,32149.300000,8240.100000C32150.300000,8246.800000,32154.900000,8252.400000,32161.300000,8254.600000C32185.300000,8264.700000,34566.400000,9259.600000,36142.200000,8200.900000C36148.700000,8196.400000,36151.500000,8188.300000,36149.200000,8180.800000C36146.900000,8173.300000,36140,8168.100000,36132.200000,8167.900000L36131.700000,8167.800000" transform="matrix(1 0 0 1 -23974.95002737504910 24467.33418583546154)" fill="rgb(255,255,255)" stroke="none" stroke-width="1"/><path id="eJjdz69mVex6" d="M24267.800000,8167.800000C24260,8167.900000,24253.100000,8173.100000,24250.800000,8180.600000C24248.500000,8188.200000,24251.300000,8196.300000,24257.800000,8200.800000C25833.100000,9259.500000,28214.600000,8264.500000,28238.700000,8254.500000C28243.100000,8252.600000,28246.600000,8249.100000,28248.400000,8244.600000C28250.200000,8240.100000,28250.200000,8235.100000,28248.300000,8230.700000C28244.200000,8221.700000,28233.700000,8217.500000,28224.500000,8221.100000C28200.700000,8231.100000,25837.100000,9218.400000,24278.300000,8170.800000C24275.200000,8168.700000,24271.500000,8167.700000,24267.800000,8167.800000" transform="matrix(1 0 0 1 -23974.95002737508185 24467.33418583546154)" fill="rgb(255,255,255)" stroke="none" stroke-width="1"/></g></g></svg>
         <p>$${changeDownAdjusted.toFixed(2)}</p>
         </div>
     </div>
     <!----------------------------------- THIS WILL HOLD TECH ANALYSIS FOR HOVER POPULATE IN MIDDLE ---------------------------------------->
  
    <div class="tech-down-${i}">
 
     <h2 class="tech-title">Daily Indicators</h2>
 
         <div class="tech-vol-row">
         <a class="info-link" href="https://www.investopedia.com/terms/d/downvolume.asp" target="_blank"><h3 class='tech-header'>Volume</h3></a>
         <p>Average: <span class="tech-to-left">${avgVolumeDown}</span></p>
             <p>Today: <span class="tech-to-left">${volumeDown}</span></p>
             <p>Overall Increase: <span class="tech-to-left"> ${volumeIncreaseDown.toFixed(2)}%</span></p>

             <p>Yesterday: <span class="tech-to-left"> ${volumeYesterdayDown}</span></p>
             <p>Overall Difference: <span class="tech-to-left"> ${yesterdayVolIncreaseDown.toFixed(2)}%</span></p>
         </div>
 
         <div class="tech-row">

             <a class="info-link" href="https://www.investopedia.com/terms/s/sma.asp" target="_blank"><h3 class='tech-header'>SMA</h3></a>
                 <div class="averages-row">
                     <p>15: ${smaFiveTeenDown}</p>
                     <p>20: ${smaTwentyDown}</p>
                 </div>
                 <div class="averages-row">
                     <p>30: ${smaThirtyDown}</p>
                     <p>50: ${smaFiftyDown}</p>
                 </div>
                 <div class="averages-row">
                     <p>100: ${smaOneHunDown}</p>
                     <p>200: ${smaTwoHunDown}</p>
                 </div>
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/e/ema.asp" target="_blank"><h3 class='tech-header'>EMA</h3></a>
                 <div class="averages-row">
                     <p>12: ${emaTwelveDown}</p>
                     <p>26: ${emaTwentySixDown}</p>
                 </div>
                 <div class="averages-row">
                     <p>50: ${emaFiftyDown}</p>
                     <p>200: ${emaTwoHunDown}</p>
                 </div>           
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/ask/answers/071414/whats-difference-between-moving-average-and-weighted-moving-average.asp" target="_blank"><h3 class='tech-header'>WMA</h3></a>
                 <div class="averages-row">
                     <p>15: ${wmaFiveTeenDown}</p>
                     <p>20: ${wmaTwentyDown}</p>
                 </div>
                 <div class="averages-row">
                     <p>30: ${wmaThirtyDown}</p>
                     <p>50: ${wmaFiftyDown}</p>
                 </div>
                 <div class="averages-row">
                     <p>100: ${wmaOneHunDown}</p>
                     <p>200: ${wmaTwoHunDown}</p>
                 </div>
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.tradingsetupsreview.com/volume-weighted-moving-average-vwma/" target="_blank"><h3 class='tech-header'>VWMA</h3></a>
                 <div class="averages-row">
                     <p>15: ${vwmaFiveTeenDown}</p>
                     <p>20: ${vwmaTwentyDown}</p>
                 </div>
                 <div class="averages-row">
                     <p>30: ${vwmaThirtyDown}</p>
                     <p>50: ${vwmaFiftyDown}</p>
                 </div>
                 <div class="averages-row">
                     <p>100: ${vwmaOneHunDown}</p>
                     <p>200: ${vwmaTwoHunDown}</p>
                 </div>
         </div>

         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/v/vwap.asp" target="_blank"><h3 class='tech-header'>VWAP (5 Minute)</h3></a>
             <p class="osc-text">${vwapDown}</p>
         </div>

         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/m/macd.asp" target="_blank"><h3 class='tech-header'>MACD (12 , 26)</h3></a>
             <p class="osc-text">${macdDown}</p>
                 <div class="macd-row">
                     <p>Signal Line: ${macdSignalLineDown}</p>
                     <p>Histogram: ${macdHistogramDown}</p>
                 </div>
         </div>
 
         <div class="flex-rsi-cci">
             <div class="tech-row">
             <a class="info-link" href="https://www.investopedia.com/terms/s/stochrsi.asp" target="_blank"><h3 class='tech-header'>RSI</h3></a>
                 <p class="osc-text">${rsiDown}</p>
             </div>
 
             <div class="tech-row">
             <a class="info-link" href="https://www.investopedia.com/terms/c/commoditychannelindex.asp" target="_blank"><h3 class='tech-header'>CCI</h3></a>
                 <p class="osc-text">${cciDown}</p>
             </div>

         </div>

         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/w/williamsr.asp" target="_blank"><h3 class='tech-header'>Williams %R</h3></a>
             <p class="osc-text">${williamsRDown}</p>
         </div>

 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/s/stochasticoscillator.asp" target="_blank"><h3 class='tech-header'>Stochastic Oscillator</h3></a>
            <div class="averages-row">
                <p class="osc-text">%K: ${stochasticKDown}</p>
                <p class="osc-text">%D: ${stochasticDDown}</p>
            </div>
                <p class="osc-text">Signal Line: ${stochasticSignalDown}</p>
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/b/bollingerbands.asp" target="_blank"><h3 class='tech-header'>Bollinger Bands</h3></a>
                 <p class="osc-text">Middle: ${bbMiddleDown}</p>
             <div class="macd-row">
                 <p class="osc-text">Upper: ${bbUpperDown}</p>
                 <p class="osc-text">Lower: ${bbLowerDown}</p>
             </div>
         </div>

         <div class="news-row">
         <a class="stock-news-link" href="http://www.google.com/search?q=${symbolDown}+stock+news&source=lnms&tbm=nws&sa=X&ved=2ahUKEwj7_6eMpbPyAhXaVs0KHfuADvoQ_AUoAXoECAEQAw&biw=1280&bih=614" target="_blank">News About This Stock</a>
         </div>

     </div>
 
         <!----------------------------------- UPPER ---------------------------------------->
     <div class="upper symbol-box" data-index="${i}">
         <h2 id="symbol">${symbolUp}</h2>
         <p class="price">Price: $${priceUp.toFixed(2)}</p>
         <div class="changes-row">
         <p>${changesPercentageUp.toFixed(2)}%</p>
         <svg id="upArrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 400" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g id="ewG75ifXDmx2" transform="matrix(0.99132899255994 0.00125353493548 0.00179456906301 -1.41919326774185 0 5360)"><g id="ewG75ifXDmx3" transform="matrix(0.10000000000000 0 0 0.10000000000000 0.00000000000023 0.00000000000023)"><path id="ewG75ifXDmx4" d="M29164.905156,10134.800000L28991.385074,10784.799602L28821.634757,10614.426482L27244.542329,12197.305156L27102.400000,12054.641316L28679.492428,10471.762642L28517.281642,10308.956716L29164.905156,10134.800000" transform="matrix(-0.70853823648212 0.70567242219234 -0.70567242219234 -0.70853823648212 28243.81608984843479 24398.89755446932395)" fill="rgb(89,228,139)" stroke="none" stroke-width="1"/><path id="ewG75ifXDmx5" d="M36131.700000,8167.800000C36128.200000,8167.800000,36124.700000,8168.900000,36121.700000,8170.900000C34563.300000,9219.200000,32199.200000,8231.400000,32175.500000,8221.300000C32169.500000,8218.300000,32162.200000,8218.800000,32156.700000,8222.800000C32151.200000,8226.700000,32148.300000,8233.400000,32149.300000,8240.100000C32150.300000,8246.800000,32154.900000,8252.400000,32161.300000,8254.600000C32185.300000,8264.700000,34566.400000,9259.600000,36142.200000,8200.900000C36148.700000,8196.400000,36151.500000,8188.300000,36149.200000,8180.800000C36146.900000,8173.300000,36140,8168.100000,36132.200000,8167.900000L36131.700000,8167.800000" transform="matrix(1 0 0 1 -23974.95002737504910 24467.33418583546154)" fill="rgb(255,255,255)" stroke="none" stroke-width="1"/><path id="ewG75ifXDmx6" d="M24267.800000,8167.800000C24260,8167.900000,24253.100000,8173.100000,24250.800000,8180.600000C24248.500000,8188.200000,24251.300000,8196.300000,24257.800000,8200.800000C25833.100000,9259.500000,28214.600000,8264.500000,28238.700000,8254.500000C28243.100000,8252.600000,28246.600000,8249.100000,28248.400000,8244.600000C28250.200000,8240.100000,28250.200000,8235.100000,28248.300000,8230.700000C28244.200000,8221.700000,28233.700000,8217.500000,28224.500000,8221.100000C28200.700000,8231.100000,25837.100000,9218.400000,24278.300000,8170.800000C24275.200000,8168.700000,24271.500000,8167.700000,24267.800000,8167.800000" transform="matrix(1 0 0 1 -23974.95002737508185 24467.33418583546154)" fill="rgb(255,255,255)" stroke="none" stroke-width="1"/></g></g></svg>
         <p>$${changeUp.toFixed(2)}</p>
         </div>
     </div>
 
     <!----------------------------------- THIS WILL HOLD TECH ANALYSIS FOR HOVER POPULATE IN MIDDLE ---------------------------------------->
 
     <div class="tech-up-${i}">
 
     <h2 class="tech-title">Daily Indicators</h2>
 
             <div class="tech-row">
             <a class="info-link" href="https://www.investopedia.com/terms/u/upvolume.asp" target="_blank"><h3 class='tech-header'>Volume</h3></a>
                 <p>Average: <span class="tech-to-left"> ${avgVolumeUp}</span></p>
                 <p>Today:  <span class="tech-to-left"> ${volumeUp}</span></p>
                 <p>Overall Increase:  <span class="tech-to-left"> ${volumeIncreaseUp.toFixed(2)}%</span></p>

                 <p>Yesterday: <span class="tech-to-left"> ${volumeYesterdayUp}</span></p>
                 <p>Overall Difference: <span class="tech-to-left"> ${yesterdayVolIncreaseUp.toFixed(2)}%</span></p>
             </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/s/sma.asp" target="_blank"><h3 class='tech-header'>SMA</h3></a>
                <div class="averages-row">
                     <p>15: ${smaFiveTeenUp}</p>
                     <p>20: ${smaTwentyUp}</p>
                 </div>
                 <div class="averages-row">
                     <p>30: ${smaThirtyUp}</p>
                     <p>50: ${smaFiftyUp}</p>
                 </div>
                 <div class="averages-row">
                     <p>100: ${smaOneHunUp}</p>
                     <p>200: ${smaTwoHunUp}</p>
                 </div>
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/e/ema.asp" target="_blank"><h3 class='tech-header'>EMA</h3></a>
                 <div class="averages-row">
                     <p>12: ${emaTwelveUp}</p>
                     <p>26: ${emaTwentySixUp}</p>
                 </div>
                 <div class="averages-row">
                     <p>50: ${emaFiftyUp}</p>
                     <p>200: ${emaTwoHunUp}</p>
                 </div>
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/ask/answers/071414/whats-difference-between-moving-average-and-weighted-moving-average.asp" target="_blank"><h3 class='tech-header'>WMA</h3></a>
                 <div class="averages-row">
                     <p>15: ${wmaFiveTeenUp}</p>
                     <p>20: ${wmaTwentyUp}</p>
                 </div>
                 <div class="averages-row">
                     <p>30: ${wmaThirtyUp}</p>
                     <p>50: ${wmaFiftyUp}</p>
                 </div>
                 <div class="averages-row">
                     <p>100: ${wmaOneHunUp}</p>
                     <p>200: ${wmaTwoHunUp}</p>
                 </div>
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.tradingsetupsreview.com/volume-weighted-moving-average-vwma/" target="_blank"><h3 class='tech-header'>VWMA</h3></a>
                 <div class="averages-row">
                     <p>15: ${vwmaFiveTeenUp}</p>
                     <p>20: ${vwmaTwentyUp}</p>
                 </div>
                 <div class="averages-row">
                     <p>30: ${vwmaThirtyUp}</p>
                     <p>50: ${vwmaFiftyUp}</p>
                 </div>
                 <div class="averages-row">
                     <p>100: ${vwmaOneHunUp}</p>
                     <p>200: ${vwmaTwoHunUp}</p>
                 </div>
         </div>

         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/v/vwap.asp" target="_blank"><h3 class='tech-header'>VWAP (5 Minute)</h3></a>
             <p class="osc-text">${vwapUp}</p>
         </div>

         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/m/macd.asp" target="_blank"><h3 class='tech-header'>MACD (12 , 26)</h3></a>
             <p class="osc-text">${macdUp}</p>
                 <div class="macd-row">
                     <p>Signal Line: ${macdSignalLineUp}</p>
                     <p>Histogram: ${macdHistogramUp}</p>
                 </div>
         </div>
 
         <div class="flex-rsi-cci">
             <div class="tech-row">
             <a class="info-link" href="https://www.investopedia.com/terms/s/stochrsi.asp" target="_blank"><h3 class='tech-header'>RSI</h3></a>
             <p class="osc-text">${rsiUp}</p>
             </div>
 
             <div class="tech-row">
             <a class="info-link" href="https://www.investopedia.com/terms/c/commoditychannelindex.asp" target="_blank"><h3 class='tech-header'>CCI</h3></a>
                 <p class="osc-text">${cciUp}</p>
             </div>

         </div>

         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/w/williamsr.asp" target="_blank"><h3 class='tech-header'>Williams %R</h3></a>
             <p class="osc-text">${williamsRUp}</p>
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/s/stochasticoscillator.asp" target="_blank"><h3 class='tech-header'>Stochastic Oscillator</h3></a>
            <div class="averages-row">
            <p class="osc-text">%K: ${stochasticKUp}</p>
            <p class="osc-text">%D: ${stochasticDUp}</p>
            </div>
            <p class="osc-text">Signal Line: ${stochasticSignalUp}</p>
         </div>
 
         <div class="tech-row">
         <a class="info-link" href="https://www.investopedia.com/terms/b/bollingerbands.asp" target="_blank"><h3 class='tech-header'>Bollinger Bands</h3></a>
                 <p class="osc-text">Middle: ${bbMiddleUp}</p>
             <div class="macd-row">
                 <p class="osc-text">Upper: ${bbUpperUp}</p>
                 <p class="osc-text">Lower: ${bbLowerUp}</p>
             </div>
         </div>

         <div class="news-row">
         <a class="stock-news-link" href="http://www.google.com/search?q=${symbolUp}+stock+news&source=lnms&tbm=nws&sa=X&ved=2ahUKEwj7_6eMpbPyAhXaVs0KHfuADvoQ_AUoAXoECAEQAw&biw=1280&bih=614" target="_blank">News About This Stock</a>
         </div>

     </div> `
 
     rowOne.appendChild(litter)
 
     }
 
  //------------ ADD SECOND SCRIPT FOR JAVASCRIPT FUNCTIONALITY TO NEW ELEMENTS ---------------------- // 
 
    addSecondScript()
 
 }
 
 //------------ ADD SECOND SCRIPT FOR RUN ---------------------- // 
 function addSecondScript() {
     const scripty = document.createElement('script')
     scripty.setAttribute('src', 'function.js')
     document.body.appendChild(scripty)
 }
 
 //----- BUILD TO PAGE ----- // ------- AT SOME POINT THE FUNCTION WILL BE SET IN AN INTERVAL - HAVING THE ARRs CLEAR IS NOT A BAD IDEA
 var tech = document.getElementById('tech-in')
 async function buildToPage() {
 

     await tradableSymbols()
     
     await technicalIndicators()
 
     filterUpDownStocks()
 
     rowOne.innerHTML = '' // THIS CLEARS PRIOR HTML BEFORE BUILD
 
     buildIt()
     tech.innerHTML = ''
 
 
     
 }
 
 buildToPage()