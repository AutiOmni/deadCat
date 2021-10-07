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

                indicatorColorsDown(index)
                
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

                indicatorColorsUp(index)
                
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
// THIS IS FOR COLOR INDICATIONS OF TECHINCAL INDICATORS 

    function indicatorColorsDown(i) {
            // ALL MIGHTY PRICE
            let price = $(`.price-down-${i}`).text().slice(8,)
            // GET HEADERS FOR HOVER EFFECT
            let vwapHeader = $(`.vwap-down-header-${i}`)
            let macdHeader = $(`.macd-down-header-${i}`)
            let rsiHeader = $(`.rsi-down-header-${i}`)
            let cciHeader = $(`.cci-down-header-${i}`)
            let williamsHeader = $(`.williams-down-header-${i}`)
            let stochasticHeader = $(`.stochastic-down-header-${i}`)
            let bbHeader = $(`.bb-down-header-${i}`)
            // GET ACTUALS FOR NUMBER CALCS AND HOVER COLOR
            let vwap = $(`.vwap-down-actual-${i}`).text()
            let macd = $(`.macd-down-actual-${i}`).text()
            let rsi = $(`.rsi-down-actual-${i}`).text()
            let cci = $(`.cci-down-actual-${i}`).text()
            let williams = $(`.williams-down-actual-${i}`).text()
            let stochasticK = $(`.stochasticK-down-actual-${i}`).text().slice(4,)
            let stochasticD = $(`.stochasticD-down-actual-${i}`).text().slice(4,)
            let bbPercent = $(`.bbPercent-down-actual-${i}`).text().slice(4,)

            let smaFifteen = $(`.smafifteen-down-actual-${i}`)            
            let smaTwenty = $(`.smatwenty-down-actual-${i}`)            
            let smaThirty = $(`.smathirty-down-actual-${i}`)           
            let smaFifty = $(`.smafifty-down-actual-${i}`)           
            let smaOneHun = $(`.smaonehundred-down-actual-${i}`)              
            let smaTwoHun = $(`.smatwohundred-down-actual-${i}`)    

            let emaEight = $(`.emaeight-down-actual-${i}`)          
            let emaTwelve = $(`.ematwelve-down-actual-${i}`)          
            let emaTwenty = $(`.ematwenty-down-actual-${i}`)           
            let emaTwentySix = $(`.ematwentysix-down-actual-${i}`)           
            let emaFifty = $(`.emafifty-down-actual-${i}`)           
            let emaTwoHun = $(`.ematwohundred-down-actual-${i}`)    

            let wmaFifteen = $(`.wmafifteen-down-actual-${i}`)           
            let wmaTwenty = $(`.wmatwenty-down-actual-${i}`)            
            let wmaThirty = $(`.wmathirty-down-actual-${i}`)            
            let wmaFifty = $(`.wmafifty-down-actual-${i}`)           
            let wmaOneHun = $(`.wmaonehundred-down-actual-${i}`)          
            let wmaTwoHun = $(`.wmatwohundred-down-actual-${i}`)              

            let vwmaFifteen = $(`.vwmafifteen-down-actual-${i}`)            
            let vwmaTwenty = $(`.vwmatwenty-down-actual-${i}`)          
            let vwmaThirty = $(`.vwmathirty-down-actual-${i}`)          
            let vwmaFifty = $(`.vwmafifty-down-actual-${i}`)            
            let vwmaOneHun = $(`.vwmaonehundred-down-actual-${i}`)             
            let vwmaTwoHun = $(`.vwmatwohundred-down-actual-${i}`)            
           
            let smaFifteenNum = $(`.smafifteen-down-actual-${i}`).text().slice(4,)            
            let smaTwentyNum = $(`.smatwenty-down-actual-${i}`).text().slice(4,)            
            let smaThirtyNum = $(`.smathirty-down-actual-${i}`).text().slice(4,)            
            let smaFiftyNum = $(`.smafifty-down-actual-${i}`).text().slice(4,)            
            let smaOneHunNum = $(`.smaonehundred-down-actual-${i}`).text().slice(5,)              
            let smaTwoHunNum = $(`.smatwohundred-down-actual-${i}`).text().slice(5,)    

            let emaEightNum = $(`.emaeight-down-actual-${i}`).text().slice(3,)            
            let emaTwelveNum = $(`.ematwelve-down-actual-${i}`).text().slice(4,)            
            let emaTwentyNum = $(`.ematwenty-down-actual-${i}`).text().slice(4,)            
            let emaTwentySixNum = $(`.ematwentysix-down-actual-${i}`).text().slice(4,)            
            let emaFiftyNum = $(`.emafifty-down-actual-${i}`).text().slice(4,)            
            let emaTwoHunNum = $(`.ematwohundred-down-actual-${i}`).text().slice(5,)     

            let wmaFifteenNum = $(`.wmafifteen-down-actual-${i}`).text().slice(4,)            
            let wmaTwentyNum = $(`.wmatwenty-down-actual-${i}`).text().slice(4,)            
            let wmaThirtyNum = $(`.wmathirty-down-actual-${i}`).text().slice(4,)            
            let wmaFiftyNum = $(`.wmafifty-down-actual-${i}`).text().slice(4,)            
            let wmaOneHunNum = $(`.wmaonehundred-down-actual-${i}`).text().slice(5,)              
            let wmaTwoHunNum = $(`.wmatwohundred-down-actual-${i}`).text().slice(5,)              

            let vwmaFifteenNum = $(`.vwmafifteen-down-actual-${i}`).text().slice(4,)            
            let vwmaTwentyNum = $(`.vwmatwenty-down-actual-${i}`).text().slice(4,)            
            let vwmaThirtyNum = $(`.vwmathirty-down-actual-${i}`).text().slice(4,)            
            let vwmaFiftyNum = $(`.vwmafifty-down-actual-${i}`).text().slice(4,)            
            let vwmaOneHunNum = $(`.vwmaonehundred-down-actual-${i}`).text().slice(5,)              
            let vwmaTwoHunNum = $(`.vwmatwohundred-down-actual-${i}`).text().slice(5,)
            
            let goldenCrossSma = $(`.goldenSma-cross-down-${i}`)
            let deathCrossSma = $(`.deathSma-cross-down-${i}`)
            let goldenCrossEma = $(`.goldenEma-cross-down-${i}`)
            let deathCrossEma = $(`.deathEma-cross-down-${i}`)
            let goldenCrossWma = $(`.goldenWma-cross-down-${i}`)
            let deathCrossWma = $(`.deathWma-cross-down-${i}`)
            let goldenCrossVwma = $(`.goldenVwma-cross-down-${i}`)
            let deathCrossVwma = $(`.deathVwma-cross-down-${i}`)

            // TURN STRING TO NUM
            price = parseFloat(price)
            
            vwap = parseFloat(vwap)
            macd = parseFloat(macd)
            rsi = parseFloat(rsi)
            cci = parseFloat(cci)
            williams = parseFloat(williams)
            stochasticK = parseFloat(stochasticK)
            stochasticD = parseFloat(stochasticD)
            bbPercent = parseFloat(bbPercent)

            smaFifteenNum = parseFloat(smaFifteenNum)            
            smaTwentyNum = parseFloat(smaTwentyNum)         
            smaThirtyNum = parseFloat(smaThirtyNum)           
            smaFiftyNum = parseFloat(smaFiftyNum)       
            smaOneHunNum = parseFloat(smaOneHunNum)             
            smaTwoHunNum = parseFloat(smaTwoHunNum)
    
            emaEightNum = parseFloat(emaEightNum)         
            emaTwelveNum = parseFloat(emaTwelveNum)         
            emaTwentyNum = parseFloat(emaTwentyNum)         
            emaTwentySixNum = parseFloat(emaTwentySixNum)         
            emaFiftyNum = parseFloat(emaFiftyNum)            
            emaTwoHunNum = parseFloat(emaTwoHunNum)
    
            wmaFifteenNum = parseFloat(wmaFifteenNum)           
            wmaTwentyNum = parseFloat(wmaTwentyNum)         
            wmaThirtyNum = parseFloat(wmaThirtyNum)      
            wmaFiftyNum = parseFloat(wmaFiftyNum)       
            wmaOneHunNum = parseFloat(wmaOneHunNum)            
            wmaTwoHunNum = parseFloat(wmaTwoHunNum)          
    
            vwmaFifteenNum = parseFloat(vwmaFifteenNum)            
            vwmaTwentyNum = parseFloat(vwmaTwentyNum)           
            vwmaThirtyNum = parseFloat(vwmaThirtyNum)         
            vwmaFiftyNum = parseFloat(vwmaFiftyNum)          
            vwmaOneHunNum = parseFloat(vwmaOneHunNum)              
            vwmaTwoHunNum = parseFloat(vwmaTwoHunNum)   

            // IF FOR CLASS ADD
        if ($(window).width() > 700)
        {

               // MA CHECK --------------------
               if (price > smaFifteenNum)
               {
                   smaFifteen.addClass('bullish-ma')
               } 
               else if (price < smaFifteenNum)
               {
                    smaFifteen.addClass('bearish-ma')
               }
               else if (price == smaFifteenNum)
               {
                    smaFifteen.addClass('neutral-ma')
               }
   
               if (price > smaTwentyNum)
               {
                   smaTwenty.addClass('bullish-ma')
               } 
               else if (price < smaTwentyNum)
               {
                    smaTwenty.addClass('bearish-ma')
               }
               else if (price == smaTwentyNum)
               {
                    smaTwenty.addClass('neutral-ma')
               }
               if (price > smaThirtyNum)
               {
                   smaThirty.addClass('bullish-ma')
               } 
               else if (price < smaThirtyNum)
               {
                    smaThirty.addClass('bearish-ma')
               }
               else if (price == smaThirtyNum)
               {
                    smaThirty.addClass('neutral-ma')
               }
               if (price > smaFiftyNum)
               {
                   smaFifty.addClass('bullish-ma')
               } 
               else if (price < smaFiftyNum)
               {
                    smaFifty.addClass('bearish-ma')
               }
               else if (price == smaFiftyNum)
               {
                    smaFifty.addClass('neutral-ma')
               }
               if (price > smaOneHunNum)
               {
                   smaOneHun.addClass('bullish-ma')
               } 
               else if (price < smaOneHunNum)
               {
                    smaOneHun.addClass('bearish-ma')
               }
               else if (price == smaOneHunNum)
               {
                    smaOneHun.addClass('neutral-ma')
               }
               if (price > smaTwoHunNum)
               {
                   smaTwoHun.addClass('bullish-ma')
               } 
               else if (price < smaTwoHunNum)
               {
                    smaTwoHun.addClass('bearish-ma')
               }
               else if (price == smaTwoHunNum)
               {
                    smaTwoHun.addClass('neutral-ma')
               }

               if (smaFiftyNum > smaTwoHunNum)
               {
                    goldenCrossSma.addClass('cross-display')
               }
               else if (smaFiftyNum < smaTwoHunNum)
               {
                    deathCrossSma.addClass("cross-display")
               }
            //    EMA -----------------------------------
        
            if (price > emaEightNum)
            {
                emaEight.addClass('bullish-ma')
            } 
            else if (price < emaEightNum)
            {
                emaEight.addClass('bearish-ma')
            }
            else if (price == emaEightNum)
            {
                emaEight.addClass('neutral-ma')
            }

            if (price > emaTwelveNum)
            {
                emaTwelve.addClass('bullish-ma')
            } 
            else if (price < emaTwelveNum)
            {
                emaTwelve.addClass('bearish-ma')
            }
            else if (price == emaTwelveNum)
            {
                emaTwelve.addClass('neutral-ma')
            }

            if (price > emaTwentyNum)
            {
                emaTwenty.addClass('bullish-ma')
            } 
            else if (price < emaTwentyNum)
            {
                emaTwenty.addClass('bearish-ma')
            }
            else if (price == emaTwentyNum)
            {
                emaTwenty.addClass('neutral-ma')
            }

            if (price > emaTwentySixNum)
            {
                emaTwentySix.addClass('bullish-ma')
            } 
            else if (price < emaTwentySixNum)
            {
                emaTwentySix.addClass('bearish-ma')
            }
            else if (price == emaTwentySixNum)
            {
                emaTwentySix.addClass('neutral-ma')
            }

            if (price > emaFiftyNum)
            {
                emaFifty.addClass('bullish-ma')
            } 
            else if (price < emaFiftyNum)
            {
                emaFifty.addClass('bearish-ma')
            }
            else if (price == emaFiftyNum)
            {
                emaFifty.addClass('neutral-ma')
            }

            if (price > emaTwoHunNum)
            {
                emaTwoHun.addClass('bullish-ma')
            } 
            else if (price < emaTwoHunNum)
            {
                emaTwoHun.addClass('bearish-ma')
            }
            else if (price == emaTwoHunNum)
            {
                emaTwoHun.addClass('neutral-ma')
            }

            if (emaTwelveNum > emaTwentySixNum)
            {
                goldenCrossEma.addClass('cross-display')
            }
            else if (emaTwelveNum < emaTwentySixNum)
            {
                deathCrossEma.addClass('cross-display')
            }

             //    WMA -----------------------------------

           if (price > wmaFifteenNum)
           {
                wmaFifteen.addClass('bullish-ma')
           } 
           else if (price < wmaFifteenNum)
           {
                wmaFifteen.addClass('bearish-ma')
           }
           else if (price == wmaFifteenNum)
           {
                wmaFifteen.addClass('neutral-ma')
           }

           if (price > wmaTwentyNum)
           {
                wmaTwenty.addClass('bullish-ma')
           } 
           else if (price < wmaTwentyNum)
           {
                wmaTwenty.addClass('bearish-ma')
           }
           else if (price == wmaTwentyNum)
           {
                wmaTwenty.addClass('neutral-ma')
           }

           if (price > wmaThirtyNum)
           {
                wmaThirty.addClass('bullish-ma')
           } 
           else if (price < wmaThirtyNum)
           {
                wmaThirty.addClass('bearish-ma')
           }
           else if (price == wmaThirtyNum)
           {
                wmaThirty.addClass('neutral-ma')
           }

           if (price > wmaFiftyNum)
           {
                wmaFifty.addClass('bullish-ma')
           } 
           else if (price < wmaFiftyNum)
           {
                wmaFifty.addClass('bearish-ma')
           }
           else if (price == wmaFiftyNum)
           {
                wmaFifty.addClass('neutral-ma')
           }

           if (price > wmaOneHunNum)
           {
                wmaOneHun.addClass('bullish-ma')
           } 
           else if (price < wmaOneHunNum)
           {
                wmaOneHun.addClass('bearish-ma')
           }
           else if (price == wmaOneHunNum)
           {
                wmaOneHun.addClass('neutral-ma')
           }

           if (price > wmaTwoHunNum)
           {
                wmaTwoHun.addClass('bullish-ma')
           } 
           else if (price < wmaTwoHunNum)
           {
                wmaTwoHun.addClass('bearish-ma')
           }
           else if (price == wmaTwoHunNum)
           {
                wmaTwoHun.addClass('neutral-ma')
           }

           if (wmaFiftyNum > wmaTwoHunNum)
           {
               goldenCrossWma.addClass('cross-display')
           }
           else if (wmaFiftyNum < wmaTwoHunNum)
           {
               deathCrossWma.addClass('cross-display')
           }

    //    VWMA -----------------------------------

             if (price > vwmaFifteenNum)
             {
                  vwmaFifteen.addClass('bullish-ma')
             } 
             else if (price < vwmaFifteenNum)
             {
                  vwmaFifteen.addClass('bearish-ma')
             }
             else if (price == vwmaFifteenNum)
             {
                  vwmaFifteen.addClass('neutral-ma')
             }
  
             if (price > vwmaTwentyNum)
             {
                  vwmaTwenty.addClass('bullish-ma')
             } 
             else if (price < vwmaTwentyNum)
             {
                  vwmaTwenty.addClass('bearish-ma')
             }
             else if (price == vwmaTwentyNum)
             {
                  vwmaTwenty.addClass('neutral-ma')
             }
  
             if (price > vwmaThirtyNum)
             {
                  vwmaThirty.addClass('bullish-ma')
             } 
             else if (price < vwmaThirtyNum)
             {
                  vwmaThirty.addClass('bearish-ma')
             }
             else if (price == vwmaThirtyNum)
             {
                  vwmaThirty.addClass('neutral-ma')
             }
  
             if (price > vwmaFiftyNum)
             {
                  vwmaFifty.addClass('bullish-ma')
             } 
             else if (price < vwmaFiftyNum)
             {
                  vwmaFifty.addClass('bearish-ma')
             }
             else if (price == vwmaFiftyNum)
             {
                  vwmaFifty.addClass('neutral-ma')
             }
  
             if (price > vwmaOneHunNum)
             {
                  vwmaOneHun.addClass('bullish-ma')
             } 
             else if (price < vwmaOneHunNum)
             {
                  vwmaOneHun.addClass('bearish-ma')
             }
             else if (price == vwmaOneHunNum)
             {
                  vwmaOneHun.addClass('neutral-ma')
             }
  
             if (price > vwmaTwoHunNum)
             {
                  vwmaTwoHun.addClass('bullish-ma')
             } 
             else if (price < vwmaTwoHunNum)
             {
                  vwmaTwoHun.addClass('bearish-ma')
             }
             else if (price == vwmaTwoHunNum)
             {
                  vwmaTwoHun.addClass('neutral-ma')
             }  

             if (vwmaFiftyNum > vwmaTwoHunNum)
             {
                 goldenCrossVwma.addClass('cross-display')
             }
             else if (vwmaFiftyNum < vwmaTwoHunNum)
             {
                 deathCrossVwma.addClass('cross-display')
             }

            // TECHNICAL CHECK ---------------
            if (price < vwap)
            {
                vwapHeader.addClass('bullish-stuff')
            }
            else if (price > vwap)
            {
                vwapHeader.addClass('bearish-stuff')
            }
            else if (price == vwap)
            {
                vwapHeader.addClass('neutral-stuff')
            }
            // MACD IF FOR CLASS ADD
            if (macd > 0)
            {
                macdHeader.addClass('bullish-stuff')
            }
            else if (macd < 0)
            {
                macdHeader.addClass('bearish-stuff')
            }
            else if (macd == 0)
            {
                macdHeader.addClass('neutral-stuff')
            }
            // RSI IF FOR CLASS ADD
            if (rsi < 30)
            {
                rsiHeader.addClass('bullish-stuff')
            }
            else if (rsi > 70)
            {
                rsiHeader.addClass('bearish-stuff')
            }
            else if (rsi < 70 && rsi > 30)
            {
                rsiHeader.addClass('neutral-stuff')
            }
            // CCI IF FOR CLASS ADD
            if (cci > 100) 
            {
                cciHeader.addClass('bullish-stuff')
            }
            else if (cci < -100) 
            {
                cciHeader.addClass('bearish-stuff')
            }
            else if (cci < 100 && cci > -100)
            {
                cciHeader.addClass('neutral-stuff')
            }
            //  WILLIAMS IF FOR CLASS ADD
            if (williams > -50)
            {
                williamsHeader.addClass('bullish-stuff')
            }
            else if (williams < -50)
            {
                williamsHeader.addClass('bearish-stuff')
            }
            //  STOCHASTIC IF FOR CLASS ADD
            if (stochasticK > 85)
            {
                stochasticHeader.addClass('bearish-stuff-k')
            }
            else if (stochasticK < 15)
            {
                stochasticHeader.addClass('bullish-stuff-k')
            }
            else if (stochasticK < 85 && stochasticK > 15) 
            {
                stochasticHeader.addClass('neutral-stuff-k')
            }

            if (stochasticD > 80)
            {
                stochasticHeader.addClass('bearish-stuff-d')
            }
            else if (stochasticD < 20)
            {
                stochasticHeader.addClass('bullish-stuff-d')
            }
            else if (stochasticD < 80 && stochasticD > 20) 
            {
                stochasticHeader.addClass('neutral-stuff-d')
            }

            //  STOCHASTIC IF FOR CLASS ADD
            if (bbPercent < 0)
            {
                bbHeader.addClass('bullish-stuff')
            }
            else if (bbPercent > 1)
            {
                bbHeader.addClass('bearish-stuff')
            }
            else if (bbPercent > .8 && bbPercent < 1)
            {
                bbHeader.addClass('bullish-stuff')
            }
            else if (bbPercent < .2 && bbPercent > 0)
            {
                bbHeader.addClass('bearish-stuff')
            }
            else if (bbPercent <= .8 && bbPercent >= .2)
            {
                bbHeader.addClass('neutral-stuff')
            }

        }
        else
        {
              // SMA -----------------------
        if (price > smaFifteenNum)
        {
            smaFifteen.addClass('bullish-stuff-mobile')
        } 
        else if (price < smaFifteenNum)
        {
            smaFifteen.addClass('bearish-stuff-mobile')
        }
        else if (price == smaFifteenNum)
        {
            smaFifteen.addClass('neutral-stuff-mobile')
        }

        if (price > smaTwentyNum)
        {
            smaTwenty.addClass('bullish-stuff-mobile')
        } 
        else if (price < smaTwentyNum)
        {
            smaTwenty.addClass('bearish-stuff-mobile')
        }
        else if (price == smaTwentyNum)
        {
            smaTwenty.addClass('neutral-stuff-mobile')
        }
        if (price > smaThirtyNum)
        {
            smaThirty.addClass('bullish-stuff-mobile')
        } 
        else if (price < smaThirtyNum)
        {
            smaThirty.addClass('bearish-stuff-mobile')
        }
        else if (price == smaThirtyNum)
        {
            smaThirty.addClass('neutral-stuff-mobile')
        }
        if (price > smaFiftyNum)
        {
            smaFifty.addClass('bullish-stuff-mobile')
        } 
        else if (price < smaFiftyNum)
        {
            smaFifty.addClass('bearish-stuff-mobile')
        }
        else if (price == smaFiftyNum)
        {
            smaFifty.addClass('neutral-stuff-mobile')
        }
        if (price > smaOneHunNum)
        {
            smaOneHun.addClass('bullish-stuff-mobile')
        } 
        else if (price < smaOneHunNum)
        {
            smaOneHun.addClass('bearish-stuff-mobile')
        }
        else if (price == smaOneHunNum)
        {
            smaOneHun.addClass('neutral-stuff-mobile')
        }
        if (price > smaTwoHunNum)
        {
            smaTwoHun.addClass('bullish-stuff-mobile')
        } 
        else if (price < smaTwoHunNum)
        {
            smaTwoHun.addClass('bearish-stuff-mobile')
        }
        else if (price == smaTwoHunNum)
        {
            smaTwoHun.addClass('neutral-stuff-mobile')
        }

        if (smaFiftyNum > smaTwoHunNum)
        {
            goldenCrossSma.addClass('cross-display')
        }
        else if (smaFiftyNum < smaTwoHunNum)
        {
            deathCrossSma.addClass('cross-display')
        }
        //    EMA -----------------------------------

        if (price > emaEightNum)
        {
            emaEight.addClass('bullish-stuff-mobile')
        } 
        else if (price < emaEightNum)
        {
            emaEight.addClass('bearish-stuff-mobile')
        }
        else if (price == emaEightNum)
        {
            emaEight.addClass('neutral-stuff-mobile')
        }

        if (price > emaTwelveNum)
        {
            emaTwelve.addClass('bullish-stuff-mobile')
        } 
        else if (price < emaTwelveNum)
        {
            emaTwelve.addClass('bearish-stuff-mobile')
        }
        else if (price == emaTwelveNum)
        {
            emaTwelve.addClass('neutral-stuff-mobile')
        }

        if (price > emaTwentyNum)
        {
            emaTwenty.addClass('bullish-stuff-mobile')
        } 
        else if (price < emaTwentyNum)
        {
            emaTwenty.addClass('bearish-stuff-mobile')
        }
        else if (price == emaTwentyNum)
        {
            emaTwenty.addClass('neutral-stuff-mobile')
        }

        if (price > emaTwentySixNum)
        {
            emaTwentySix.addClass('bullish-stuff-mobile')
        } 
        else if (price < emaTwentySixNum)
        {
            emaTwentySix.addClass('bearish-stuff-mobile')
        }
        else if (price == emaTwentySixNum)
        {
            emaTwentySix.addClass('neutral-stuff-mobile')
        }

        if (price > emaFiftyNum)
        {
            emaFifty.addClass('bullish-stuff-mobile')
        } 
        else if (price < emaFiftyNum)
        {
            emaFifty.addClass('bearish-stuff-mobile')
        }
        else if (price == emaFiftyNum)
        {
            emaFifty.addClass('neutral-stuff-mobile')
        }

        if (price > emaTwoHunNum)
        {
            emaTwoHun.addClass('bullish-stuff-mobile')
        } 
        else if (price < emaTwoHunNum)
        {
            emaTwoHun.addClass('bearish-stuff-mobile')
        }
        else if (price == emaTwoHunNum)
        {
            emaTwoHun.addClass('neutral-stuff-mobile')
        }

        if (emaTwelveNum > emaTwentySixNum)
        {
            goldenCrossEma.addClass('cross-display')
        }
        else if (emaTwelveNum < emaTwentySixNum)
        {
            deathCrossEma.addClass('cross-display')
        }

        //    WMA -----------------------------------

        if (price > wmaFifteenNum)
        {
        wmaFifteen.addClass('bullish-stuff-mobile')
        } 
        else if (price < wmaFifteenNum)
        {
        wmaFifteen.addClass('bearish-stuff-mobile')
        }
        else if (price == wmaFifteenNum)
        {
        wmaFifteen.addClass('neutral-stuff-mobile')
        }

        if (price > wmaTwentyNum)
        {
        wmaTwenty.addClass('bullish-stuff-mobile')
        } 
        else if (price < wmaTwentyNum)
        {
        wmaTwenty.addClass('bearish-stuff-mobile')
        }
        else if (price == wmaTwentyNum)
        {
        wmaTwenty.addClass('neutral-stuff-mobile')
        }

        if (price > wmaThirtyNum)
        {
        wmaThirty.addClass('bullish-stuff-mobile')
        } 
        else if (price < wmaThirtyNum)
        {
        wmaThirty.addClass('bearish-stuff-mobile')
        }
        else if (price == wmaThirtyNum)
        {
        wmaThirty.addClass('neutral-stuff-mobile')
        }

        if (price > wmaFiftyNum)
        {
        wmaFifty.addClass('bullish-stuff-mobile')
        } 
        else if (price < wmaFiftyNum)
        {
        wmaFifty.addClass('bearish-stuff-mobile')
        }
        else if (price == wmaFiftyNum)
        {
        wmaFifty.addClass('neutral-stuff-mobile')
        }

        if (price > wmaOneHunNum)
        {
        wmaOneHun.addClass('bullish-stuff-mobile')
        } 
        else if (price < wmaOneHunNum)
        {
        wmaOneHun.addClass('bearish-stuff-mobile')
        }
        else if (price == wmaOneHunNum)
        {
        wmaOneHun.addClass('neutral-stuff-mobile')
        }

        if (price > wmaTwoHunNum)
        {
        wmaTwoHun.addClass('bullish-stuff-mobile')
        } 
        else if (price < wmaTwoHunNum)
        {
        wmaTwoHun.addClass('bearish-stuff-mobile')
        }
        else if (price == wmaTwoHunNum)
        {
        wmaTwoHun.addClass('neutral-stuff-mobile')
        }

        if (wmaFiftyNum > wmaTwoHunNum)
        {
            goldenCrossWma.addClass('cross-display')
        }
        else if (wmaFiftyNum < wmaTwoHunNum)
        {
            deathCrossWma.addClass('cross-display')
        }

        //    VWMA -----------------------------------

        if (price > vwmaFifteenNum)
        {
        vwmaFifteen.addClass('bullish-stuff-mobile')
        } 
        else if (price < vwmaFifteenNum)
        {
        vwmaFifteen.addClass('bearish-stuff-mobile')
        }
        else if (price == vwmaFifteenNum)
        {
        vwmaFifteen.addClass('neutral-stuff-mobile')
        }

        if (price > vwmaTwentyNum)
        {
        vwmaTwenty.addClass('bullish-stuff-mobile')
        } 
        else if (price < vwmaTwentyNum)
        {
        vwmaTwenty.addClass('bearish-stuff-mobile')
        }
        else if (price == vwmaTwentyNum)
        {
        vwmaTwenty.addClass('neutral-stuff-mobile')
        }

        if (price > vwmaThirtyNum)
        {
        vwmaThirty.addClass('bullish-stuff-mobile')
        } 
        else if (price < vwmaThirtyNum)
        {
        vwmaThirty.addClass('bearish-stuff-mobile')
        }
        else if (price == vwmaThirtyNum)
        {
        vwmaThirty.addClass('neutral-stuff-mobile')
        }

        if (price > vwmaFiftyNum)
        {
        vwmaFifty.addClass('bullish-stuff-mobile')
        } 
        else if (price < vwmaFiftyNum)
        {
        vwmaFifty.addClass('bearish-stuff-mobile')
        }
        else if (price == vwmaFiftyNum)
        {
        vwmaFifty.addClass('neutral-stuff-mobile')
        }

        if (price > vwmaOneHunNum)
        {
        vwmaOneHun.addClass('bullish-stuff-mobile')
        } 
        else if (price < vwmaOneHunNum)
        {
        vwmaOneHun.addClass('bearish-stuff-mobile')
        }
        else if (price == vwmaOneHunNum)
        {
        vwmaOneHun.addClass('neutral-stuff-mobile')
        }

        if (price > vwmaTwoHunNum)
        {
        vwmaTwoHun.addClass('bullish-stuff-mobile')
        } 
        else if (price < vwmaTwoHunNum)
        {
        vwmaTwoHun.addClass('bearish-stuff-mobile')
        }
        else if (price == vwmaTwoHunNum)
        {
        vwmaTwoHun.addClass('neutral-stuff-mobile')
        }

        if (vwmaFiftyNum > vwmaTwoHunNum)
        {
            goldenCrossVwma.addClass('cross-display')
        }
        else if (vwmaFiftyNum < vwmaTwoHunNum)
        {
            deathCrossVwma.addClass('cross-display')
        }

            if (price < vwap)
            {
                $(`.vwap-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (price > vwap)
            {
                $(`.vwap-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (price == vwap)
            {
                $(`.vwap-down-actual-${i}`).addClass('neutral-stuff-mobile')
            }
            // MACD IF FOR CLASS ADD
            if (macd > 0)
            {
                $(`.macd-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (macd < 0)
            {
                $(`.macd-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (macd == 0)
            {
                $(`.macd-down-actual-${i}`).addClass('neutral-stuff-mobile')
            }
            // RSI IF FOR CLASS ADD
            if (rsi < 30)
            {
                $(`.rsi-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (rsi > 70)
            {
                $(`.rsi-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (rsi < 70 && rsi > 30)
            {
                $(`.rsi-down-actual-${i}`).addClass('neutral-stuff-mobile')
            }
            // CCI IF FOR CLASS ADD
            if (cci > 100) 
            {
                $(`.cci-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (cci < -100) 
            {
                $(`.cci-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (cci < 100 && cci > -100)
            {
                $(`.cci-down-actual-${i}`).addClass('neutral-stuff-mobile')
            }
            //  WILLIAMS IF FOR CLASS ADD
            if (williams > -50)
            {
                $(`.williams-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (williams < -50)
            {
                $(`.williams-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            //  STOCHASTIC IF FOR CLASS ADD
            if (stochasticK > 85)
            {
                $(`.stochasticK-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (stochasticK < 15)
            {
                $(`.stochasticK-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (stochasticK < 85 && stochasticK > 15) 
            {
                $(`.stochasticK-down-actual-${i}`).addClass('neutral-stuff-mobile')
            }

            if (stochasticD > 80)
            {
                $(`.stochasticD-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (stochasticD < 20)
            {
                $(`.stochasticD-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (stochasticD < 80 && stochasticD > 20) 
            {
                $(`.stochasticD-down-actual-${i}`).addClass('neutral-stuff-mobile')
            }

            //  STOCHASTIC IF FOR CLASS ADD
            if (bbPercent < 0)
            {
                $(`.bbPercent-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (bbPercent > 1)
            {
                $(`.bbPercent-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (bbPercent > .8 && bbPercent < 1)
            {
                $(`.bbPercent-down-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (bbPercent < .2 && bbPercent > 0)
            {
                $(`.bbPercent-down-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (bbPercent <= .8 && bbPercent >= .2)
            {
                $(`.bbPercent-down-actual-${i}`).addClass('neutral-stuff-mobile')
            }

        }

    }

    function indicatorColorsUp(i) {
        // ALL MIGHTY PRICE
        let price = $(`.price-up-${i}`).text().slice(8,)
        console.log(price)
        // GET HEADERS FOR HOVER EFFECT
        let vwapHeader = $(`.vwap-up-header-${i}`)
        let macdHeader = $(`.macd-up-header-${i}`)
        let rsiHeader = $(`.rsi-up-header-${i}`)
        let cciHeader = $(`.cci-up-header-${i}`)
        let williamsHeader = $(`.williams-up-header-${i}`)
        let stochasticHeader = $(`.stochastic-up-header-${i}`)
        let bbHeader = $(`.bb-up-header-${i}`)

        // GET ACTUALS FOR NUMBER CALCS AND HOVER COLOR
        let vwap = $(`.vwap-up-actual-${i}`).text()
        let macd = $(`.macd-up-actual-${i}`).text()
        let rsi = $(`.rsi-up-actual-${i}`).text()
        let cci = $(`.cci-up-actual-${i}`).text()
        let williams = $(`.williams-up-actual-${i}`).text()
        let stochasticK = $(`.stochasticK-up-actual-${i}`).text().slice(4,)
        let stochasticD = $(`.stochasticD-up-actual-${i}`).text().slice(4,)
        let bbPercent = $(`.bbPercent-up-actual-${i}`).text().slice(4,)

        let smaFifteen = $(`.smafifteen-up-actual-${i}`)          
        let smaTwenty = $(`.smatwenty-up-actual-${i}`)           
        let smaThirty = $(`.smathirty-up-actual-${i}`)           
        let smaFifty = $(`.smafifty-up-actual-${i}`)            
        let smaOneHun = $(`.smaonehundred-up-actual-${i}`)             
        let smaTwoHun = $(`.smatwohundred-up-actual-${i}`)  
        
        let emaEight = $(`.emaeight-up-actual-${i}`)          
        let emaTwelve = $(`.ematwelve-up-actual-${i}`)          
        let emaTwenty = $(`.ematwenty-up-actual-${i}`)            
        let emaTwentySix = $(`.ematwentysix-up-actual-${i}`)            
        let emaFifty = $(`.emafifty-up-actual-${i}`)           
        let emaTwoHun = $(`.ematwohundred-up-actual-${i}`)    

        let wmaFifteen = $(`.wmafifteen-up-actual-${i}`)           
        let wmaTwenty = $(`.wmatwenty-up-actual-${i}`)            
        let wmaThirty = $(`.wmathirty-up-actual-${i}`)            
        let wmaFifty = $(`.wmafifty-up-actual-${i}`)            
        let wmaOneHun = $(`.wmaonehundred-up-actual-${i}`)              
        let wmaTwoHun = $(`.wmatwohundred-up-actual-${i}`)             

        let vwmaFifteen = $(`.vwmafifteen-up-actual-${i}`)           
        let vwmaTwenty = $(`.vwmatwenty-up-actual-${i}`)           
        let vwmaThirty = $(`.vwmathirty-up-actual-${i}`)           
        let vwmaFifty = $(`.vwmafifty-up-actual-${i}`)           
        let vwmaOneHun = $(`.vwmaonehundred-up-actual-${i}`)              
        let vwmaTwoHun = $(`.vwmatwohundred-up-actual-${i}`)     
       
        let smaFifteenNum = $(`.smafifteen-up-actual-${i}`).text().slice(4,)            
        let smaTwentyNum = $(`.smatwenty-up-actual-${i}`).text().slice(4,)            
        let smaThirtyNum = $(`.smathirty-up-actual-${i}`).text().slice(4,)            
        let smaFiftyNum = $(`.smafifty-up-actual-${i}`).text().slice(4,)            
        let smaOneHunNum = $(`.smaonehundred-up-actual-${i}`).text().slice(5,)              
        let smaTwoHunNum = $(`.smatwohundred-up-actual-${i}`).text().slice(5,)    

        let emaEightNum = $(`.emaeight-up-actual-${i}`).text().slice(3,)            
        let emaTwelveNum = $(`.ematwelve-up-actual-${i}`).text().slice(4,)            
        let emaTwentyNum = $(`.ematwenty-up-actual-${i}`).text().slice(4,)            
        let emaTwentySixNum = $(`.ematwentysix-up-actual-${i}`).text().slice(4,)            
        let emaFiftyNum = $(`.emafifty-up-actual-${i}`).text().slice(4,)            
        let emaTwoHunNum = $(`.ematwohundred-up-actual-${i}`).text().slice(5,)     

        let wmaFifteenNum = $(`.wmafifteen-up-actual-${i}`).text().slice(4,)            
        let wmaTwentyNum = $(`.wmatwenty-up-actual-${i}`).text().slice(4,)            
        let wmaThirtyNum = $(`.wmathirty-up-actual-${i}`).text().slice(4,)            
        let wmaFiftyNum = $(`.wmafifty-up-actual-${i}`).text().slice(4,)            
        let wmaOneHunNum = $(`.wmaonehundred-up-actual-${i}`).text().slice(5,)              
        let wmaTwoHunNum = $(`.wmatwohundred-up-actual-${i}`).text().slice(5,)              

        let vwmaFifteenNum = $(`.vwmafifteen-up-actual-${i}`).text().slice(4,)            
        let vwmaTwentyNum = $(`.vwmatwenty-up-actual-${i}`).text().slice(4,)            
        let vwmaThirtyNum = $(`.vwmathirty-up-actual-${i}`).text().slice(4,)            
        let vwmaFiftyNum = $(`.vwmafifty-up-actual-${i}`).text().slice(4,)            
        let vwmaOneHunNum = $(`.vwmaonehundred-up-actual-${i}`).text().slice(5,)              
        let vwmaTwoHunNum = $(`.vwmatwohundred-up-actual-${i}`).text().slice(5,)     

        let goldenCrossSma = $(`.goldenSma-cross-up-${i}`)
        let deathCrossSma = $(`.deathSma-cross-up-${i}`)
        let goldenCrossEma = $(`.goldenEma-cross-up-${i}`)
        let deathCrossEma = $(`.deathEma-cross-up-${i}`)
        let goldenCrossWma = $(`.goldenWma-cross-up-${i}`)
        let deathCrossWma = $(`.deathWma-cross-up-${i}`)
        let goldenCrossVwma = $(`.goldenVwma-cross-up-${i}`)
        let deathCrossVwma = $(`.deathVwma-cross-up-${i}`)

        // TURN STRING TO NUM
        price = parseFloat(price)

        vwap = parseFloat(vwap)
        macd = parseFloat(macd)
        rsi = parseFloat(rsi)
        cci = parseFloat(cci)
        williams = parseFloat(williams)
        stochasticK = parseFloat(stochasticK)
        stochasticD = parseFloat(stochasticD)
        bbPercent = parseFloat(bbPercent)

        smaFifteenNum = parseFloat(smaFifteenNum)            
        smaTwentyNum = parseFloat(smaTwentyNum)         
        smaThirtyNum = parseFloat(smaThirtyNum)           
        smaFiftyNum = parseFloat(smaFiftyNum)       
        smaOneHunNum = parseFloat(smaOneHunNum)             
        smaTwoHunNum = parseFloat(smaTwoHunNum)

        emaEightNum = parseFloat(emaEightNum)         
        emaTwelveNum = parseFloat(emaTwelveNum)         
        emaTwentyNum = parseFloat(emaTwentyNum)         
        emaTwentySixNum = parseFloat(emaTwentySixNum)         
        emaFiftyNum = parseFloat(emaFiftyNum)            
        emaTwoHunNum = parseFloat(emaTwoHunNum)

        wmaFifteenNum = parseFloat(wmaFifteenNum)           
        wmaTwentyNum = parseFloat(wmaTwentyNum)         
        wmaThirtyNum = parseFloat(wmaThirtyNum)      
        wmaFiftyNum = parseFloat(wmaFiftyNum)       
        wmaOneHunNum = parseFloat(wmaOneHunNum)            
        wmaTwoHunNum = parseFloat(wmaTwoHunNum)          

        vwmaFifteenNum = parseFloat(vwmaFifteenNum)            
        vwmaTwentyNum = parseFloat(vwmaTwentyNum)           
        vwmaThirtyNum = parseFloat(vwmaThirtyNum)         
        vwmaFiftyNum = parseFloat(vwmaFiftyNum)          
        vwmaOneHunNum = parseFloat(vwmaOneHunNum)              
        vwmaTwoHunNum = parseFloat(vwmaTwoHunNum)     

        // IF FOR CLASS ADD
        if ($(window).width() > 700)
        {

            // MA CHECK --------------------
            if (price > smaFifteenNum)
            {
                smaFifteen.addClass('bullish-ma')
            } 
            else if (price < smaFifteenNum)
            {
                 smaFifteen.addClass('bearish-ma')
            }
            else if (price == smaFifteenNum)
            {
                 smaFifteen.addClass('neutral-ma')
            }

            if (price > smaTwentyNum)
            {
                smaTwenty.addClass('bullish-ma')
            } 
            else if (price < smaTwentyNum)
            {
                 smaTwenty.addClass('bearish-ma')
            }
            else if (price == smaTwentyNum)
            {
                 smaTwenty.addClass('neutral-ma')
            }
            if (price > smaThirtyNum)
            {
                smaThirty.addClass('bullish-ma')
            } 
            else if (price < smaThirtyNum)
            {
                 smaThirty.addClass('bearish-ma')
            }
            else if (price == smaThirtyNum)
            {
                 smaThirty.addClass('neutral-ma')
            }
            if (price > smaFiftyNum)
            {
                smaFifty.addClass('bullish-ma')
            } 
            else if (price < smaFiftyNum)
            {
                 smaFifty.addClass('bearish-ma')
            }
            else if (price == smaFiftyNum)
            {
                 smaFifty.addClass('neutral-ma')
            }
            if (price > smaOneHunNum)
            {
                smaOneHun.addClass('bullish-ma')
            } 
            else if (price < smaOneHunNum)
            {
                 smaOneHun.addClass('bearish-ma')
            }
            else if (price == smaOneHunNum)
            {
                 smaOneHun.addClass('neutral-ma')
            }
            if (price > smaTwoHunNum)
            {
                smaTwoHun.addClass('bullish-ma')
            } 
            else if (price < smaTwoHunNum)
            {
                 smaTwoHun.addClass('bearish-ma')
            }
            else if (price == smaTwoHunNum)
            {
                 smaTwoHun.addClass('neutral-ma')
            }

            if (smaFiftyNum > smaTwoHunNum)
            {
                 goldenCrossSma.addClass('cross-display')
            }
            else if (smaFiftyNum < smaTwoHunNum)
            {
                 deathCrossSma.addClass("cross-display")
            }
                //    EMA -----------------------------------
  
           if (price > emaEightNum)
           {
               emaEight.addClass('bullish-ma')
           } 
           else if (price < emaEightNum)
           {
                emaEight.addClass('bearish-ma')
           }
           else if (price == emaEightNum)
           {
                emaEight.addClass('neutral-ma')
           }

           if (price > emaTwelveNum)
           {
                emaTwelve.addClass('bullish-ma')
           } 
           else if (price < emaTwelveNum)
           {
                emaTwelve.addClass('bearish-ma')
           }
           else if (price == emaTwelveNum)
           {
                emaTwelve.addClass('neutral-ma')
           }

           if (price > emaTwentyNum)
           {
                emaTwenty.addClass('bullish-ma')
           } 
           else if (price < emaTwentyNum)
           {
                emaTwenty.addClass('bearish-ma')
           }
           else if (price == emaTwentyNum)
           {
                emaTwenty.addClass('neutral-ma')
           }

           if (price > emaTwentySixNum)
           {
                emaTwentySix.addClass('bullish-ma')
           } 
           else if (price < emaTwentySixNum)
           {
                emaTwentySix.addClass('bearish-ma')
           }
           else if (price == emaTwentySixNum)
           {
                emaTwentySix.addClass('neutral-ma')
           }

           if (price > emaFiftyNum)
           {
                emaFifty.addClass('bullish-ma')
           } 
           else if (price < emaFiftyNum)
           {
                emaFifty.addClass('bearish-ma')
           }
           else if (price == emaFiftyNum)
           {
                emaFifty.addClass('neutral-ma')
           }

           if (price > emaTwoHunNum)
           {
                emaTwoHun.addClass('bullish-ma')
           } 
           else if (price < emaTwoHunNum)
           {
                emaTwoHun.addClass('bearish-ma')
           }
           else if (price == emaTwoHunNum)
           {
                emaTwoHun.addClass('neutral-ma')
           }

           if (emaTwelveNum > emaTwentySixNum)
           {
                goldenCrossEma.addClass('cross-display')
           }
           else if (emaTwelveNum < emaTwentySixNum)
           {
                deathCrossEma.addClass('cross-display')
           }

            //    WMA -----------------------------------

            if (price > wmaFifteenNum)
            {
                 wmaFifteen.addClass('bullish-ma')
            } 
            else if (price < wmaFifteenNum)
            {
                 wmaFifteen.addClass('bearish-ma')
            }
            else if (price == wmaFifteenNum)
            {
                 wmaFifteen.addClass('neutral-ma')
            }
 
            if (price > wmaTwentyNum)
            {
                 wmaTwenty.addClass('bullish-ma')
            } 
            else if (price < wmaTwentyNum)
            {
                 wmaTwenty.addClass('bearish-ma')
            }
            else if (price == wmaTwentyNum)
            {
                 wmaTwenty.addClass('neutral-ma')
            }
 
            if (price > wmaThirtyNum)
            {
                 wmaThirty.addClass('bullish-ma')
            } 
            else if (price < wmaThirtyNum)
            {
                 wmaThirty.addClass('bearish-ma')
            }
            else if (price == wmaThirtyNum)
            {
                 wmaThirty.addClass('neutral-ma')
            }
 
            if (price > wmaFiftyNum)
            {
                 wmaFifty.addClass('bullish-ma')
            } 
            else if (price < wmaFiftyNum)
            {
                 wmaFifty.addClass('bearish-ma')
            }
            else if (price == wmaFiftyNum)
            {
                 wmaFifty.addClass('neutral-ma')
            }
 
            if (price > wmaOneHunNum)
            {
                 wmaOneHun.addClass('bullish-ma')
            } 
            else if (price < wmaOneHunNum)
            {
                 wmaOneHun.addClass('bearish-ma')
            }
            else if (price == wmaOneHunNum)
            {
                 wmaOneHun.addClass('neutral-ma')
            }
 
            if (price > wmaTwoHunNum)
            {
                 wmaTwoHun.addClass('bullish-ma')
            } 
            else if (price < wmaTwoHunNum)
            {
                 wmaTwoHun.addClass('bearish-ma')
            }
            else if (price == wmaTwoHunNum)
            {
                 wmaTwoHun.addClass('neutral-ma')
            }

            if (wmaFiftyNum > wmaTwoHunNum)
            {
                goldenCrossWma.addClass('cross-display')
            }
            else if (wmaFiftyNum < wmaTwoHunNum)
            {
                deathCrossWma.addClass('cross-display')
            }

    //    VWMA -----------------------------------

           if (price > vwmaFifteenNum)
           {
                vwmaFifteen.addClass('bullish-ma')
           } 
           else if (price < vwmaFifteenNum)
           {
                vwmaFifteen.addClass('bearish-ma')
           }
           else if (price == vwmaFifteenNum)
           {
                vwmaFifteen.addClass('neutral-ma')
           }

           if (price > vwmaTwentyNum)
           {
                vwmaTwenty.addClass('bullish-ma')
           } 
           else if (price < vwmaTwentyNum)
           {
                vwmaTwenty.addClass('bearish-ma')
           }
           else if (price == vwmaTwentyNum)
           {
                vwmaTwenty.addClass('neutral-ma')
           }

           if (price > vwmaThirtyNum)
           {
                vwmaThirty.addClass('bullish-ma')
           } 
           else if (price < vwmaThirtyNum)
           {
                vwmaThirty.addClass('bearish-ma')
           }
           else if (price == vwmaThirtyNum)
           {
                vwmaThirty.addClass('neutral-ma')
           }

           if (price > vwmaFiftyNum)
           {
                vwmaFifty.addClass('bullish-ma')
           } 
           else if (price < vwmaFiftyNum)
           {
                vwmaFifty.addClass('bearish-ma')
           }
           else if (price == vwmaFiftyNum)
           {
                vwmaFifty.addClass('neutral-ma')
           }

           if (price > vwmaOneHunNum)
           {
                vwmaOneHun.addClass('bullish-ma')
           } 
           else if (price < vwmaOneHunNum)
           {
                vwmaOneHun.addClass('bearish-ma')
           }
           else if (price == vwmaOneHunNum)
           {
                vwmaOneHun.addClass('neutral-ma')
           }

           if (price > vwmaTwoHunNum)
           {
                vwmaTwoHun.addClass('bullish-ma')
           } 
           else if (price < vwmaTwoHunNum)
           {
                vwmaTwoHun.addClass('bearish-ma')
           }
           else if (price == vwmaTwoHunNum)
           {
                vwmaTwoHun.addClass('neutral-ma')
           }

           if (vwmaFiftyNum > vwmaTwoHunNum)
           {
               goldenCrossVwma.addClass('cross-display')
           }
           else if (vwmaFiftyNum < vwmaTwoHunNum)
           {
               deathCrossVwma.addClass('cross-display')
           }

            // TECHNICAL CHECK ---------------
            if (price < vwap)
            {
                vwapHeader.addClass('bullish-stuff')
            }
            else if (price > vwap)
            {
                vwapHeader.addClass('bearish-stuff')
            }
            else if (price == vwap)
            {
                vwapHeader.addClass('neutral-stuff')
            }
            // MACD IF FOR CLASS ADD
            if (macd > 0)
            {
                macdHeader.addClass('bullish-stuff')
            }
            else if (macd < 0)
            {
                macdHeader.addClass('bearish-stuff')
            }
            else if (macd == 0)
            {
                macdHeader.addClass('neutral-stuff')
            }
            // RSI IF FOR CLASS ADD
            if (rsi < 30)
            {
                rsiHeader.addClass('bullish-stuff')
            }
            else if (rsi > 70)
            {
                rsiHeader.addClass('bearish-stuff')
            }
            else if (rsi < 70 && rsi > 30)
            {
                rsiHeader.addClass('neutral-stuff')
            }
            // CCI IF FOR CLASS ADD
            if (cci > 100) 
            {
                cciHeader.addClass('bullish-stuff')
            }
            else if (cci < -100) 
            {
                cciHeader.addClass('bearish-stuff')
            }
            else if (cci < 100 && cci > -100)
            {
                cciHeader.addClass('neutral-stuff')
            }
            //  WILLIAMS IF FOR CLASS ADD
            if (williams > -50)
            {
                williamsHeader.addClass('bullish-stuff')
            }
            else if (williams < -50)
            {
                williamsHeader.addClass('bearish-stuff')
            }
            //  STOCHASTIC IF FOR CLASS ADD
            if (stochasticK > 85)
            {
                stochasticHeader.addClass('bearish-stuff-k')
            }
            else if (stochasticK < 15)
            {
                stochasticHeader.addClass('bullish-stuff-k')
            }
            else if (stochasticK < 85 && stochasticK > 15) 
            {
                stochasticHeader.addClass('neutral-stuff-k')
            }

            if (stochasticD > 80)
            {
                stochasticHeader.addClass('bearish-stuff-d')
            }
            else if (stochasticD < 20)
            {
                stochasticHeader.addClass('bullish-stuff-d')
            }
            else if (stochasticD < 80 && stochasticD > 20) 
            {
                stochasticHeader.addClass('neutral-stuff-d')
            }

            //  STOCHASTIC IF FOR CLASS ADD
            if (bbPercent < 0)
            {
                bbHeader.addClass('bullish-stuff')
            }
            else if (bbPercent > 1)
            {
                bbHeader.addClass('bearish-stuff')
            }
            else if (bbPercent > .8 && bbPercent < 1)
            {
                bbHeader.addClass('bullish-stuff')
            }
            else if (bbPercent < .2 && bbPercent > 0)
            {
                bbHeader.addClass('bearish-stuff')
            }
            else if (bbPercent < .8 && bbPercent > .2)
            {
                bbHeader.addClass('neutral-stuff')
            }
        }
        else
        {
                        // SMA -----------------------
            if (price > smaFifteenNum)
            {
                smaFifteen.addClass('bullish-stuff-mobile')
            } 
            else if (price < smaFifteenNum)
            {
                smaFifteen.addClass('bearish-stuff-mobile')
            }
            else if (price == smaFifteenNum)
            {
                smaFifteen.addClass('neutral-stuff-mobile')
            }

            if (price > smaTwentyNum)
            {
                smaTwenty.addClass('bullish-stuff-mobile')
            } 
            else if (price < smaTwentyNum)
            {
                smaTwenty.addClass('bearish-stuff-mobile')
            }
            else if (price == smaTwentyNum)
            {
                smaTwenty.addClass('neutral-stuff-mobile')
            }
            if (price > smaThirtyNum)
            {
                smaThirty.addClass('bullish-stuff-mobile')
            } 
            else if (price < smaThirtyNum)
            {
                smaThirty.addClass('bearish-stuff-mobile')
            }
            else if (price == smaThirtyNum)
            {
                smaThirty.addClass('neutral-stuff-mobile')
            }
            if (price > smaFiftyNum)
            {
                smaFifty.addClass('bullish-stuff-mobile')
            } 
            else if (price < smaFiftyNum)
            {
                smaFifty.addClass('bearish-stuff-mobile')
            }
            else if (price == smaFiftyNum)
            {
                smaFifty.addClass('neutral-stuff-mobile')
            }
            if (price > smaOneHunNum)
            {
                smaOneHun.addClass('bullish-stuff-mobile')
            } 
            else if (price < smaOneHunNum)
            {
                smaOneHun.addClass('bearish-stuff-mobile')
            }
            else if (price == smaOneHunNum)
            {
                smaOneHun.addClass('neutral-stuff-mobile')
            }
            if (price > smaTwoHunNum)
            {
                smaTwoHun.addClass('bullish-stuff-mobile')
            } 
            else if (price < smaTwoHunNum)
            {
                smaTwoHun.addClass('bearish-stuff-mobile')
            }
            else if (price == smaTwoHunNum)
            {
                smaTwoHun.addClass('neutral-stuff-mobile')
            }

            if (smaFiftyNum > smaTwoHunNum)
            {
                goldenCrossSma.addClass('cross-display')
            }
            else if (smaFiftyNum < smaTwoHunNum)
            {
                deathCrossSma.addClass('cross-display')
            }
            //    EMA -----------------------------------

            if (price > emaEightNum)
            {
                emaEight.addClass('bullish-stuff-mobile')
            } 
            else if (price < emaEightNum)
            {
                emaEight.addClass('bearish-stuff-mobile')
            }
            else if (price == emaEightNum)
            {
                emaEight.addClass('neutral-stuff-mobile')
            }

            if (price > emaTwelveNum)
            {
                emaTwelve.addClass('bullish-stuff-mobile')
            } 
            else if (price < emaTwelveNum)
            {
                emaTwelve.addClass('bearish-stuff-mobile')
            }
            else if (price == emaTwelveNum)
            {
                emaTwelve.addClass('neutral-stuff-mobile')
            }

            if (price > emaTwentyNum)
            {
                emaTwenty.addClass('bullish-stuff-mobile')
            } 
            else if (price < emaTwentyNum)
            {
                emaTwenty.addClass('bearish-stuff-mobile')
            }
            else if (price == emaTwentyNum)
            {
                emaTwenty.addClass('neutral-stuff-mobile')
            }

            if (price > emaTwentySixNum)
            {
                emaTwentySix.addClass('bullish-stuff-mobile')
            } 
            else if (price < emaTwentySixNum)
            {
                emaTwentySix.addClass('bearish-stuff-mobile')
            }
            else if (price == emaTwentySixNum)
            {
                emaTwentySix.addClass('neutral-stuff-mobile')
            }

            if (price > emaFiftyNum)
            {
                emaFifty.addClass('bullish-stuff-mobile')
            } 
            else if (price < emaFiftyNum)
            {
                emaFifty.addClass('bearish-stuff-mobile')
            }
            else if (price == emaFiftyNum)
            {
                emaFifty.addClass('neutral-stuff-mobile')
            }

            if (price > emaTwoHunNum)
            {
                emaTwoHun.addClass('bullish-stuff-mobile')
            } 
            else if (price < emaTwoHunNum)
            {
                emaTwoHun.addClass('bearish-stuff-mobile')
            }
            else if (price == emaTwoHunNum)
            {
                emaTwoHun.addClass('neutral-stuff-mobile')
            }

            if (emaTwelveNum > emaTwentySixNum)
            {
                goldenCrossEma.addClass('cross-display')
            }
            else if (emaTwelveNum < emaTwentySixNum)
            {
                deathCrossEma.addClass('cross-display')
            }

            //    WMA -----------------------------------

            if (price > wmaFifteenNum)
            {
            wmaFifteen.addClass('bullish-stuff-mobile')
            } 
            else if (price < wmaFifteenNum)
            {
            wmaFifteen.addClass('bearish-stuff-mobile')
            }
            else if (price == wmaFifteenNum)
            {
            wmaFifteen.addClass('neutral-stuff-mobile')
            }

            if (price > wmaTwentyNum)
            {
            wmaTwenty.addClass('bullish-stuff-mobile')
            } 
            else if (price < wmaTwentyNum)
            {
            wmaTwenty.addClass('bearish-stuff-mobile')
            }
            else if (price == wmaTwentyNum)
            {
            wmaTwenty.addClass('neutral-stuff-mobile')
            }

            if (price > wmaThirtyNum)
            {
            wmaThirty.addClass('bullish-stuff-mobile')
            } 
            else if (price < wmaThirtyNum)
            {
            wmaThirty.addClass('bearish-stuff-mobile')
            }
            else if (price == wmaThirtyNum)
            {
            wmaThirty.addClass('neutral-stuff-mobile')
            }

            if (price > wmaFiftyNum)
            {
            wmaFifty.addClass('bullish-stuff-mobile')
            } 
            else if (price < wmaFiftyNum)
            {
            wmaFifty.addClass('bearish-stuff-mobile')
            }
            else if (price == wmaFiftyNum)
            {
            wmaFifty.addClass('neutral-stuff-mobile')
            }

            if (price > wmaOneHunNum)
            {
            wmaOneHun.addClass('bullish-stuff-mobile')
            } 
            else if (price < wmaOneHunNum)
            {
            wmaOneHun.addClass('bearish-stuff-mobile')
            }
            else if (price == wmaOneHunNum)
            {
            wmaOneHun.addClass('neutral-stuff-mobile')
            }

            if (price > wmaTwoHunNum)
            {
            wmaTwoHun.addClass('bullish-stuff-mobile')
            } 
            else if (price < wmaTwoHunNum)
            {
            wmaTwoHun.addClass('bearish-stuff-mobile')
            }
            else if (price == wmaTwoHunNum)
            {
            wmaTwoHun.addClass('neutral-stuff-mobile')
            }

            if (wmaFiftyNum > wmaTwoHunNum)
            {
                goldenCrossWma.addClass('cross-display')
            }
            else if (wmaFiftyNum < wmaTwoHunNum)
            {
                deathCrossWma.addClass('cross-display')
            }

            //    VWMA -----------------------------------

            if (price > vwmaFifteenNum)
            {
            vwmaFifteen.addClass('bullish-stuff-mobile')
            } 
            else if (price < vwmaFifteenNum)
            {
            vwmaFifteen.addClass('bearish-stuff-mobile')
            }
            else if (price == vwmaFifteenNum)
            {
            vwmaFifteen.addClass('neutral-stuff-mobile')
            }

            if (price > vwmaTwentyNum)
            {
            vwmaTwenty.addClass('bullish-stuff-mobile')
            } 
            else if (price < vwmaTwentyNum)
            {
            vwmaTwenty.addClass('bearish-stuff-mobile')
            }
            else if (price == vwmaTwentyNum)
            {
            vwmaTwenty.addClass('neutral-stuff-mobile')
            }

            if (price > vwmaThirtyNum)
            {
            vwmaThirty.addClass('bullish-stuff-mobile')
            } 
            else if (price < vwmaThirtyNum)
            {
            vwmaThirty.addClass('bearish-stuff-mobile')
            }
            else if (price == vwmaThirtyNum)
            {
            vwmaThirty.addClass('neutral-stuff-mobile')
            }

            if (price > vwmaFiftyNum)
            {
            vwmaFifty.addClass('bullish-stuff-mobile')
            } 
            else if (price < vwmaFiftyNum)
            {
            vwmaFifty.addClass('bearish-stuff-mobile')
            }
            else if (price == vwmaFiftyNum)
            {
            vwmaFifty.addClass('neutral-stuff-mobile')
            }

            if (price > vwmaOneHunNum)
            {
            vwmaOneHun.addClass('bullish-stuff-mobile')
            } 
            else if (price < vwmaOneHunNum)
            {
            vwmaOneHun.addClass('bearish-stuff-mobile')
            }
            else if (price == vwmaOneHunNum)
            {
            vwmaOneHun.addClass('neutral-stuff-mobile')
            }

            if (price > vwmaTwoHunNum)
            {
            vwmaTwoHun.addClass('bullish-stuff-mobile')
            } 
            else if (price < vwmaTwoHunNum)
            {
            vwmaTwoHun.addClass('bearish-stuff-mobile')
            }
            else if (price == vwmaTwoHunNum)
            {
            vwmaTwoHun.addClass('neutral-stuff-mobile')
            }

            if (vwmaFiftyNum > vwmaTwoHunNum)
            {
                goldenCrossVwma.addClass('cross-display')
            }
            else if (vwmaFiftyNum < vwmaTwoHunNum)
            {
                deathCrossVwma.addClass('cross-display')
            }

            if (price < vwap)
            {
                $(`.vwap-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (price > vwap)
            {
                $(`.vwap-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (price == vwap)
            {
                $(`.vwap-up-actual-${i}`).addClass('neutral-stuff-mobile')
            }
            // MACD IF FOR CLASS ADD
            if (macd > 0)
            {
                $(`.macd-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (macd < 0)
            {
                $(`.macd-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (macd == 0)
            {
                $(`.macd-up-actual-${i}`).addClass('neutral-stuff-mobile')
            }
            // RSI IF FOR CLASS ADD
            if (rsi < 30)
            {
                $(`.rsi-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (rsi > 70)
            {
                $(`.rsi-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (rsi < 70 && rsi > 30)
            {
                $(`.rsi-up-actual-${i}`).addClass('neutral-stuff-mobile')
            }
            // CCI IF FOR CLASS ADD
            if (cci > 100) 
            {
                $(`.cci-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (cci < -100) 
            {
                $(`.cci-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (cci < 100 && cci > -100)
            {
                $(`.cci-up-actual-${i}`).addClass('neutral-stuff-mobile')
            }
            //  WILLIAMS IF FOR CLASS ADD
            if (williams > -50)
            {
                $(`.williams-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (williams < -50)
            {
                $(`.williams-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            //  STOCHASTIC IF FOR CLASS ADD
            if (stochasticK > 85)
            {
                $(`.stochasticK-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (stochasticK < 15)
            {
                $(`.stochasticK-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (stochasticK < 85 && stochasticK > 15) 
            {
                $(`.stochasticK-up-actual-${i}`).addClass('neutral-stuff-mobile')
            }

            if (stochasticD > 80)
            {
                $(`.stochasticD-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (stochasticD < 20)
            {
                $(`.stochasticD-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (stochasticD < 80 && stochasticD > 20) 
            {
                $(`.stochasticD-up-actual-${i}`).addClass('neutral-stuff-mobile')
            }

            //  STOCHASTIC IF FOR CLASS ADD
            if (bbPercent < 0)
            {
                $(`.bbPercent-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (bbPercent > 1)
            {
                $(`.bbPercent-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (bbPercent > .8 && bbPercent < 1)
            {
                $(`.bbPercent-up-actual-${i}`).addClass('bullish-stuff-mobile')
            }
            else if (bbPercent < .2 && bbPercent > 0)
            {
                $(`.bbPercent-up-actual-${i}`).addClass('bearish-stuff-mobile')
            }
            else if (bbPercent <= .8 && bbPercent >= .2)
            {
                $(`.bbPercent-up-actual-${i}`).addClass('neutral-stuff-mobile')
            }

        }

    }

    function indicatorColorsSearch() {

               // ALL MIGHTY PRICE
               let price = $(`.price-search`).text().slice(8,)
               // GET HEADERS FOR HOVER EFFECT
               let vwapHeader = $('.vwap-search-header')
               let macdHeader = $('.macd-search-header')
               let rsiHeader = $('.rsi-search-header')
               let cciHeader = $('.cci-search-header')
               let williamsHeader = $('.williams-search-header')
               let stochasticHeader = $('.stochastic-search-header')
               let bbHeader = $('.bb-search-header')
               // GET ACTUALS FOR NUMBER CALCS AND HOVER COLOR
               let vwap = $('.vwap-search-actual').text()
               let macd = $('.macd-search-actual').text()
               let rsi = $('.rsi-search-actual').text()
               let cci = $('.cci-search-actual').text()
               let williams = $('.williams-search-actual').text()
               let stochasticK = $('.stochasticK-search-actual').text().slice(4,)
               let stochasticD = $('.stochasticD-search-actual').text().slice(4,)
               let bbPercent = $('.bbPercent-search-actual').text().slice(4,) 

               let smaFifteen = $(`.smafifteen-search-actual`)           
               let smaTwenty = $(`.smatwenty-search-actual`)           
               let smaThirty = $(`.smathirty-search-actual`)            
               let smaFifty = $(`.smafifty-search-actual`)           
               let smaOneHun = $(`.smaonehundred-search-actual`)              
               let smaTwoHun = $(`.smatwohundred-search-actual`)    

               let emaEight = $(`.emaeight-search-actual`)            
               let emaTwelve = $(`.ematwelve-search-actual`)            
               let emaTwenty = $(`.ematwenty-search-actual`)           
               let emaTwentySix = $(`.ematwentysix-search-actual`)           
               let emaFifty = $(`.emafifty-search-actual`)          
               let emaTwoHun = $(`.ematwohundred-search-actual`)     

               let wmaFifteen = $(`.wmafifteen-search-actual`)            
               let wmaTwenty = $(`.wmatwenty-search-actual`)          
               let wmaThirty = $(`.wmathirty-search-actual`)            
               let wmaFifty = $(`.wmafifty-search-actual`)          
               let wmaOneHun = $(`.wmaonehundred-search-actual`)              
               let wmaTwoHun = $(`.wmatwohundred-search-actual`)            

               let vwmaFifteen = $(`.vwmafifteen-search-actual`)           
               let vwmaTwenty = $(`.vwmatwenty-search-actual`)            
               let vwmaThirty = $(`.vwmathirty-search-actual`)            
               let vwmaFifty = $(`.vwmafifty-search-actual`)            
               let vwmaOneHun = $(`.vwmaonehundred-search-actual`)              
               let vwmaTwoHun = $(`.vwmatwohundred-search-actual`)
               // BELOW TO GET NUMBER ONLY --------------------------------  
                let smaFifteenNum = $(`.smafifteen-search-actual`).text().slice(4,)            
                let smaTwentyNum = $(`.smatwenty-search-actual`).text().slice(4,)            
                let smaThirtyNum = $(`.smathirty-search-actual`).text().slice(4,)            
                let smaFiftyNum = $(`.smafifty-search-actual`).text().slice(4,)            
                let smaOneHunNum = $(`.smaonehundred-search-actual`).text().slice(5,)              
                let smaTwoHunNum = $(`.smatwohundred-search-actual`).text().slice(5,)    

                let emaEightNum = $(`.emaeight-search-actual`).text().slice(3,)
                let emaTwelveNum = $(`.ematwelve-search-actual`).text().slice(4,)            
                let emaTwentyNum = $(`.ematwenty-search-actual`).text().slice(4,) 
                let emaTwentySixNum = $(`.ematwentysix-search-actual`).text().slice(4,)            
                let emaFiftyNum = $(`.emafifty-search-actual`).text().slice(4,)            
                let emaTwoHunNum = $(`.ematwohundred-search-actual`).text().slice(5,)     

                let wmaFifteenNum = $(`.wmafifteen-search-actual`).text().slice(4,)            
                let wmaTwentyNum = $(`.wmatwenty-search-actual`).text().slice(4,)            
                let wmaThirtyNum = $(`.wmathirty-search-actual`).text().slice(4,)            
                let wmaFiftyNum = $(`.wmafifty-search-actual`).text().slice(4,)           
                let wmaOneHunNum = $(`.wmaonehundred-search-actual`).text().slice(5,)              
                let wmaTwoHunNum = $(`.wmatwohundred-search-actual`).text().slice(5,)             

                let vwmaFifteenNum = $(`.vwmafifteen-search-actual`).text().slice(4,)            
                let vwmaTwentyNum = $(`.vwmatwenty-search-actual`).text().slice(4,)            
                let vwmaThirtyNum = $(`.vwmathirty-search-actual`).text().slice(4,)            
                let vwmaFiftyNum = $(`.vwmafifty-search-actual`).text().slice(4,)            
                let vwmaOneHunNum = $(`.vwmaonehundred-search-actual`).text().slice(5,)              
                let vwmaTwoHunNum = $(`.vwmatwohundred-search-actual`).text().slice(5,)  
       
                let goldenCrossSma = $(`.goldenSma-cross`)
                let deathCrossSma = $(`.deathSma-cross`)
                let goldenCrossEma = $(`.goldenEma-cross`)
                let deathCrossEma = $(`.deathEma-cross`)
                let goldenCrossWma = $(`.goldenWma-cross`)
                let deathCrossWma = $(`.deathWma-cross`)
                let goldenCrossVwma = $(`.goldenVwma-cross`)
                let deathCrossVwma = $(`.deathVwma-cross`)
    
               // TURN STRING TO NUM
               price = parseFloat(price)
       
               vwap = parseFloat(vwap)
               macd = parseFloat(macd)
               rsi = parseFloat(rsi)
               cci = parseFloat(cci)
               williams = parseFloat(williams)
               stochasticK = parseFloat(stochasticK)
               stochasticD = parseFloat(stochasticD)
               bbPercent = parseFloat(bbPercent)

               smaFifteenNum = parseFloat(smaFifteenNum)            
               smaTwentyNum = parseFloat(smaTwentyNum)         
               smaThirtyNum = parseFloat(smaThirtyNum)           
               smaFiftyNum = parseFloat(smaFiftyNum)       
               smaOneHunNum = parseFloat(smaOneHunNum)             
               smaTwoHunNum = parseFloat(smaTwoHunNum)
      
               emaEightNum = parseFloat(emaEightNum)  
               emaTwelveNum = parseFloat(emaTwelveNum)         
               emaTwentyNum = parseFloat(emaTwentyNum) 
               emaTwentySixNum = parseFloat(emaTwentySixNum)         
               emaFiftyNum = parseFloat(emaFiftyNum)            
               emaTwoHunNum = parseFloat(emaTwoHunNum)
      
               wmaFifteenNum = parseFloat(wmaFifteenNum)           
               wmaTwentyNum = parseFloat(wmaTwentyNum)         
               wmaThirtyNum = parseFloat(wmaThirtyNum)      
               wmaFiftyNum = parseFloat(wmaFiftyNum)       
               wmaOneHunNum = parseFloat(wmaOneHunNum)            
               wmaTwoHunNum = parseFloat(wmaTwoHunNum)          
      
               vwmaFifteenNum = parseFloat(vwmaFifteenNum)            
               vwmaTwentyNum = parseFloat(vwmaTwentyNum)           
               vwmaThirtyNum = parseFloat(vwmaThirtyNum)         
               vwmaFiftyNum = parseFloat(vwmaFiftyNum)          
               vwmaOneHunNum = parseFloat(vwmaOneHunNum)              
               vwmaTwoHunNum = parseFloat(vwmaTwoHunNum)   

       try {
               // IF FOR CLASS ADD
            if ($(window).width() > 700)
            {
                // SMA -----------------------
               if (price > smaFifteenNum)
               {
                   smaFifteen.addClass('bullish-ma')
               } 
               else if (price < smaFifteenNum)
               {
                    smaFifteen.addClass('bearish-ma')
               }
               else if (price == smaFifteenNum)
               {
                    smaFifteen.addClass('neutral-ma')
               }

               if (price > smaTwentyNum)
               {
                   smaTwenty.addClass('bullish-ma')
               } 
               else if (price < smaTwentyNum)
               {
                    smaTwenty.addClass('bearish-ma')
               }
               else if (price == smaTwentyNum)
               {
                    smaTwenty.addClass('neutral-ma')
               }
               if (price > smaThirtyNum)
               {
                   smaThirty.addClass('bullish-ma')
               } 
               else if (price < smaThirtyNum)
               {
                    smaThirty.addClass('bearish-ma')
               }
               else if (price == smaThirtyNum)
               {
                    smaThirty.addClass('neutral-ma')
               }
               if (price > smaFiftyNum)
               {
                   smaFifty.addClass('bullish-ma')
               } 
               else if (price < smaFiftyNum)
               {
                    smaFifty.addClass('bearish-ma')
               }
               else if (price == smaFiftyNum)
               {
                    smaFifty.addClass('neutral-ma')
               }
               if (price > smaOneHunNum)
               {
                   smaOneHun.addClass('bullish-ma')
               } 
               else if (price < smaOneHunNum)
               {
                    smaOneHun.addClass('bearish-ma')
               }
               else if (price == smaOneHunNum)
               {
                    smaOneHun.addClass('neutral-ma')
               }
               if (price > smaTwoHunNum)
               {
                   smaTwoHun.addClass('bullish-ma')
               } 
               else if (price < smaTwoHunNum)
               {
                    smaTwoHun.addClass('bearish-ma')
               }
               else if (price == smaTwoHunNum)
               {
                    smaTwoHun.addClass('neutral-ma')
               }

               if (smaFiftyNum > smaTwoHunNum)
               {
                    goldenCrossSma.addClass('cross-display')
               }
               else if (smaFiftyNum < smaTwoHunNum)
               {
                    deathCrossSma.addClass('cross-display')
               }
           //    EMA -----------------------------------
  
           if (price > emaEightNum)
               {
                   emaEight.addClass('bullish-ma')
               } 
               else if (price < emaEightNum)
               {
                    emaEight.addClass('bearish-ma')
               }
               else if (price == emaEightNum)
               {
                    emaEight.addClass('neutral-ma')
               }

               if (price > emaTwelveNum)
               {
                    emaTwelve.addClass('bullish-ma')
               } 
               else if (price < emaTwelveNum)
               {
                    emaTwelve.addClass('bearish-ma')
               }
               else if (price == emaTwelveNum)
               {
                    emaTwelve.addClass('neutral-ma')
               }

               if (price > emaTwentyNum)
               {
                    emaTwenty.addClass('bullish-ma')
               } 
               else if (price < emaTwentyNum)
               {
                    emaTwenty.addClass('bearish-ma')
               }
               else if (price == emaTwentyNum)
               {
                    emaTwenty.addClass('neutral-ma')
               }

               if (price > emaTwentySixNum)
               {
                    emaTwentySix.addClass('bullish-ma')
               } 
               else if (price < emaTwentySixNum)
               {
                    emaTwentySix.addClass('bearish-ma')
               }
               else if (price == emaTwentySixNum)
               {
                    emaTwentySix.addClass('neutral-ma')
               }

               if (price > emaFiftyNum)
               {
                    emaFifty.addClass('bullish-ma')
               } 
               else if (price < emaFiftyNum)
               {
                    emaFifty.addClass('bearish-ma')
               }
               else if (price == emaFiftyNum)
               {
                    emaFifty.addClass('neutral-ma')
               }

               if (price > emaTwoHunNum)
               {
                    emaTwoHun.addClass('bullish-ma')
               } 
               else if (price < emaTwoHunNum)
               {
                    emaTwoHun.addClass('bearish-ma')
               }
               else if (price == emaTwoHunNum)
               {
                    emaTwoHun.addClass('neutral-ma')
               }

               if (emaTwelveNum > emaTwentySixNum)
               {
                    goldenCrossEma.addClass('cross-display')
               }
               else if (emaTwelveNum < emaTwentySixNum)
               {
                    deathCrossEma.addClass('cross-display')
               }

    //    WMA -----------------------------------

           if (price > wmaFifteenNum)
           {
                wmaFifteen.addClass('bullish-ma')
           } 
           else if (price < wmaFifteenNum)
           {
                wmaFifteen.addClass('bearish-ma')
           }
           else if (price == wmaFifteenNum)
           {
                wmaFifteen.addClass('neutral-ma')
           }

           if (price > wmaTwentyNum)
           {
                wmaTwenty.addClass('bullish-ma')
           } 
           else if (price < wmaTwentyNum)
           {
                wmaTwenty.addClass('bearish-ma')
           }
           else if (price == wmaTwentyNum)
           {
                wmaTwenty.addClass('neutral-ma')
           }

           if (price > wmaThirtyNum)
           {
                wmaThirty.addClass('bullish-ma')
           } 
           else if (price < wmaThirtyNum)
           {
                wmaThirty.addClass('bearish-ma')
           }
           else if (price == wmaThirtyNum)
           {
                wmaThirty.addClass('neutral-ma')
           }

           if (price > wmaFiftyNum)
           {
                wmaFifty.addClass('bullish-ma')
           } 
           else if (price < wmaFiftyNum)
           {
                wmaFifty.addClass('bearish-ma')
           }
           else if (price == wmaFiftyNum)
           {
                wmaFifty.addClass('neutral-ma')
           }

           if (price > wmaOneHunNum)
           {
                wmaOneHun.addClass('bullish-ma')
           } 
           else if (price < wmaOneHunNum)
           {
                wmaOneHun.addClass('bearish-ma')
           }
           else if (price == wmaOneHunNum)
           {
                wmaOneHun.addClass('neutral-ma')
           }

           if (price > wmaTwoHunNum)
           {
                wmaTwoHun.addClass('bullish-ma')
           } 
           else if (price < wmaTwoHunNum)
           {
                wmaTwoHun.addClass('bearish-ma')
           }
           else if (price == wmaTwoHunNum)
           {
                wmaTwoHun.addClass('neutral-ma')
           }

           if (wmaFiftyNum > wmaTwoHunNum)
           {
               goldenCrossWma.addClass('cross-display')
           }
           else if (wmaFiftyNum < wmaTwoHunNum)
           {
               deathCrossWma.addClass('cross-display')
           }

    //    VWMA -----------------------------------

           if (price > vwmaFifteenNum)
           {
                vwmaFifteen.addClass('bullish-ma')
           } 
           else if (price < vwmaFifteenNum)
           {
                vwmaFifteen.addClass('bearish-ma')
           }
           else if (price == vwmaFifteenNum)
           {
                vwmaFifteen.addClass('neutral-ma')
           }

           if (price > vwmaTwentyNum)
           {
                vwmaTwenty.addClass('bullish-ma')
           } 
           else if (price < vwmaTwentyNum)
           {
                vwmaTwenty.addClass('bearish-ma')
           }
           else if (price == vwmaTwentyNum)
           {
                vwmaTwenty.addClass('neutral-ma')
           }

           if (price > vwmaThirtyNum)
           {
                vwmaThirty.addClass('bullish-ma')
           } 
           else if (price < vwmaThirtyNum)
           {
                vwmaThirty.addClass('bearish-ma')
           }
           else if (price == vwmaThirtyNum)
           {
                vwmaThirty.addClass('neutral-ma')
           }

           if (price > vwmaFiftyNum)
           {
                vwmaFifty.addClass('bullish-ma')
           } 
           else if (price < vwmaFiftyNum)
           {
                vwmaFifty.addClass('bearish-ma')
           }
           else if (price == vwmaFiftyNum)
           {
                vwmaFifty.addClass('neutral-ma')
           }

           if (price > vwmaOneHunNum)
           {
                vwmaOneHun.addClass('bullish-ma')
           } 
           else if (price < vwmaOneHunNum)
           {
                vwmaOneHun.addClass('bearish-ma')
           }
           else if (price == vwmaOneHunNum)
           {
                vwmaOneHun.addClass('neutral-ma')
           }

           if (price > vwmaTwoHunNum)
           {
                vwmaTwoHun.addClass('bullish-ma')
           } 
           else if (price < vwmaTwoHunNum)
           {
                vwmaTwoHun.addClass('bearish-ma')
           }
           else if (price == vwmaTwoHunNum)
           {
                vwmaTwoHun.addClass('neutral-ma')
           }

           if (vwmaFiftyNum > vwmaTwoHunNum)
           {
               goldenCrossVwma.addClass('cross-display')
           }
           else if (vwmaFiftyNum < vwmaTwoHunNum)
           {
               deathCrossVwma.addClass('cross-display')
           }

               // TECHNICAL START ------------------
               if (price < vwap)
               {
                   vwapHeader.addClass('bullish-stuff')
               }
               else if (price > vwap)
               {
                   vwapHeader.addClass('bearish-stuff')
               }
               else if (price == vwap)
               {
                   vwapHeader.addClass('neutral-stuff')
               }
               // MACD IF FOR CLASS ADD
               if (macd > 0)
               {
                   macdHeader.addClass('bullish-stuff')
               }
               else if (macd < 0)
               {
                   macdHeader.addClass('bearish-stuff')
               }
               else if (macd == 0)
               {
                   macdHeader.addClass('neutral-stuff')
               }
               // RSI IF FOR CLASS ADD
               if (rsi < 30)
               {
                   rsiHeader.addClass('bullish-stuff')
               }
               else if (rsi > 70)
               {
                   rsiHeader.addClass('bearish-stuff')
               }
               else if (rsi < 70 && rsi > 30)
               {
                   rsiHeader.addClass('neutral-stuff')
               }
               // CCI IF FOR CLASS ADD
               if (cci > 100) 
               {
                   cciHeader.addClass('bullish-stuff')
               }
               else if (cci < -100) 
               {
                   cciHeader.addClass('bearish-stuff')
               }
               else if (cci < 100 && cci > -100)
               {
                   cciHeader.addClass('neutral-stuff')
               }
               //  WILLIAMS IF FOR CLASS ADD
               if (williams > -50)
               {
                   williamsHeader.addClass('bullish-stuff')
               }
               else if (williams < -50)
               {
                   williamsHeader.addClass('bearish-stuff')
               }
               //  STOCHASTIC IF FOR CLASS ADD
               if (stochasticK > 85)
               {
                   stochasticHeader.addClass('bearish-stuff-k')
               }
               else if (stochasticK < 15)
               {
                   stochasticHeader.addClass('bullish-stuff-k')
               }
               else if (stochasticK < 85 && stochasticK > 15) 
               {
                   stochasticHeader.addClass('neutral-stuff-k')
               }
       
               if (stochasticD > 80)
               {
                   stochasticHeader.addClass('bearish-stuff-d')
               }
               else if (stochasticD < 20)
               {
                   stochasticHeader.addClass('bullish-stuff-d')
               }
               else if (stochasticD < 80 && stochasticD > 20) 
               {
                   stochasticHeader.addClass('neutral-stuff-d')
               }
       
               //  STOCHASTIC IF FOR CLASS ADD
               if (bbPercent < 0)
               {
                   bbHeader.addClass('bullish-stuff')
               }
               else if (bbPercent > 1)
               {
                   bbHeader.addClass('bearish-stuff')
               }
               else if (bbPercent > .8 && bbPercent < 1)
               {
                   bbHeader.addClass('bullish-stuff')
               }
               else if (bbPercent < .2 && bbPercent > 0)
               {
                   bbHeader.addClass('bearish-stuff')
               }
               else if (bbPercent < .8 && bbPercent > .2)
               {
                   bbHeader.addClass('neutral-stuff')
               }
            }
            else
            {

                                // SMA -----------------------
                if (price > smaFifteenNum)
                {
                    smaFifteen.addClass('bullish-stuff-mobile')
                } 
                else if (price < smaFifteenNum)
                {
                    smaFifteen.addClass('bearish-stuff-mobile')
                }
                else if (price == smaFifteenNum)
                {
                    smaFifteen.addClass('neutral-stuff-mobile')
                }

                if (price > smaTwentyNum)
                {
                    smaTwenty.addClass('bullish-stuff-mobile')
                } 
                else if (price < smaTwentyNum)
                {
                    smaTwenty.addClass('bearish-stuff-mobile')
                }
                else if (price == smaTwentyNum)
                {
                    smaTwenty.addClass('neutral-stuff-mobile')
                }
                if (price > smaThirtyNum)
                {
                    smaThirty.addClass('bullish-stuff-mobile')
                } 
                else if (price < smaThirtyNum)
                {
                    smaThirty.addClass('bearish-stuff-mobile')
                }
                else if (price == smaThirtyNum)
                {
                    smaThirty.addClass('neutral-stuff-mobile')
                }
                if (price > smaFiftyNum)
                {
                    smaFifty.addClass('bullish-stuff-mobile')
                } 
                else if (price < smaFiftyNum)
                {
                    smaFifty.addClass('bearish-stuff-mobile')
                }
                else if (price == smaFiftyNum)
                {
                    smaFifty.addClass('neutral-stuff-mobile')
                }
                if (price > smaOneHunNum)
                {
                    smaOneHun.addClass('bullish-stuff-mobile')
                } 
                else if (price < smaOneHunNum)
                {
                    smaOneHun.addClass('bearish-stuff-mobile')
                }
                else if (price == smaOneHunNum)
                {
                    smaOneHun.addClass('neutral-stuff-mobile')
                }
                if (price > smaTwoHunNum)
                {
                    smaTwoHun.addClass('bullish-stuff-mobile')
                } 
                else if (price < smaTwoHunNum)
                {
                    smaTwoHun.addClass('bearish-stuff-mobile')
                }
                else if (price == smaTwoHunNum)
                {
                    smaTwoHun.addClass('neutral-stuff-mobile')
                }

                if (smaFiftyNum > smaTwoHunNum)
                {
                    goldenCrossSma.addClass('cross-display')
                }
                else if (smaFiftyNum < smaTwoHunNum)
                {
                    deathCrossSma.addClass('cross-display')
                }
                //    EMA -----------------------------------

                if (price > emaEightNum)
                {
                    emaEight.addClass('bullish-stuff-mobile')
                } 
                else if (price < emaEightNum)
                {
                    emaEight.addClass('bearish-stuff-mobile')
                }
                else if (price == emaEightNum)
                {
                    emaEight.addClass('neutral-stuff-mobile')
                }

                if (price > emaTwelveNum)
                {
                    emaTwelve.addClass('bullish-stuff-mobile')
                } 
                else if (price < emaTwelveNum)
                {
                    emaTwelve.addClass('bearish-stuff-mobile')
                }
                else if (price == emaTwelveNum)
                {
                    emaTwelve.addClass('neutral-stuff-mobile')
                }

                if (price > emaTwentyNum)
                {
                    emaTwenty.addClass('bullish-stuff-mobile')
                } 
                else if (price < emaTwentyNum)
                {
                    emaTwenty.addClass('bearish-stuff-mobile')
                }
                else if (price == emaTwentyNum)
                {
                    emaTwenty.addClass('neutral-stuff-mobile')
                }

                if (price > emaTwentySixNum)
                {
                    emaTwentySix.addClass('bullish-stuff-mobile')
                } 
                else if (price < emaTwentySixNum)
                {
                    emaTwentySix.addClass('bearish-stuff-mobile')
                }
                else if (price == emaTwentySixNum)
                {
                    emaTwentySix.addClass('neutral-stuff-mobile')
                }

                if (price > emaFiftyNum)
                {
                    emaFifty.addClass('bullish-stuff-mobile')
                } 
                else if (price < emaFiftyNum)
                {
                    emaFifty.addClass('bearish-stuff-mobile')
                }
                else if (price == emaFiftyNum)
                {
                    emaFifty.addClass('neutral-stuff-mobile')
                }

                if (price > emaTwoHunNum)
                {
                    emaTwoHun.addClass('bullish-stuff-mobile')
                } 
                else if (price < emaTwoHunNum)
                {
                    emaTwoHun.addClass('bearish-stuff-mobile')
                }
                else if (price == emaTwoHunNum)
                {
                    emaTwoHun.addClass('neutral-stuff-mobile')
                }

                if (emaTwelveNum > emaTwentySixNum)
                {
                    goldenCrossEma.addClass('cross-display')
                }
                else if (emaTwelveNum < emaTwentySixNum)
                {
                    deathCrossEma.addClass('cross-display')
                }

                //    WMA -----------------------------------

                if (price > wmaFifteenNum)
                {
                wmaFifteen.addClass('bullish-stuff-mobile')
                } 
                else if (price < wmaFifteenNum)
                {
                wmaFifteen.addClass('bearish-stuff-mobile')
                }
                else if (price == wmaFifteenNum)
                {
                wmaFifteen.addClass('neutral-stuff-mobile')
                }

                if (price > wmaTwentyNum)
                {
                wmaTwenty.addClass('bullish-stuff-mobile')
                } 
                else if (price < wmaTwentyNum)
                {
                wmaTwenty.addClass('bearish-stuff-mobile')
                }
                else if (price == wmaTwentyNum)
                {
                wmaTwenty.addClass('neutral-stuff-mobile')
                }

                if (price > wmaThirtyNum)
                {
                wmaThirty.addClass('bullish-stuff-mobile')
                } 
                else if (price < wmaThirtyNum)
                {
                wmaThirty.addClass('bearish-stuff-mobile')
                }
                else if (price == wmaThirtyNum)
                {
                wmaThirty.addClass('neutral-stuff-mobile')
                }

                if (price > wmaFiftyNum)
                {
                wmaFifty.addClass('bullish-stuff-mobile')
                } 
                else if (price < wmaFiftyNum)
                {
                wmaFifty.addClass('bearish-stuff-mobile')
                }
                else if (price == wmaFiftyNum)
                {
                wmaFifty.addClass('neutral-stuff-mobile')
                }

                if (price > wmaOneHunNum)
                {
                wmaOneHun.addClass('bullish-stuff-mobile')
                } 
                else if (price < wmaOneHunNum)
                {
                wmaOneHun.addClass('bearish-stuff-mobile')
                }
                else if (price == wmaOneHunNum)
                {
                wmaOneHun.addClass('neutral-stuff-mobile')
                }

                if (price > wmaTwoHunNum)
                {
                wmaTwoHun.addClass('bullish-stuff-mobile')
                } 
                else if (price < wmaTwoHunNum)
                {
                wmaTwoHun.addClass('bearish-stuff-mobile')
                }
                else if (price == wmaTwoHunNum)
                {
                wmaTwoHun.addClass('neutral-stuff-mobile')
                }

                if (wmaFiftyNum > wmaTwoHunNum)
                {
                    goldenCrossWma.addClass('cross-display')
                }
                else if (wmaFiftyNum < wmaTwoHunNum)
                {
                    deathCrossWma.addClass('cross-display')
                }

                //    VWMA -----------------------------------

                if (price > vwmaFifteenNum)
                {
                vwmaFifteen.addClass('bullish-stuff-mobile')
                } 
                else if (price < vwmaFifteenNum)
                {
                vwmaFifteen.addClass('bearish-stuff-mobile')
                }
                else if (price == vwmaFifteenNum)
                {
                vwmaFifteen.addClass('neutral-stuff-mobile')
                }

                if (price > vwmaTwentyNum)
                {
                vwmaTwenty.addClass('bullish-stuff-mobile')
                } 
                else if (price < vwmaTwentyNum)
                {
                vwmaTwenty.addClass('bearish-stuff-mobile')
                }
                else if (price == vwmaTwentyNum)
                {
                vwmaTwenty.addClass('neutral-stuff-mobile')
                }

                if (price > vwmaThirtyNum)
                {
                vwmaThirty.addClass('bullish-stuff-mobile')
                } 
                else if (price < vwmaThirtyNum)
                {
                vwmaThirty.addClass('bearish-stuff-mobile')
                }
                else if (price == vwmaThirtyNum)
                {
                vwmaThirty.addClass('neutral-stuff-mobile')
                }

                if (price > vwmaFiftyNum)
                {
                vwmaFifty.addClass('bullish-stuff-mobile')
                } 
                else if (price < vwmaFiftyNum)
                {
                vwmaFifty.addClass('bearish-stuff-mobile')
                }
                else if (price == vwmaFiftyNum)
                {
                vwmaFifty.addClass('neutral-stuff-mobile')
                }

                if (price > vwmaOneHunNum)
                {
                vwmaOneHun.addClass('bullish-stuff-mobile')
                } 
                else if (price < vwmaOneHunNum)
                {
                vwmaOneHun.addClass('bearish-stuff-mobile')
                }
                else if (price == vwmaOneHunNum)
                {
                vwmaOneHun.addClass('neutral-stuff-mobile')
                }

                if (price > vwmaTwoHunNum)
                {
                vwmaTwoHun.addClass('bullish-stuff-mobile')
                } 
                else if (price < vwmaTwoHunNum)
                {
                vwmaTwoHun.addClass('bearish-stuff-mobile')
                }
                else if (price == vwmaTwoHunNum)
                {
                vwmaTwoHun.addClass('neutral-stuff-mobile')
                }

                if (vwmaFiftyNum > vwmaTwoHunNum)
                {
                    goldenCrossVwma.addClass('cross-display')
                }
                else if (vwmaFiftyNum < vwmaTwoHunNum)
                {
                    deathCrossVwma.addClass('cross-display')
                }

                
                if (price < vwap)
                {
                    $(`.vwap-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (price > vwap)
                {
                    $(`.vwap-search-actual`).addClass('bearish-stuff-mobile')
                }
                else if (price == vwap)
                {
                    $(`.vwap-search-actual`).addClass('neutral-stuff-mobile')
                }
                // MACD IF FOR CLASS ADD
                if (macd > 0)
                {
                    $(`.macd-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (macd < 0)
                {
                    $(`.macd-search-actual`).addClass('bearish-stuff-mobile')
                }
                else if (macd == 0)
                {
                    $(`.macd-search-actual`).addClass('neutral-stuff-mobile')
                }
                // RSI IF FOR CLASS ADD
                if (rsi < 30)
                {
                    $(`.rsi-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (rsi > 70)
                {
                    $(`.rsi-search-actual`).addClass('bearish-stuff-mobile')
                }
                else if (rsi < 70 && rsi > 30)
                {
                    $(`.rsi-search-actual`).addClass('neutral-stuff-mobile')
                }
                // CCI IF FOR CLASS ADD
                if (cci > 100) 
                {
                    $(`.cci-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (cci < -100) 
                {
                    $(`.cci-search-actual`).addClass('bearish-stuff-mobile')
                }
                else if (cci < 100 && cci > -100)
                {
                    $(`.cci-search-actual`).addClass('neutral-stuff-mobile')
                }
                //  WILLIAMS IF FOR CLASS ADD
                if (williams > -50)
                {
                    $(`.williams-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (williams < -50)
                {
                    $(`.williams-search-actual`).addClass('bearish-stuff-mobile')
                }
                //  STOCHASTIC IF FOR CLASS ADD
                if (stochasticK > 85)
                {
                    $(`.stochasticK-search-actual`).addClass('bearish-stuff-mobile')
                }
                else if (stochasticK < 15)
                {
                    $(`.stochasticK-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (stochasticK < 85 && stochasticK > 15) 
                {
                    $(`.stochasticK-search-actual`).addClass('neutral-stuff-mobile')
                }
    
                if (stochasticD > 80)
                {
                    $(`.stochasticD-search-actual`).addClass('bearish-stuff-mobile')
                }
                else if (stochasticD < 20)
                {
                    $(`.stochasticD-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (stochasticD < 80 && stochasticD > 20) 
                {
                    $(`.stochasticD-search-actual`).addClass('neutral-stuff-mobile')
                }
    
                //  STOCHASTIC IF FOR CLASS ADD
                if (bbPercent < 0)
                {
                    $(`.bbPercent-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (bbPercent > 1)
                {
                    $(`.bbPercent-search-actual`).addClass('bearish-stuff-mobile')
                }
                else if (bbPercent > .8 && bbPercent < 1)
                {
                    $(`.bbPercent-search-actual`).addClass('bullish-stuff-mobile')
                }
                else if (bbPercent < .2 && bbPercent > 0)
                {
                    $(`.bbPercent-search-actual`).addClass('bearish-stuff-mobile')
                }
                else if (bbPercent <= .8 && bbPercent >= .2)
                {
                    $(`.bbPercent-search-actual`).addClass('neutral-stuff-mobile')
                }
    
            }
        }
        catch(e)
       {
        console.log(e)

       }
       
    }

// SEARCH STOCK ----------------------------------------------------

  class SearchObj {
      constructor(name) {
          this.symbol = name;
      }
  }

const heightBlur = $(window).height()
let heightFocus = 0;
$('.search-text').focus(function() {
    focusHeight = $(window).height()
})


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

                    let emaEight = 14
                    let emaTwelve = 22
                    let emaTwenty = 38
                    let emaTwentySix = 50
                    let emaFifty = 98
                    let emaTwoHun = 398
                    let prevDayEmaSub = 0
                    let arrEma = []

                    let macdTwelve = [] // ARRs USED FOR MACD TWELVE HISTORY
                    let macdTwentySix = [] // ARRs USED FOR MACD TWENTY SIX HISTORY

        try {
            // EMA EIGHT ----------------------------------------------------------------------
                if (dataPull.historical.length <= 16) {
                    searchedTicker.emaEight = 'No Data'
                } else {
                while (emaEight >= 15) {
                    prevDayEmaSub += dataPull.historical[emaEight].close
                    emaEight--
                    } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                    const subEMA = prevDayEmaSub / 8
                    //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                    const finalSubEma = ((2/9) * (dataPull.historical[emaEight].close - subEMA)) + subEMA
                    arrEma.unshift(finalSubEma)
                    emaEight--
                    while (emaEight >= 0) {
                        let derp = ((2/9) * (dataPull.historical[emaEight].close - arrEma[0])) + arrEma[0]
                        arrEma.unshift(derp)
                        arrEma.pop()
                        emaEight--
                    }

                    const finalEma = ((2/9) * (newPrice - arrEma[0])) + arrEma[0]
                    arrEma.unshift(finalEma)
                    arrEma.pop()

                    searchedTicker.emaEight = arrEma[0].toFixed(2) 
                    arrEma.pop() 
                    prevDayEmaSub = 0
                }
                   
        // EMA TWELVE ----------------------------------------------------------------------
               
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


                        // EMA TWENTY ----------------------------------------------------------------------
                        if (dataPull.historical.length <= 40) {
                            searchedTicker.emaTwenty = 'No Data'
                        } else {
                        while (emaTwenty >= 19) {
                            prevDayEmaSub += dataPull.historical[emaTwenty].close
                            emaTwenty--
                            } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
                            const subEMA = prevDayEmaSub / 20
                            //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
                            const finalSubEma = ((2/21) * (dataPull.historical[emaTwenty].close - subEMA)) + subEMA
                            arrEma.unshift(finalSubEma)
                            emaTwenty--
                            while (emaTwenty >= 0) {
                                let derp = ((2/21) * (dataPull.historical[emaTwenty].close - arrEma[0])) + arrEma[0]
                                arrEma.unshift(derp)
                                arrEma.pop()
                                emaTwenty--
                            }

                            const finalEma = ((2/21) * (newPrice - arrEma[0])) + arrEma[0]
                            arrEma.unshift(finalEma)
                            arrEma.pop()

                            searchedTicker.emaTwenty = arrEma[0].toFixed(2) 
                            arrEma.pop() 
                            prevDayEmaSub = 0
                        }                


        // EMA TWENTY SIX ----------------------------------------------------------------------

                        if (dataPull.historical.length <= 52) {
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

                const bbPercent = (newPrice - bbLower) / (bbUpper - bbLower)

                searchedTicker.bbUpper = bbUpper.toFixed(2)
                searchedTicker.bbLower = bbLower.toFixed(2)
                searchedTicker.bbMiddle = smaTwenty.toFixed(2)
                searchedTicker.bbPercent = bbPercent.toFixed(2)
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
        while (dataPull[dayLengthPeriod].date.slice(0,10) == newDateString) { 
           dayLengthPeriod++ 
           } 

        // --------------------THIS IS FOR CALCULATING THE VWAP AND PUSHING TO 
        
            for (let i = 0; i < dayLengthPeriod; i++) {
                
                const {volume, high, close, low, date} = dataPull[i];   
                let tpv = (high + low + close) / 3;
                if (date.slice(0,10) == newDateString) {
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
            if (marketDay == 0 || marketDay == 6) {
                searchedTicker.yesterdayVolume = dataPull.historical[1].volume
            }

            if (marketDay >= 1 && marketDay <= 5 && timeNum < 930)
            {
                searchedTicker.yesterdayVolume = dataPull.historical[1].volume
            }

            if (timeNum > 1830)
            {
                searchedTicker.yesterdayVolume = dataPull.historical[1].volume
            }
        }
        if (newestPull.length <= 0) 
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
        let {symbol, price, change, changesPercentage, avgVolume, volume, yesterdayVolume, vwap, smaFiveTeen, smaTwenty, smaThirty, smaFifty, smaOneHun, smaTwoHun, emaEight, emaTwelve, emaTwenty, emaTwentySix, emaFifty, emaTwoHun, wmaFiveTeen, wmaTwenty, wmaThirty, wmaFifty, wmaOneHun, wmaTwoHun, vwmaFiveTeen, vwmaTwenty, vwmaThirty, vwmaFifty, vwmaOneHun, vwmaTwoHun, macd, macdHistogram, macdSignalLine, rsi, stochasticD, stochasticK, stochasticSignal, cciTwenty, bbMiddle, bbLower, bbUpper, bbPercent, williamsR} = obj;

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

         // ADJUST TO FIXED --------------------------------------------------------

        price = price.toFixed(2)

        change = change.toFixed(2)

        changesPercentage = changesPercentage.toFixed(2)

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

        volumeIncrease = volumeIncrease.toFixed(2)

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

        yesterdayVolIncrease = yesterdayVolIncrease.toFixed(2)

         
// NaN CHECK ----------------------------------------
if (isNaN(yesterdayVolIncrease))
{
    yesterdayVolIncrease = 'No Data'
}


    // ADJUST TO POSITIVE 
   if (stochasticD < 0)
   {
     stochasticD = stochasticD * -1
   }
  if (stochasticK < 0)
   {
       stochasticK = stochasticK * -1
   }
  if (stochasticD < 0)
   {
     stochasticD = stochasticD * -1
   }
  if (stochasticK < 0)
   {
       stochasticK = stochasticK * -1
   }

    // ADJUST CERTAIN PARTS TO GIVE RIGHT PROMPT IF UNDEFINED
  
    if (avgVolume == undefined)
    {
        avgVolume = 'No Data'
    }

    if (volume == undefined)
    {
        volume = 'No Data'
    }

    if (volumeIncrease == undefined)
    {
        volumeIncrease = 'No Data'
    }

    if (yesterdayVolume == undefined)
    {
        yesterdayVolume = 'No Data'
    }

        
    if (smaFiveTeen == undefined)
    {
        smaFiveTeen = 'No Data'
    }

    if (smaTwenty == undefined)
    {
        smaTwenty = 'No Data'
    }

    if (smaThirty == undefined)
    {
        smaThirty = 'No Data'
    }

    if (smaFifty == undefined)
    {
        smaFifty = 'No Data'
    }

    if (smaOneHun == undefined)
    {
        smaOneHun = 'No Data'
    }
 
    if (smaTwoHun == undefined)
    {
        smaTwoHun = 'No Data'
    }

    if (emaEight == undefined)
    {
        emaEight = 'No Data'
    }

    if (emaTwelve == undefined)
    {
        emaTwelve = 'No Data'
    }

    if (emaTwenty == undefined)
    {
        emaTwenty = 'No Data'
    }

    if (emaTwentySix == undefined)
    {
        emaTwentySix = 'No Data'
    }

    if (emaFifty == undefined)
    {
        emaFifty = 'No Data'
    }

    if (emaTwoHun == undefined)
    {
        emaTwoHun = 'No Data'
    }

    if (wmaFiveTeen == undefined)
    {
        wmaFiveTeen = 'No Data'
    }

    if (wmaTwenty == undefined)
    {
        wmaTwenty = 'No Data'
    }

    if (wmaThirty == undefined)
    {
        wmaThirty = 'No Data'
    }

    if (wmaFifty == undefined)
    {
        wmaFifty = 'No Data'
    }

    if (wmaOneHun == undefined)
    {
        wmaOneHun = 'No Data'
    }

    if (wmaTwoHun == undefined)
    {
        wmaTwoHun = 'No Data'
    }

    if (vwmaFiveTeen == undefined)
    {
        vwmaFiveTeen = 'No Data'
    }
    if (vwmaTwenty == undefined)
    {
        vwmaTwenty = 'No Data'
    }
    if (vwmaThirty == undefined)
    {
        vwmaThirty = 'No Data'
    }
    if (vwmaFifty == undefined)
    {
        vwmaFifty = 'No Data'
    }
    if (vwmaOneHun == undefined)
    {
        vwmaOneHun = 'No Data'
    }
    if (vwmaTwoHun == undefined)
    {
        vwmaTwoHun = 'No Data'
    }

    if (vwap == undefined)
    {
        vwap = 'No Data'
    }

    if (macd == undefined)
    {
        macd = 'No Data'
    }

    if (rsi == undefined)
    {
        rsi = 'No Data'
    }
    if (cciTwenty == undefined)
    {
        cciTwenty = 'No Data'
    }

    if (williamsR == undefined)
    {
        williamsR = 'No Data'
    }

    if (stochasticK == undefined)
    {
        stochasticK = 'No Data'
    }
    if (stochasticD == undefined)
    {
        stochasticD = 'No Data'
    }
    if (stochasticSignal == undefined)
    {
        stochasticSignal = 'No Data'
    }

    if (bbMiddle == undefined)
    {
        bbMiddle = 'No Data'
    }
    if (bbLower == undefined)
    {
        bbLower = 'No Data'
    }
    if (bbUpper == undefined)
    {
        bbUpper = 'No Data'
    }
    if (bbPercent == undefined)
    {
        bbPercent = 'No Data'
    }

        techIn.html(   
        `<!----------------------------------- SEARCHED SYMBOL --------------------------------------->

        <!----------------------------------- THIS WILL HOLD TECH ANALYSIS FOR HOVER POPULATE IN MIDDLE ---------------------------------------->
    
    <div class="tech-search">

        <div class="symbol-search-box">
            <h2 id="symbol" class="">${symbol}</h2>
            <p class="search-price-text price-search">Price: $${price}</p>
            <div class="search-changes-row">
            <p>${changesPercentage}%</p>
            <div id="search-arrow-${directionArrow}">
            </div>
            <p>$${change}</p>
            </div>
        </div>      

        <h2 class="tech-title t">Daily Indicators</h2> <!--- put if else for if its up or down then out arrow next to it here --------->
        <p class="tech-title-warn epo">For Educational Purposes Only</p>


            <div class="tech-vol-row">
            <a class="info-link" href="https://www.investopedia.com/articles/technical/02/010702.asp" target="_blank"><h3 class='tech-header'>Volume</h3></a>
                <p>Average: <span class="tech-to-left">${avgVolume}</span></p> 
                <p>Current Day: <span class="tech-to-left">${volume}</span></p>
                <p>Change: <span class="tech-to-left"> ${volumeIncrease}%</span></p>

                <p>Day Before: <span class="tech-to-left"> ${yesterdayVolume}</span></p>
                <p>Change: <span class="tech-to-left"> ${yesterdayVolIncrease}%</span></p>
            </div>

            <div class="tech-row">

                <a class="info-link sma-search-header" href="https://www.investopedia.com/terms/s/sma.asp" target="_blank"><h3 class='tech-header'>SMA</h3></a>
                    <div class="averages-row">
                        <p class="smafifteen-search-actual mobile-tap">15: ${smaFiveTeen}</p>
                        <p class="smatwenty-search-actual mobile-tap">20: ${smaTwenty}</p>
                    </div>
                    <div class="averages-row">
                        <p class="smathirty-search-actual mobile-tap">30: ${smaThirty}</p>
                        <p class="smafifty-search-actual mobile-tap">50: ${smaFifty}</p>
                    </div>
                    
                 <p class="goldenSma-cross golden-cross">Golden Cross</p>
                 <p class="deathSma-cross death-cross">Death Cross</p>

                    <div class="averages-row">
                        <p class="smaonehundred-search-actual mobile-tap">100: ${smaOneHun}</p>
                        <p class="smatwohundred-search-actual mobile-tap">200: ${smaTwoHun}</p>
                    </div>
            </div>

            <div class="tech-row">
            <a class="info-link ema-search-header" href="https://www.investopedia.com/terms/e/ema.asp" target="_blank"><h3 class='tech-header'>EMA</h3></a>
                    <div class="averages-row">
                        <p class="emaeight-search-actual mobile-tap">8: ${emaEight}</p>
                        <p class="ematwelve-search-actual mobile-tap">12: ${emaTwelve}</p>
                    </div>
                    <div class="averages-row">
                    <p class="ematwenty-search-actual mobile-tap">20: ${emaTwenty}</p>
                    <p class="ematwentysix-search-actual mobile-tap">26: ${emaTwentySix}</p>
                    </div>    

                    <p class="goldenEma-cross golden-cross ema-cross">Golden Cross</p>
                    <p class="deathEma-cross death-cross ema-cross">Death Cross</p>

                    <div class="averages-row">
                        <p class="emafifty-search-actual mobile-tap">50: ${emaFifty}</p>
                        <p class="ematwohundred-search-actual mobile-tap">200: ${emaTwoHun}</p>
                    </div>           
            </div>

            <div class="tech-row">
            <a class="info-link wma-search-header" href="https://www.investopedia.com/ask/answers/071414/whats-difference-between-moving-average-and-weighted-moving-average.asp" target="_blank"><h3 class='tech-header'>WMA</h3></a>
                    <div class="averages-row">
                        <p class="wmafifteen-search-actual mobile-tap">15: ${wmaFiveTeen}</p>
                        <p class="wmatwenty-search-actual mobile-tap">20: ${wmaTwenty}</p>
                    </div>
                    <div class="averages-row">
                        <p class="wmathirty-search-actual mobile-tap">30: ${wmaThirty}</p>
                        <p class="wmafifty-search-actual mobile-tap">50: ${wmaFifty}</p>
                    </div>

                    <p class="goldenWma-cross golden-cross wma-cross">Golden Cross</p>
                    <p class="deathWma-cross death-cross wma-cross">Death Cross</p>

                    <div class="averages-row">
                        <p class="wmaonehundred-search-actual mobile-tap">100: ${wmaOneHun}</p>
                        <p class="wmatwohundred-search-actual mobile-tap">200: ${wmaTwoHun}</p>
                    </div>
            </div>

            <div class="tech-row">
            <a class="info-link vwma-search-header" href="https://www.tradingsetupsreview.com/volume-weighted-moving-average-vwma/" target="_blank"><h3 class='tech-header'>VWMA</h3></a>
                    <div class="averages-row">
                        <p class="vwmafifteen-search-actual mobile-tap">15: ${vwmaFiveTeen}</p>
                        <p class="vwmatwenty-search-actual mobile-tap">20: ${vwmaTwenty}</p>
                    </div>
                    <div class="averages-row">
                        <p class="vwmathirty-search-actual mobile-tap">30: ${vwmaThirty}</p>
                        <p class="vwmafifty-search-actual mobile-tap">50: ${vwmaFifty}</p>
                    </div>

                    <p class="goldenVwma-cross golden-cross vwma-cross">Golden Cross</p>
                    <p class="deathVwma-cross death-cross vwma-cross">Death Cross</p>

                    <div class="averages-row">
                        <p class="vwmaonehundred-search-actual mobile-tap">100: ${vwmaOneHun}</p>
                        <p class="vwmatwohundred-search-actual mobile-tap">200: ${vwmaTwoHun}</p>
                    </div>
            </div>

            <div class="tech-row">
            <a class="info-link vwap-search-header" href="https://www.investopedia.com/terms/v/vwap.asp" target="_blank"><h3 class='tech-header'>VWAP (5 Minute)</h3></a>
                <p class="osc-text vwap-search-actual mobile-tap">${vwap}</p>
            </div>

            <div class="tech-row">
            <a class="info-link macd-search-header" href="https://www.investopedia.com/terms/m/macd.asp" target="_blank"><h3 class='tech-header'>MACD (12 , 26)</h3></a>
                <p class="osc-text macd-search-actual mobile-tap">${macd}</p>
                    <div class="macd-row">
                        <p class="sl">Signal Line: ${macdSignalLine}</p>
                        <p  class="sl">Histogram: ${macdHistogram}</p>
                    </div>
            </div>

            <div class="flex-rsi-cci">
                <div class="tech-row">
                <a class="info-link rsi-search-header" href="https://www.investopedia.com/terms/s/stochrsi.asp" target="_blank"><h3 class='tech-header'>RSI</h3></a>
                    <p class="osc-text rsi-search-actual mobile-tap">${rsi}</p>
                </div>

                <div class="tech-row">
                <a class="info-link cci-search-header" href="https://www.investopedia.com/terms/c/commoditychannelindex.asp" target="_blank"><h3 class='tech-header'>CCI</h3></a>
                    <p class="osc-text cci-search-actual mobile-tap">${cciTwenty}</p>
                </div>

            </div>

            <div class="tech-row">
            <a class="info-link williams-search-header" href="https://www.investopedia.com/terms/w/williamsr.asp" target="_blank"><h3 class='tech-header'>Williams %R</h3></a>
                <p class="osc-text williams-search-actual mobile-tap">${williamsR}</p>
            </div>


            <div class="tech-row">
            <a class="info-link stochastic-search-header" href="https://www.investopedia.com/terms/s/stochasticoscillator.asp" target="_blank"><h3 class='tech-header'>Stochastic Oscillator</h3></a>
            <div class="averages-row">
                <p class="osc-text stochasticK-search-actual stochK mobile-tap">%K: ${stochasticK}</p>
                <p class="osc-text stochasticD-search-actual stochD mobile-tap">%D: ${stochasticD}</p>
            </div>
                <p class="osc-text sl">Signal Line: ${stochasticSignal}</p>
            </div>

            <div class="tech-row">
            <a class="info-link bb-search-header" href="https://www.investopedia.com/terms/b/bollingerbands.asp" target="_blank"><h3 class='tech-header'>Bollinger Bands</h3></a>
                <p class="osc-text bbPercent-search-actual mobile-tap">%B: ${bbPercent}</p>
                <div class="averages-row">
                    <p class="osc-text sl">Upper: ${bbUpper}</p>
                    <p class="osc-text sl">Lower: ${bbLower}</p>
                </div>
                    <p class="osc-text sl">Middle: ${bbMiddle}</p>

            </div>

            <div class="news-row">
            <a class="tech-header" href="https://www.google.com/search?q=${symbol}+stock+news&source=lnms&tbm=nws&sa=X&ved=2ahUKEwj7_6eMpbPyAhXaVs0KHfuADvoQ_AUoAXoECAEQAw&biw=1280&bih=614" target="_blank">News About This Stock</a>
            </div>

        </div>`
        )

       // SET BOX SHADOW OF BULL AND BEAR
        if (changesPercentage < 0) {
            $('.symbol-search-box').css('box-shadow', 'inset 0px 2.5px 2px var(--bear-market-color), inset 0px 2.5px 2px var(--bear-market-color)')
        }
        else if (changesPercentage > 0)
        {
            $('.symbol-search-box').css('box-shadow', 'inset 0px 2.5px 2px var(--bull-market-color), inset 0px 2.5px 2px var(--bull-market-color)')
        }
         // GET RID OF LOADING SCREEN
        $('.loading-search').css('display', 'none');
        indicatorColorsSearch()

    }