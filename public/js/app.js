//Just a few variables
let dateObj = new Date();
let dateDate = dateObj.getDate();
let dateMonth = dateObj.getMonth();
let dateYear = dateObj.getFullYear();
let dateDay = dateObj.getDay();


const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
document.getElementById('yearElement').textContent = dateYear;
const monthElement = document.getElementById('monthElement')
const ulWeekdays = document.querySelectorAll('#weekdays li');
const ulDate = document.querySelectorAll('#dateOfWeek li');
let currentArr = []

//######################
//Get monday of this week
//copied from internet
function setToMonday(date) {
    let day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    monthElement.textContent = date.getMonth()
    return date;
};

//Copy-pasted this function
//Counts days ahead from the actual day
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

let date = new Date();

//COUNTS DAYS BACKWARDS
//WORKING
Date.prototype.subDays = function (days) {
    let date2 = new Date(this.valueOf());
    date2.setDate(date2.getDate() - days);
    return date2;
};

let date2 = new Date();

//WORKING - KEEP
function createWeek() {
    for (let index = 0; index < 7; index++) {
        let week = setToMonday(dateObj).addDays(index)
        currentArr.push(week)
    };
};

createWeek()

const months = [{
    month: 'Jan',
    days: 31
}, {
    month: 'Feb',
    days: 28
}, {
    month: 'Mar',
    days: 31
}, {
    month: 'Apr',
    days: 30
}, {
    month: 'May',
    days: 31
}, {
    month: 'Jun',
    days: 30
}, {
    month: 'Jul',
    days: 31
}, {
    month: 'Aug',
    days: 31
}, {
    month: 'Sept',
    days: 30
}, {
    month: 'Okt',
    days: 31
}, {
    month: 'Nov',
    days: 30
}, {
    month: 'Dec',
    days: 31
}]

//TODAYS DATE IS
//This is the day
for (let index = 0; index < ulWeekdays.length; index++) {
    const liWeekday = ulWeekdays[index];

    liWeekday.classList = index + 1;

    if (liWeekday.classList == dateDay) {

        //This is the day translated from number to string. (1 is monday, 3 wednesday...)
        for (let index = 0; index < weekdays.length; index++) {
            let day = weekdays[index];
            day = index + 1;

            if (day === dateDay) {
                console.log(weekdays[index], dateDate);
            };
        };
    };
};


//This is the month translated from number to string (ex 5 is may, 7 is july)
for (let index = 0; index < months.length; index++) {
    let month = months[index];
    // console.log(months[index])
    if (month === dateMonth) {
        document.getElementById('monthElement').textContent = months.month[index];
    };
};

//FUNCTIONS
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