var mon = new Array();
var tue = new Array();
var wed = new Array();
var thu = new Array();
var fri = new Array();
var total = new Array();
var dates = new Array();
var totalSteps = 0;

const api_url = `https://api.myjson.com/bins/1gwnal`;

function getDayName(dayNumber) {
    switch (dayNumber) {
        case 1:
            return "MON"
            break;
        case 2:
            return "TUE"
            break;
        case 3:
            return "WED"
            break;
        case 4:
            return "THU"
            break;
        case 5:
            return "FRI"
            break;
    }
}

function totalCalories() {

    var day1 = calories(totalStepsDay(mon));
    var day2 = calories(totalStepsDay(tue));
    var day3 = calories(totalStepsDay(wed));
    var day4 = calories(totalStepsDay(thu));
    var day5 = calories(totalStepsDay(fri));

    return day1 + day2 + day3 + day4 + day5;
}

function calories(steps) {
    return steps * 0.05;
}

function avgHoursWeekly() {

    var day1 = hoursDaily(totalStepsDay(mon));
    var day2 = hoursDaily(totalStepsDay(tue));
    var day3 = hoursDaily(totalStepsDay(wed));
    var day4 = hoursDaily(totalStepsDay(thu));
    var day5 = hoursDaily(totalStepsDay(fri));

    return (day1 + day2 + day3 + day4 + day5) / 5;
}

function hoursDaily(steps) {
    return ((steps * 0.5) / 60) / 60;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function totalStepsDay(array) {
    var total = 0;
    for (i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total;
}

function arrayContainsSame(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i].getDay() === obj.getDay()) {
            return true;
        }
    }
    return false;

}

async function main() {
    const response = await fetch(api_url);
    const data = await response.json();
    //const { timestamp, steps } = data;
    arr = data;

    for (i = 0; i < arr.length; i++) {
        var temp = new Date(arr[i].timestamp);

        if (!arrayContainsSame(dates, temp))
            dates.push(temp);

        var tmp = temp.getDay();
        var steps = arr[i].steps;
        totalSteps = totalSteps + steps;

        switch (tmp) {
            case 1:
                mon.push(steps);
                break;
            case 2:
                tue.push(steps);
                break;
            case 3:
                wed.push(steps);
                break;
            case 4:
                thu.push(steps);
                break;
            case 5:
                fri.push(steps);
                break;
        }
    }



    document.getElementById('koraci').textContent = numberWithCommas(totalSteps);

    var numarray = avgHoursWeekly().toString().split('.');
    // console.log(numarray[0] + "h " + numarray[1].substr(1, 2) + " min");
    // console.log(avgHoursWeekly());
    //console.log(avgHoursWeekly(day1, day2, day3, day4, day5));

    //ako je vreme manje od 1h, prikazi samo minute
    if (numarray[0] == 0)
        document.getElementById('vreme').textContent = numarray[1].substr(1, 2) + " min";
    else
        document.getElementById('vreme').textContent = numarray[0] + "h " + numarray[1].substr(1, 2) + " min";

    document.getElementById('kalorije').textContent = Math.floor(totalCalories());

    // for (i = 0; i < dates.length; i++) {
    //     console.log(dates[i].getDate() + " " + getDayName(dates[i].getDay()));
    // }

    document.getElementById('dan1').textContent = dates[0].getDate() + " " + getDayName(dates[0].getDay());
    document.getElementById('dan2').textContent = dates[1].getDate() + " " + getDayName(dates[1].getDay());
    document.getElementById('dan3').textContent = dates[2].getDate() + " " + getDayName(dates[2].getDay());
    document.getElementById('dan4').textContent = dates[3].getDate() + " " + getDayName(dates[3].getDay());
    document.getElementById('dan5').textContent = dates[4].getDate() + " " + getDayName(dates[4].getDay());


    //console.log();

}

main();


