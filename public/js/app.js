//Just a few variables
let dateObj = new Date();
let dateDate = dateObj.getDate();
let dateMonth = dateObj.getMonth();
let dateYear = dateObj.getFullYear();
let dateDay = dateObj.getDay();

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
document.getElementById('yearElement').textContent = dateYear;
const monthElement = document.getElementById('monthElement')
const ulWeekdays = document.querySelectorAll('#weekdays li');
const ulDate = document.querySelectorAll('#dateOfWeek li');
let currentArr = []

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

//This is the month translated from number to string (ex 5 is may, 7 is july)
function monthToString() {
    for (let index = 0; index < months.length; index++) {
        let month = months[index];
        // console.log(months[index])
        if (month === dateMonth) {
            document.getElementById('monthElement').textContent = months.month[index];
        };
    };
};

//Get monday of this week
//copied from internet
function setToMonday(date) {
    let day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    // monthElement.textContent = date.getMonth()
    return date;
};

function createWeek() {
    for (let index = 0; index < 7; index++) {
        let week = setToMonday(dateObj).addDays(index)
        currentArr.push(week)
    };
};

//Updates the view - the li list, and makes textContent the dates of the week
function updateDates(arr) {
    for (let index = 0; index < ulDate.length; index++) {

        const liDate = ulDate[index];

        liDate.textContent = arr[index].getDate();

        // liDate.classList = index + 1;

        // if (liDate.classList == dateDay) {

        //     liDate.textContent = dateDate;
        //     liDate.classList.add("activeDate")
        // };
    };
    console.log(arr)
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

//EVENTLISTENERS
document.getElementById('leftArrow').addEventListener('click', function (e) {
    console.log('left arrow clicked')
    updateWeekOnLeftClick()
    updateDates(currentArr)
});
document.getElementById('rightArrow').addEventListener('click', function (e) {
    console.log('right arrow clicked')
    updateWeekOnRightClick()
    updateDates(currentArr)
});


//PUT IN VIEWS
// export default {
//     allEvents: (events) =>
//         events.map(event => ` ${event.dateTime}: '${event.title}'`).join('\n')
// }