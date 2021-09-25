const upper = $('.upper')
const downer = $('.downer')
let techIn = $('#tech-in')

const symbolBox = $('.symbol-box')

// CONFIGURE DOWN BOXES FOR FUNCTION ----------------------------

    downer.each(function() {
        $(this).click(function() {
            if ($(this).hasClass('active-down-symbol')) {

                animatedLoad() 
                setTimeout(() => {
                    $(this).removeClass('active-down-symbol')
                }, 500)

            } else {

                removeDownClass()
                removeUpClass()

                moveTechToTop()

                animatedLoad()
                expandDetract()

                setTimeout(() => {
                    $(this).addClass('active-down-symbol')
                }, 500)
            }
        })
    });

    upper.each(function() {
        $(this).click(function() {
            if ($(this).hasClass('active-up-symbol')) {

                animatedLoad() 

                setTimeout( () => {
                    $(this).removeClass('active-up-symbol')
                    
                }, 500)

            
            } else {

                removeUpClass()
                removeDownClass()

                moveTechToTop()

                expandDetract()
                animatedLoad()

            
                setTimeout(() => {
                    $(this).addClass('active-up-symbol')
                }, 500)
            }
        })
    })

    function removeDownClass() {
        downer.removeClass('active-down-symbol')
        }

    function removeUpClass() {
        upper.removeClass('active-up-symbol')
    }    

    function expandDetract() {
        setTimeout(() => {
            symbolBox.each(function() {
                $(this).css('width', '30%')
            })
        }, 500)
    }

    function animatedLoad() {
        symbolBox.each(function() {
            $(this).css('width', '50%')
        })
    }
// FILL TECHNICAL INDICATORS WITH THESE
    function fillDownTech() {
        downer.each(function() {
            $(this).click(function() {

                let index = $(this).attr('data-index')
                
                let downerTech = $(`.tech-down-${index}`).html()
                setTimeout(() => {
                    techIn.html(downerTech) 
                }, 500)
            })
        })
    }

    fillDownTech()

    function fillUpTech() {
        upper.each(function() {
            $(this).click(function() {

              
                let index = $(this).attr('data-index')
                
                let upperTech = $(`.tech-up-${index}`).html()
                setTimeout(() => {
                    techIn.html(upperTech)
                }, 500)
            })
        })
              
    }

    fillUpTech()

// MOVES TECH-IN TO TOP AFTER EACH sCLICK  
    function moveTechToTop() {
        setTimeout(() => {
            $('#tech-in').scrollTop(0)
        }, 500)
    }

// SEARCH STOCK ----------------------------------------------------

  class SearchObj {
      constructor(name) {
          this.symbol = name;
      }
  }

if ($(window).width() > 700) 
{

    $('.search-text').on('keyup', function(e) {

            if (e.keyCode == 13) {
                // GET VALUE SYMBOL NAME
                let ticker = $('.search-text').val();
                // SET OBJECT TO STORE PULL
                let symbolSearch = new SearchObj(ticker)  

                removeDownClass()
                removeUpClass()

                moveTechToTop()
                animatedLoad()

                $('.loading-search').css('display', 'flex');

                technicalIndicators(ticker, symbolSearch)
            }
        })

    }
    else 
    {
        $('.search-text').blur(function() {

            if ($(this).val() == '') {
                return;
            }
                 $(window).scrollTop($("#download-box"));
                // GET VALUE SYMBOL NAME
                let ticker = $('.search-text').val();
                // SET OBJECT TO STORE PULL
                let symbolSearch = new SearchObj(ticker)  

                removeDownClass()
                removeUpClass()

                moveTechToTop()
                animatedLoad()

                $('.loading-search').css('display', 'flex');

                technicalIndicators(ticker, symbolSearch)
            
        })

    }

// ---------------------- TECHNICAL INDICATOR FUNCTIONS FOR SEARCH SYMBOL ------------------------------------------------------------------------------------
 
     // SMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
     function smaFunction(searchedTicker, dataPull, newestPull) {
         
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
                searchedTicker.smaFiveTeen = 'No Data'
            } else {
                while (fiveTeenSMA >= 0) {
                    culSMA += dataPull.historical[fiveTeenSMA].close
                    fiveTeenSMA--
                    }
                    let smaFiveResult = ((culSMA + todayPricePull) / 15) 
                    searchedTicker.smaFiveTeen = smaFiveResult.toFixed(2) 
                    culSMA = 0
                    }
                            // ------------- 20 DAY SMA -------------------------------
            if (dataPull.historical.length <= 19) {
                searchedTicker.smaTwenty = 'No Data'
            } else {
                while (twentySMA >= 0) {
                    culSMA += dataPull.historical[twentySMA].close
                    twentySMA--
                    }
                    let smaTwentyResult = ((culSMA + todayPricePull) / 20)
                    searchedTicker.smaTwenty = smaTwentyResult.toFixed(2)
                    culSMA = 0
                    }
                            // ------------- 30 DAY SMA -------------------------------
            if (dataPull.historical.length <= 29) {
                searchedTicker.smaThirty = 'No Data'
            } else {
                while (thirtySMA >= 0) {
                    culSMA += dataPull.historical[thirtySMA].close
                    thirtySMA--
                    }
                    let smaThirtyResult = ((culSMA + todayPricePull) / 30) 
                    searchedTicker.smaThirty = smaThirtyResult.toFixed(2) 
                    culSMA = 0
                    }
                            // ------------- 50 DAY SMA -------------------------------
            if (dataPull.historical.length <= 49) {
                searchedTicker.smaFifty = 'No Data'
            } else {
                while (fiftySMA >= 0) {
                    culSMA += dataPull.historical[fiftySMA].close
                    fiftySMA--
                    }
                    let smaFiftyResult = ((culSMA + todayPricePull) / 50) 
                    searchedTicker.smaFifty = smaFiftyResult.toFixed(2)
                    culSMA = 0
                    } 
                            // ------------- 100 DAY SMA -------------------------------
            if (dataPull.historical.length <= 99) {
                searchedTicker.smaOneHun = 'No Data'
            } else {
                while (hunSMA >= 0) {
                    culSMA += dataPull.historical[hunSMA].close
                    hunSMA--
                    }
                    let smaOneHunResult = ((culSMA + todayPricePull) / 100) 
                    searchedTicker.smaOneHun = smaOneHunResult.toFixed(2)
                    culSMA = 0
                    }
                            // ------------- 200 DAY SMA -------------------------------
            if (dataPull.historical.length <= 199) {
                searchedTicker.smaTwoHun = 'No Data'
            } else {
                while (twoHunSMA >= 0) {
                    culSMA += dataPull.historical[twoHunSMA].close
                    twoHunSMA--
                    }
                    let smaTwoHunResult = ((culSMA + todayPricePull) / 200) 
                    searchedTicker.smaTwoHun = smaTwoHunResult.toFixed(2)
                    culSMA = 0 
                    }

                }
                catch(e) 
                {
                      
                }
                    
    } 
    // WMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
    function wmaFunction(searchedTicker, dataPull, newestPull) {


                    // WMA FiveTeen --------------------------------------------------------------------
                    let wmaCul = newestPull[0].price * 15
                    let weight = 14
                    let wmaInterval = 0
                    let iWma = 15
                   
                    try {
                    if (dataPull.historical.length < 14) {
                        searchedTicker.wmaFiveTeen = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 13; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaFiveTeen = wmaCul / iWma
                    searchedTicker.wmaFiveTeen = wmaFiveTeen.toFixed(2)
                    }
        
                    // WMA Twenty --------------------------------------------------------------------
                    wmaCul = newestPull[0].price * 20
                    weight = 19
                    wmaInterval = 0
                    iWma = 20
        
                    if (dataPull.historical.length < 19) {
                        searchedTicker.wmaTwenty = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 18; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaTwenty = wmaCul / iWma
                    searchedTicker.wmaTwenty = wmaTwenty.toFixed(2)
                    }
        
                // WMA THIRTY --------------------------------------------------------------------
                
                    wmaCul = newestPull[0].price * 30
                    weight = 29
                    wmaInterval = 0
                    iWma = 30
        
                    if (dataPull.historical.length < 30) {
                        searchedTicker.wmaThirty = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 28; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaThirty = wmaCul / iWma
                    searchedTicker.wmaThirty = wmaThirty.toFixed(2)
                    }
        
                // WMA FIFTY --------------------------------------------------------------------
        
                    wmaCul = newestPull[0].price * 50
                    weight = 49
                    wmaInterval = 0
                    iWma = 50
        
                    if (dataPull.historical.length < 50) {
                        searchedTicker.wmaFifty = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 48; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaFifty = wmaCul / iWma
                    searchedTicker.wmaFifty = wmaFifty.toFixed(2)
                    }
        
                // WMA ONE HUNDRED --------------------------------------------------------------------
        
                    wmaCul = newestPull[0].price * 100
                    weight = 99
                    wmaInterval = 0
                    iWma = 100
        
                    if (dataPull.historical.length < 100) {
                        searchedTicker.wmaOneHun = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 98; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaOneHun = wmaCul / iWma
                    searchedTicker.wmaOneHun = wmaOneHun.toFixed(2)
                    }

                // WMA TWO HUNDRED --------------------------------------------------------------------
        
                    wmaCul = newestPull[0].price * 200
                    weight = 199
                    wmaInterval = 0
                    iWma = 200
        
                    if (dataPull.historical.length < 200) {
                        searchedTicker.wmaTwoHun = 'No Data'
                    } else {
        
                        for (let i = 0; i <= 198; i++) {
                            wmaInterval = dataPull.historical[i].close * weight
                            wmaCul += wmaInterval
                            iWma += weight
                            weight--
                        }
                    const wmaTwoHun = wmaCul / iWma
                    searchedTicker.wmaTwoHun = wmaTwoHun.toFixed(2)
                    }

                }
                catch(e) 
                {
                      
                }
                
    }
    // VWMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
    function vwmaFunction(searchedTicker, dataPull, newestPull) {

        // VWMA FIVETEEN --------------------------------------------------------------------

        const newPrice = newestPull[0].price
        const newVol = newestPull[0].volume

        let volCul = newestPull[0].volume
        let totalCul = newPrice * newVol
        let price = 0
        let volume = 0

        try {
        if (dataPull.historical.length < 14) {
            searchedTicker.vwmaFiveTeen = 'No Data'
        } else {
            for (let i = 0; i <= 13; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaFiveTeen = totalCul/volCul
            searchedTicker.vwmaFiveTeen = vwmaFiveTeen.toFixed(2)
        }

        // VWMA TWENTY --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 19) {
            searchedTicker.vwmaTwenty = 'No Data'
        } else {
            for (let i = 0; i <= 18; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaTwenty = totalCul/volCul
            searchedTicker.vwmaTwenty = vwmaTwenty.toFixed(2)
        }

        // VWMA THIRTY --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 29) {
            searchedTicker.vwmaThirty = 'No Data'
        } else {
            for (let i = 0; i <= 28; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaThirty = totalCul/volCul
            searchedTicker.vwmaThirty = vwmaThirty.toFixed(2)
        }

        // VWMA FIFTY --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 49) {
            searchedTicker.vwmaFifty = 'No Data'
        } else {
            for (let i = 0; i <= 48; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaFifty = totalCul/volCul
            searchedTicker.vwmaFifty = vwmaFifty.toFixed(2)
        }

        // VWMA ONEHUN --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 99) {
            searchedTicker.vwmaOneHun = 'No Data'
        } else {
            for (let i = 0; i <= 98; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaOneHun = totalCul/volCul
            searchedTicker.vwmaOneHun = vwmaOneHun.toFixed(2)
        }

        // VWMA TWOHUN --------------------------------------------------------------------

        volCul = newestPull[0].volume
        totalCul = newPrice * newVol
        price = 0
        volume = 0

        if (dataPull.historical.length < 199) {
            searchedTicker.vwmaTwoHun = 'No Data'
        } else {
            for (let i = 0; i <= 198; i++) {
                price = dataPull.historical[i].close
                volume = dataPull.historical[i].volume
                totalCul += price * volume
                volCul += dataPull.historical[i].volume
            }
            const vwmaTwoHun = totalCul/volCul
            searchedTicker.vwmaTwoHun = vwmaTwoHun.toFixed(2)
        }

        }
        catch(e) 
        {
            
        }
    }
    // EMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------       
    function emaFunction(searchedTicker, dataPull, newestPull, macdCallBack) {

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
                        searchedTicker.emaTwelve = 'No Data'
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

                        searchedTicker.emaTwelve = arrEma[0].toFixed(2) 
                        arrEma.pop()
                        prevDayEmaSub = 0 
                    }

        // EMA TWENTY SIX ----------------------------------------------------------------------

                    if (dataPull.historical.length <= 51) {
                        searchedTicker.emaTwentySix = 'No Data'
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

                        searchedTicker.emaTwentySix = arrEma[0].toFixed(2) 
                        arrEma.pop() 
                        prevDayEmaSub = 0
                            }   

        // EMA FIFTY -----------------------------------------------------------------------------

                     if (dataPull.historical.length <= 100) {
                    searchedTicker.emaFifty = 'No Data'
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

                        searchedTicker.emaFifty = arrEma[0].toFixed(2) 
                        arrEma.pop() 
                        prevDayEmaSub = 0
                    }

            // EMA TWO HUNDRED -----------------------------------------------------------------------------

                    if (dataPull.historical.length <= 400) {
                        searchedTicker.emaTwoHun = 'No Data'
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

                        searchedTicker.emaTwoHun = arrEma[0].toFixed(2) 
                        arrEma.pop() 
                        prevDayEmaSub = 0
                    }

                }
                    catch(e) 
                    {
                          
                    }

                
                // MACD CALLBACK -----------------------------------------------------------------------------------------------------------------------------------------       
                macdCallBack(searchedTicker, macdTwelve, macdTwentySix)
    }
    // MACD FUNCTION -----------------------------------------------------------------------------------------------------------------------------------------       
    function macdFunction(searchedTicker, arr1, arr2) {
        const macd = searchedTicker.emaTwelve - searchedTicker.emaTwentySix
        searchedTicker.macd = macd.toFixed(2)
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
            let macdSignalLine = (2/9) * (searchedTicker.macd - finalAverageMacd) + finalAverageMacd
            searchedTicker.macdSignalLine = macdSignalLine.toFixed(2)
            // HISTORGRAM CALC ------------------------------------- IF HISTOGRAM GOES FROM NEGATIVE TO POSITIVE IT IS BULLISH
            let histogram = searchedTicker.macd - searchedTicker.macdSignalLine
            searchedTicker.macdHistogram = histogram.toFixed(2)
        // FOR NO DATA TO PULL FROM
            if (searchedTicker.macdHistogram === 'NaN') {
                searchedTicker.macdHistogram = 'No Data'
            }
            if (searchedTicker.macd === 'NaN') {
                searchedTicker.macd = 'No Data'
            }
            if (searchedTicker.macdSignalLine === 'NaN') {
                searchedTicker.macdSignalLine = 'No Data'
            }

            }
            catch(e) 
            {
                
            }

    }
    // RSI FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------      
    function rsiFunction(searchedTicker, dataPull, newestPull) {

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
                searchedTicker.rsi = 'No Data'
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
            searchedTicker.rsi = rsi.toFixed(2)

            }

            }
            catch(e) 
            {
                
            }

    } 
    // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function stochOsc1433Function(searchedTicker, dataPull, newestPull) {

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
            searchedTicker.stochasticK = 'No Data'
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
                    searchedTicker.stochasticK = (((newPrice - lowestLow) / (highestHigh - lowestLow)) * 100).toFixed(2)
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
                        searchedTicker.stochasticD = (slowD / 3).toFixed(2)

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
                                    searchedTicker.stochasticSignal = smaD.toFixed(2)
                                } else {
                                    searchedTicker.stochasticSignal = smaD.toFixed(2)
                                }

                }

                        }
                        catch(e) 
                        {
                            
                        }

    }
   // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function williamsRFunction(searchedTicker, dataPull, newestPull) {

        const newPrice = newestPull[0].price


                    let highs = []
                    let lows = []
                    let lowestLow = 0
                    let highestHigh = 0
        try {
                    if (dataPull.historical.length < 14) {
                        searchedTicker.williams = 'No Data'
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
                        
                        searchedTicker.williamsR = williams.toFixed(2)
                    }

                }
                catch(e) 
                {
                      
                }
    }
    // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function cciFunction(searchedTicker, dataPull, newestPull) {

        const newPrice = newestPull[0].price


                    let tpvCul = 0
                    let tpv = []
                    let tpvMa = 0
                    let tpvCurrent  = newPrice
                    const recentTpv = newPrice
        try {
                    if (dataPull.historical.length < 19) {
                        searchedTicker.cciTwenty = 'No Data'
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
                        
                        searchedTicker.cciTwenty = cci.toFixed(2)
                    }
                }
                catch(e) 
                {
                      console.log(e)
                }
    }
    // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function bollingerBandsFunction(searchedTicker, dataPull, newestPull) {
        
        const newPrice = newestPull[0].price

        let smaCul = 0
        let closeHolder = []
        try {
        if (dataPull.historical.length < 19) {
            searchedTicker.bbUpper = 'No Data'
            searchedTicker.bbLower = 'No Data'
            searchedTicker.bbMiddle = 'No Data'
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

                searchedTicker.bbUpper = bbUpper.toFixed(2)
                searchedTicker.bbLower = bbLower.toFixed(2)
                searchedTicker.bbMiddle = smaTwenty.toFixed(2)
                    }
                }
                catch(e) 
                {
                    
                }

    }
    // VWAP FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------       
    function vwapFunction(searchedTicker, dataPull) {
      
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
                searchedTicker.vwap = vwap  
                
            }
            catch(e) 
            {
                  
            }
    }
    // VOLUME FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------       
    function setVolume(searchedTicker, dataPull, newestPull) {
        // SET RECENT YESTERDAY VOLUME
        if (dataPull.historical.length < 0) 
        {
            searchedTicker.yesterdayVolume = 0
        } 
        else
        {
            searchedTicker.yesterdayVolume = dataPull.historical[0].volume
        }
        if (newestPull.length < 0) 
        {
            searchedTicker.volume = 0
        }
        else 
        {
        // SET RECENT VOLUME
        searchedTicker.volume = newestPull[0].volume
        }
    }

// TA FUNCTION ---------------------------------------------------------------------
    async function technicalIndicators(symbol, searchedSymbol) {
    
        let j = 0

        try {

        while (j < 1) { // LOOP FOR TECHNICAL SEARCHED TICKER

        try {
                // ------ FETCH NASDAQ
            const resTwo = await fetch('https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
            const dataNas = await resTwo.json()

                        for (let i = 0; i < dataNas.length; i++)
                        {
                            if (dataNas[i].symbol == symbol) {
                                searchedSymbol = dataNas[i]
                                break;
                            }
                        }
                    
                // ------ FETCH NYSE
            const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218')
            const dataNyse = await res.json()

                        for (let i = 0; i < dataNyse.length; i++)
                        {
                            if (dataNyse[i].symbol == symbol) {
                                searchedSymbol = dataNyse[i]
                                break;
                            }
                        }
                        console.log(symbol, searchedSymbol)
                }
            catch(e) 
                {
                    alert('Unable locate stock ticker. Please check your input and try again!');
                }
                // WILL BREAK OUT IF SYMBOL DOESNT EXIST
                if (searchedSymbol.price == undefined) 
                {
                    alert('Unable locate stock ticker. Please check your input and try again!');
                    $('.loading-search').css('display', 'none');
                    return;
                }
            //THIS PULL IS FOR CLOSE PRICES TO CALC TAs PAST CLOSE DATA // 
            const resSMA = await  fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
            const dataSMA = await resSMA.json() // SMA PULL USED FOR OTHER CALCS
                // ERROR CHECK FOR EMPTY PULL
                if (Object.keys(dataSMA).length === 0 && dataSMA.constructor === Object)
                {
                    alert('There may be a technical issue with this ticker. Please check your input and try again later!');
                    $('.loading-search').css('display', 'none');
                    return;
                }

            //THIS PULL IS FOR OSCILLATORS ALL CURRENT CLOSE DATA
            const resOscPulled = await fetch(`https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
            const dataRecentPulled = await resOscPulled.json()
                // ERROR CHECK FOR EMPTY PULL
                if (Object.keys(dataRecentPulled).length === 0 && dataRecentPulled.constructor === Object)
                {
                    alert('There may be a technical issue with this ticker. Please check your input and try again later!');
                    $('.loading-search').css('display', 'none');
                    return;
                }

            // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
            const resVWAP = await  fetch(`https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`)
            const dataVWAP = await resVWAP.json()

                // ERROR CHECK FOR EMPTY PULL
                if (Object.keys(dataVWAP).length === 0 && dataVWAP.constructor === Object)
                {
                    alert('There may be a technical issue with this ticker. Please check your input and try again later!');
                    $('.loading-search').css('display', 'none');
                    return;
                }

                vwapFunction(searchedSymbol, dataVWAP)
            
                // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                smaFunction(searchedSymbol, dataSMA, dataRecentPulled)

                // WMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                wmaFunction(searchedSymbol, dataSMA, dataRecentPulled) 

                // VWMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                vwmaFunction(searchedSymbol, dataSMA, dataRecentPulled)
                    
                // EMA WITH MACD CALLBACK ------------------------------------------------------------------------------------------------------------------------------------------       
                emaFunction(searchedSymbol, dataSMA, dataRecentPulled, macdFunction)
    
                // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                rsiFunction(searchedSymbol, dataSMA, dataRecentPulled)
            
                // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                stochOsc1433Function(searchedSymbol, dataSMA, dataRecentPulled)

                // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                williamsRFunction(searchedSymbol, dataSMA, dataRecentPulled)

                // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                cciFunction(searchedSymbol, dataSMA, dataRecentPulled)

                // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                bollingerBandsFunction(searchedSymbol, dataSMA, dataRecentPulled)

                // SET VOLUME PROPERTIES
                setVolume(searchedSymbol, dataSMA, dataRecentPulled)

            
            j++ // UPDATE WHILE LOOP

            await  buildSearchTech(searchedSymbol) // BUILD HTML TO DISPLAY

            expandDetract()
        }// THIS IS THE END OF LOOP
        
                                    }// END OF TRY
                                    catch(e) 
                                    {
                                    }        
    } 

    // BUILD OUT HTML ------------------------------------------------------   
    async function buildSearchTech(obj) {
        let {symbol, price, change, changesPercentage, avgVolume, volume, yesterdayVolume, vwap, smaFiveTeen, smaTwenty, smaThirty, smaFifty, smaOneHun, smaTwoHun, emaTwelve, emaTwentySix, emaFifty, emaTwoHun, wmaFiveTeen, wmaTwenty, wmaThirty, wmaFifty, wmaOneHun, wmaTwoHun, vwmaFiveTeen, vwmaTwenty, vwmaThirty, vwmaFifty, vwmaOneHun, vwmaTwoHun, macd, macdHistogram, macdSignalLine, rsi, stochasticD, stochasticK, stochasticSignal, cciTwenty, bbMiddle, bbLower, bbUpper, williamsR} = obj;

        let directionArrow = 'up'

        // SETS ARROW FOR UP AND DOWN --------------
        if (changesPercentage < 0) 
        {
            directionArrow = 'down'
        } 
        else 
        {
            directionArrow = 'up'
        }
        // CHANGE TO POSITIVE BUT ARROW POINTS DOWN OR UP ----------
        if (change < 0) {
            change = change * -1
        }

        // VOLUME INCREASE TODAY ----------
        let volumeIncrease = 0;

        if (volume > avgVolume) {
            let increase = volume - avgVolume;
            volumeIncrease = (increase / avgVolume) * 100
        }
        else
        {
            let decrease = avgVolume - volume;
            volumeIncrease = (decrease / avgVolume) * -100
        }

    // TO GET AVERAGE DAILY VOLUME FOR YESTERDAY ----------------
        let yesterdayVolIncrease = 0;

        if (yesterdayVolume > avgVolume) {
            let increase = yesterdayVolume - avgVolume;
            yesterdayVolIncrease = (increase / avgVolume) * 100
        }
        else
        {
            let decrease = avgVolume - yesterdayVolume;
            yesterdayVolIncrease = (decrease / avgVolume) * -100
        }

        techIn.html(   
        `<!----------------------------------- SEARCHED SYMBOL --------------------------------------->

        <!----------------------------------- THIS WILL HOLD TECH ANALYSIS FOR HOVER POPULATE IN MIDDLE ---------------------------------------->
    
    <div class="tech-search">

        <h2 class="tech-title">${symbol}'s</h2>
        <h2 class="tech-title">Daily Indicators</h2> <!--- put if else for if its up or down then out arrow next to it here --------->
        
        <div class="tech-row">
        <p class="search-price-text">Price: $${price.toFixed(2)}</p>
        <div class="search-changes-row">
        <p>${changesPercentage.toFixed(2)}%</p>
        <div id="search-arrow-${directionArrow}"></div>
        <p>$${change.toFixed(2)}</p>
        </div>


            <div class="tech-vol-row">
            <a class="info-link" href="https://www.investopedia.com/terms/d/downvolume.asp" target="_blank"><h3 class='tech-header'>Volume</h3></a>
                <p>Average: <span class="tech-to-left">${avgVolume}</span></p> 
                <p>Current Day: <span class="tech-to-left">${volume}</span></p>
                <p>Change: <span class="tech-to-left"> ${volumeIncrease.toFixed(2)}%</span></p>

                <p>Yesterday: <span class="tech-to-left"> ${yesterdayVolume}</span></p>
                <p>Change: <span class="tech-to-left"> ${yesterdayVolIncrease.toFixed(2)}%</span></p>
            </div>

            <div class="tech-row">

                <a class="info-link" href="https://www.investopedia.com/terms/s/sma.asp" target="_blank"><h3 class='tech-header'>SMA</h3></a>
                    <div class="averages-row">
                        <p>15: ${smaFiveTeen}</p>
                        <p>20: ${smaTwenty}</p>
                    </div>
                    <div class="averages-row">
                        <p>30: ${smaThirty}</p>
                        <p>50: ${smaFifty}</p>
                    </div>
                    <div class="averages-row">
                        <p>100: ${smaOneHun}</p>
                        <p>200: ${smaTwoHun}</p>
                    </div>
            </div>

            <div class="tech-row">
            <a class="info-link" href="https://www.investopedia.com/terms/e/ema.asp" target="_blank"><h3 class='tech-header'>EMA</h3></a>
                    <div class="averages-row">
                        <p>12: ${emaTwelve}</p>
                        <p>26: ${emaTwentySix}</p>
                    </div>
                    <div class="averages-row">
                        <p>50: ${emaFifty}</p>
                        <p>200: ${emaTwoHun}</p>
                    </div>           
            </div>

            <div class="tech-row">
            <a class="info-link" href="https://www.investopedia.com/ask/answers/071414/whats-difference-between-moving-average-and-weighted-moving-average.asp" target="_blank"><h3 class='tech-header'>WMA</h3></a>
                    <div class="averages-row">
                        <p>15: ${wmaFiveTeen}</p>
                        <p>20: ${wmaTwenty}</p>
                    </div>
                    <div class="averages-row">
                        <p>30: ${wmaThirty}</p>
                        <p>50: ${wmaFifty}</p>
                    </div>
                    <div class="averages-row">
                        <p>100: ${wmaOneHun}</p>
                        <p>200: ${wmaTwoHun}</p>
                    </div>
            </div>

            <div class="tech-row">
            <a class="info-link" href="https://www.tradingsetupsreview.com/volume-weighted-moving-average-vwma/" target="_blank"><h3 class='tech-header'>VWMA</h3></a>
                    <div class="averages-row">
                        <p>15: ${vwmaFiveTeen}</p>
                        <p>20: ${vwmaTwenty}</p>
                    </div>
                    <div class="averages-row">
                        <p>30: ${vwmaThirty}</p>
                        <p>50: ${vwmaFifty}</p>
                    </div>
                    <div class="averages-row">
                        <p>100: ${vwmaOneHun}</p>
                        <p>200: ${vwmaTwoHun}</p>
                    </div>
            </div>

            <div class="tech-row">
            <a class="info-link" href="https://www.investopedia.com/terms/v/vwap.asp" target="_blank"><h3 class='tech-header'>VWAP (5 Minute)</h3></a>
                <p class="osc-text">${vwap}</p>
            </div>

            <div class="tech-row">
            <a class="info-link" href="https://www.investopedia.com/terms/m/macd.asp" target="_blank"><h3 class='tech-header'>MACD (12 , 26)</h3></a>
                <p class="osc-text">${macd}</p>
                    <div class="macd-row">
                        <p>Signal Line: ${macdSignalLine}</p>
                        <p>Histogram: ${macdHistogram}</p>
                    </div>
            </div>

            <div class="flex-rsi-cci">
                <div class="tech-row">
                <a class="info-link" href="https://www.investopedia.com/terms/s/stochrsi.asp" target="_blank"><h3 class='tech-header'>RSI</h3></a>
                    <p class="osc-text">${rsi}</p>
                </div>

                <div class="tech-row">
                <a class="info-link" href="https://www.investopedia.com/terms/c/commoditychannelindex.asp" target="_blank"><h3 class='tech-header'>CCI</h3></a>
                    <p class="osc-text">${cciTwenty}</p>
                </div>

            </div>

            <div class="tech-row">
            <a class="info-link" href="https://www.investopedia.com/terms/w/williamsr.asp" target="_blank"><h3 class='tech-header'>Williams %R</h3></a>
                <p class="osc-text">${williamsR}</p>
            </div>


            <div class="tech-row">
            <a class="info-link" href="https://www.investopedia.com/terms/s/stochasticoscillator.asp" target="_blank"><h3 class='tech-header'>Stochastic Oscillator</h3></a>
            <div class="averages-row">
                <p class="osc-text">%K: ${stochasticK}</p>
                <p class="osc-text">%D: ${stochasticD}</p>
            </div>
                <p class="osc-text">Signal Line: ${stochasticSignal}</p>
            </div>

            <div class="tech-row">
            <a class="info-link" href="https://www.investopedia.com/terms/b/bollingerbands.asp" target="_blank"><h3 class='tech-header'>Bollinger Bands</h3></a>
                    <p class="osc-text">Middle: ${bbMiddle}</p>
                <div class="macd-row">
                    <p class="osc-text">Upper: ${bbUpper}</p>
                    <p class="osc-text">Lower: ${bbLower}</p>
                </div>
            </div>

            <div class="news-row">
            <a class="stock-news-link" href="http://www.google.com/search?q=${symbol}+stock+news&source=lnms&tbm=nws&sa=X&ved=2ahUKEwj7_6eMpbPyAhXaVs0KHfuADvoQ_AUoAXoECAEQAw&biw=1280&bih=614" target="_blank">News About This Stock</a>
            </div>

        </div>`
        )

        // GET RID OF LOADING SCREEN
        $('.loading-search').css('display', 'none');

    }