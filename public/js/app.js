//Just a few variables
let dateObj = new Date();
let dateDate = dateObj.getDate();
let dateMonth = dateObj.getMonth();
let dateYear = dateObj.getFullYear();
let dateDay = dateObj.getDay();

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December']
document.getElementById('yearElement').textContent = dateYear;
const monthElement = document.getElementById('monthElement')
const ulWeekdays = document.querySelectorAll('#weekdays li');
const ulDate = document.querySelectorAll('#dateOfWeek li');
let currentArr = []
const resultDiv = document.getElementById('result')

fetch('/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        event: {
            title: document.getElementById('event').value,
            time: 'just a string named time'
        }
    })
});

//Copy-pasted this function
//Counts days ahead from the actual day
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

//COUNTS DAYS BACKWARDS
Date.prototype.subDays = function (days) {
    let date2 = new Date(this.valueOf());
    date2.setDate(date2.getDate() - days);
    return date2;
};

createWeek()

//FUNCTIONS
//result/events

//This is the month translated from number to string (ex 5 is may, 7 is july)
//WORKING
function monthToString(currentMonth) {
    for (let index = 0; index < months.length; index++) {
        let month = months[index]
        if (index === currentMonth.getMonth()) {
            monthElement.textContent = month;
        };
    };
};

//Get monday of this week
//copied from internet
//CHECK THIS...
function setToMonday(date) {
    let day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    return date;
};

//WORKING
function currentMonth(currentArr) {
    let month = currentArr[0]
    monthElement.textContent = month.getMonth();
    monthToString(month)
};
currentMonth(currentArr)

//WORKING
function createWeek() {
    for (let index = 0; index < 7; index++) {
        let week = setToMonday(dateObj).addDays(index)
        currentArr.push(week)
    };
};

//Updates the view - the li list, and makes textContent the dates of the week
//WORKING
function updateDates(arr) {
    for (let index = 0; index < ulDate.length; index++) {
        const liDate = ulDate[index];
        liDate.textContent = arr[index].getDate();
        currentMonth(arr)
    };
    // console.log('this is the array IN the li-elements', arr)
    return arr
};

//Call the function that creates current week with dates
updateDates(currentArr)

//When left arrow is clicked, create new array consisting of seven new dates
function updateWeekOnLeftClick() {
    currentArr.map((weekDay) => {
        let test2 = weekDay.subDays(7)
        currentArr.push(test2)
    });

    if (currentArr.length > 7) {
        currentArr = currentArr.splice(7, 7)
    }
};

//When right arrow is clicked, create new array consisting of seven new dates
function updateWeekOnRightClick() {
    currentArr.map((weekDay) => {
        let test2 = weekDay.addDays(7)
        currentArr.push(test2)
    });

    if (currentArr.length > 7) {
        currentArr = currentArr.splice(7, 7)
    }
};

//Checks if classList 'activeDate' exists in list
function checkClasslist() {
    ulDate.forEach(date => {
        if (date.classList.contains('activeDate')) {
            date.classList.remove('activeDate')
        };
    });
};

//THE CURRENTARR doesnt match with inside of li
//EVENTLISTENERS
document.getElementById('leftArrow').addEventListener('click', function (e) {
    // console.log('THIS IS THE CURRENTARR', currentArr)
    // console.log('left arrow clicked')
    checkClasslist()
    currentMonth(currentArr)
    updateWeekOnLeftClick()
    updateDates(currentArr)
});
document.getElementById('rightArrow').addEventListener('click', function (e) {
    // console.log('THIS IS THE CURRENTARR', currentArr)
    // console.log('right arrow clicked')
    checkClasslist()
    currentMonth(currentArr)
    updateWeekOnRightClick()
    updateDates(currentArr)
});

//Click event for li-element
for (let index = 0; index < ulDate.length; index++) {
    const date = ulDate[index];
    date.addEventListener('click', function (e) {
        checkClasslist()
        e.target.classList.add('activeDate')
    });
};



//PUT IN VIEWS
// export default {
//     allEvents: (events) =>
//         events.map(event => ` ${event.dateTime}: '${event.title}'`).join('\n')
// }