/// DATE REFERENCE FOR MARKET DATA PULLS ----------------------------------------

const today = new Date
const year = today.getFullYear()
let date = today.getUTCDate()
let month = today.getUTCMonth() + 1
let minutes = today.getUTCMinutes()
let hour = today.getUTCHours()
 // GET TIME FOR CLOSING AND OPENING MARKET -----------------------------------

 //CALC FOR UTC TO EST
    hour = hour - 4;
    // CALC FOR EARLY MORNING HOURS UTC
    if (hour < 0)
    {
        hour = hour + 24;
    }
    // GET AND ADJUST MINUTES TO ADD 0 BELOW 10
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    const time = `${hour}${minutes}`
    const timeNum = parseInt(time)

    // GET DAY FOR CLOSING AND OPENING MARKET -------------------------------------------
    const marketDay = today.getUTCDay()
    // CHECK FOR MARKET OPEN - ADJUST DATE SO VWAP STILL PULLS DATA FROM LAST DAY
    if (marketDay == 0) {
        date = date - 2
                // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
                if (date <= 0) {

                    if (month == 1 || month == 2 || month ==  4 || month == 6 || month ==  8 || month == 9 || month == 11) // MONTHS AFTER 31 DAYS
                    {
                        month = month - 1
                        if (month < 10) {
                            month = `0${month}`
                        }
                        date = 30
                        
                    }
                    else if (month == 5 || month == 7 || month ==  10 || month == 12) // MONTHS AFTER 30 DAYS
                    {
                        month = month - 1
                        if (month < 10) {
                            month = `0${month}`
                        }
                        date = 29
                       
                    }
                    else if (month == 3 && (year % 4) == 0) // MONTH AFTER 29 DAYS LEAP YEAR
                    {
                        month = month - 1
                        if (month < 10) {
                            month = `0${month}`
                        }
                        date = 28
                        
                    }
                    else  // MONTH AFTER 28
                    {
                        month = month - 1
                        if (month < 10) {
                            month = `0${month}`
                        }
                        date = 27
                        
                    }
                }    
    } else if (marketDay == 6) {
        date = date - 1
                // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
                if (date <= 0) {

                    if (month == 1 || month == 2 || month ==  4 || month == 6 || month ==  8 || month == 9 || month == 11) // MONTHS AFTER 31 DAYS
                    {
                        month = month - 1
                        if (month < 10) {
                            month = `0${month}`
                        }
                        date = 31
                        
                    }
                    else if (month == 5 || month == 7 || month ==  10 || month == 12) // MONTHS AFTER 30 DAYS
                    {
                        month = month - 1
                        if (month < 10) {
                            month = `0${month}`
                        }
                        date = 30
                       
                    }
                    else if (month == 3 && (year % 4) == 0) // MONTH AFTER 29 DAYS LEAP YEAR
                    {
                        month = month - 1
                        if (month < 10) {
                            month = `0${month}`
                        }
                        date = 29
                        
                    }
                    else  // MONTH AFTER 28
                    {
                        month = month - 1
                        if (month < 10) {
                            month = `0${month}`
                        }
                        date = 28
                        
                    }
                }    
    }
    // THIS IS TO CHECK FOR MARKET DAY OPEN DURING WEEKENDS WHEN MARKET IS CLOSED
    if (marketDay == 1 && timeNum < 930) {
        date = date - 3
        // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
        if (date <= 0) {

            if (month == 1 || month == 2 || month ==  4 || month == 6 || month ==  8 || month == 9 || month == 11) // MONTHS AFTER 31 DAYS
            {
                month = month - 1
                if (month < 10) {
                    month = `0${month}`
                }
                date = 29
                
            }
            else if (month == 5 || month == 7 || month ==  10 || month == 12) // MONTHS AFTER 30 DAYS
            {
                month = month - 1
                if (month < 10) {
                    month = `0${month}`
                }
                date = 28
               
            }
            else if (month == 3 && (year % 4) == 0) // MONTH AFTER 29 DAYS LEAP YEAR
            {
                month = month - 1
                if (month < 10) {
                    month = `0${month}`
                }
                date = 27
                
            }
            else  // MONTH AFTER 28
            {
                month = month - 1
                if (month < 10) {
                    month = `0${month}`
                }
                date = 26
                
            }
        }    
    } 
    else if (marketDay >= 2 && marketDay < 6 && timeNum < 930) {// ADJUSTS DURING WEEK BEFORE OPEN TO GET DAY BEFORE INDICATORS
        date = date - 1
        // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
        if (date <= 0) {

            if (month == 1 || month == 2 || month ==  4 || month == 6 || month ==  8 || month == 9 || month == 11) // MONTHS AFTER 31 DAYS
            {
                month = month - 1
                if (month == 0) {
                    month = 1
                }
                date = 31
                
            }
            else if (month == 5 || month == 7 || month ==  10 || month == 12) // MONTHS AFTER 30 DAYS
            {
                month = month - 1
                date = 30
                
            }
            else if (month == 3 && (year % 4) == 0) // MONTH AFTER 29 DAYS LEAP YEAR
            {
                month = month - 1
                date = 29
               
            }
            else  // MONTH AFTER 28
            {
                month = month - 1
                date = 28
               
            }
    }    
    }

    // THIS IS TO CORRECT MISSING 0 ON SINGLE DIGITS OF MONTHS
    if (date < 10) {
        date = `0${date}`
    }
    if (month < 10) {
        month = `0${month}`
    }

    // DATE CHECK VARIBLE FOR DATA PERIOD PULLS AND TO SLICE FROM
    let todayDate = `${year}-${month}-${date}`

    //CHECK FOR HOLIDAYS OR CLOSED MARKET HOLIDAYS ----------------------------- NEED TO UPDATE
    if (todayDate === '2021-07-05') {
        todayDate = '2021-07-02'
    } 
// THIS IS AN ADJUSTMENT OF DATE FOR MARKET CLOSES EST VS UTC TIME
    let newDateString = todayDate;
    if ((hour + 4) >= 24) 
    {
        const dateNumSlice = parseInt(date);
        const dateSliceStart = todayDate.slice(0,8);
        let newDateNum = dateNumSlice - 1
        if (newDateNum < 10)
        {
            newDateNum = `0${newDateNum}`
        }
        newDateString = `${dateSliceStart}${newDateNum}`
        newDateString = newDateString.toString()
        // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
        if (date == 1 && (hour + 4) >= 24) {

                if (month == 1 || month == 2 || month ==  4 || month == 6 || month ==  8 || month == 9 || month == 11) // MONTHS AFTER 31 DAYS
                {
                    month = month - 1
                    if (month < 10) {
                        month = `0${month}`
                    }
                    date = 31
                    newDateString = `${year}-${month}-${date}`
                }
                else if (month == 5 || month == 7 || month ==  10 || month == 12) // MONTHS AFTER 30 DAYS
                {
                    month = month - 1
                    if (month < 10) {
                        month = `0${month}`
                    }
                    date = 30
                    newDateString = `${year}-${month}-${date}`
                }
                else if (month == 3 && (year % 4) == 0) // MONTH AFTER 29 DAYS LEAP YEAR
                {
                    month = month - 1
                    if (month < 10) {
                        month = `0${month}`
                    }
                    date = 29
                    newDateString = `${year}-${month}-${date}`
                }
                else  // MONTH AFTER 28
                {
                    month = month - 1
                    if (month < 10) {
                        month = `0${month}`
                    }
                    date = 28
                    newDateString = `${year}-${month}-${date}`
                }
        }    

    }
//---------------------------------------------------------------------------------------------------------------------

