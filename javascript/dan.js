var koraci = new Array();
var dates = new Array();
var koraciUkupno = 0;

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
        case 6:
            return "SAT"
            break;
        case 7:
            return "SUN"
            break;
    }
}

function getFullDayName(dayNumber) {
    switch (dayNumber) {
        case 1:
            return "Monday"
            break;
        case 2:
            return "Tuesday"
            break;
        case 3:
            return "Wednesday"
            break;
        case 4:
            return "Thursday"
            break;
        case 5:
            return "Friday"
            break;
        case 6:
            return "Saturday"
            break;
        case 7:
            return "Sunday"
            break;
    }
}

function getMonthName(monthNumber) {
    switch (monthNumber) {
        case 1:
            return "January"
            break;
        case 2:
            return "February"
            break;
        case 3:
            return "March"
            break;
        case 4:
            return "April"
            break;
        case 5:
            return "May"
            break;
        case 6:
            return "June"
            break;
        case 7:
            return "July"
            break;
        case 8:
            return "August"
            break;
        case 9:
            return "September"
            break;
        case 10:
            return "October"
            break;
        case 11:
            return "November"
            break;
        case 12:
            return "December"
            break;
    }
}

function hoursDaily(steps) {
    return ((steps * 0.5) / 60) / 60;
}

function caloriesDaily(steps) {
    return steps * 0.05;
}

function kilometersDaily(steps) {
    return (steps * 0.762) / 1000;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    arr = data;

    for (i = 0; i < arr.length; i++) {
        var temp = new Date(arr[i].timestamp);

        if (!arrayContainsSame(dates, temp))
            dates.push(temp);

    }

    var trenutniDan = 0;
    switch (document.title) {
        case "Dan1":
            trenutniDan = 0;
            break;
        case "Dan2":
            trenutniDan = 1;
            break;
        case "Dan3":
            trenutniDan = 2;
            break;
        case "Dan4":
            trenutniDan = 3;
            break;
        case "Dan5":
            trenutniDan = 4;
            break;
    }

    for (i = 0; i < arr.length; i++) {
        var temp = new Date(arr[i].timestamp);
        var tmp = temp.getDay();
        var steps = arr[i].steps;

        if (tmp == trenutniDan + 1) {
            koraci.push(steps);
        }
    }




    for (i = 0; i < koraci.length; i++) {
        koraciUkupno = koraciUkupno + koraci[i];
    }

    document.getElementById('koraci').textContent = numberWithCommas(koraciUkupno);

    document.getElementById('kalorije').textContent = Math.floor(caloriesDaily(koraciUkupno));

    document.getElementById('km').textContent = kilometersDaily(koraciUkupno).toString().substring(0, 3);

    document.getElementById('hrs').textContent = hoursDaily(koraciUkupno).toString().substring(0, 3);


    document.getElementById('dan1').textContent = dates[0].getDate() + " " + getDayName(dates[0].getDay());
    document.getElementById('dan2').textContent = dates[1].getDate() + " " + getDayName(dates[1].getDay());
    document.getElementById('dan3').textContent = dates[2].getDate() + " " + getDayName(dates[2].getDay());
    document.getElementById('dan4').textContent = dates[3].getDate() + " " + getDayName(dates[3].getDay());
    document.getElementById('dan5').textContent = dates[4].getDate() + " " + getDayName(dates[4].getDay());

    document.getElementById('dan').textContent = getFullDayName(dates[trenutniDan].getDay());
    document.getElementById('datum').textContent = getMonthName(dates[trenutniDan].getMonth()) + " " + dates[trenutniDan].getDate() + ". " + dates[trenutniDan].getFullYear() + ".";


}

main();


