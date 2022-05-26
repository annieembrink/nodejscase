const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const yearElement = document.getElementById('yearElement')
const monthElement = document.getElementById('monthElement')
const ulDate = document.querySelectorAll('#dateOfWeek li');
const testWeek = document.querySelectorAll('#testWeek li');
let currentArr = []
const submitButton = document.getElementById('addEvent')
let eventEl = document.getElementById('event')
let timeEl = document.getElementById('time')
const containerTag = document.querySelector(".eventContainer")
const iconNav = document.getElementById("menu")
const links = document.getElementById("links")
const flex = document.getElementById("flex")
const startIcon = document.getElementById("startIcon")

iconNav.addEventListener('click', function (e) {
    console.log('hello')
    links.style.display = 'flex'
    startIcon.style.display = 'none'  
})

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
function setToMonday(date) {
    let day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    return date;
};

//WORKING
function createWeek() {
    for (let index = 0; index < 7; index++) {
        let week = setToMonday(new Date).addDays(index)
        currentArr.push(week)
    };
};

//WORKING
function currentMonth(currentArr) {
    // console.log('currentMonthFunc', currentArr[0])
    let month = currentArr[0]
    monthElement.textContent = month.getMonth();
    monthToString(month)
};
currentMonth(currentArr)

//Working
function currentYear(currentArr) {
    // console.log('currentYearFunc', currentArr[0])
    let year = currentArr[0]
    yearElement.textContent = year.getFullYear();
};
currentYear(currentArr)

//Updates the view - the li list, and makes textContent the dates of the week
//WORKING
function updateDates(arr) {
    for (let index = 0; index < ulDate.length; index++) {
        const liDate = ulDate[index];
        liDate.textContent = arr[index].getDate();
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

//Checks if classList 'activeDate' exists in list
function checkClasslist() {
    ulDate.forEach(date => {
        if (date.classList.contains('activeDate')) {
            date.classList.remove('activeDate')
        };
    });
};

//EVENTLISTENERS

document.getElementById('leftArrow').addEventListener('click', function (e) {

    containerTag.innerHTML = ""
    e.preventDefault()
    checkClasslist()
    updateWeekOnLeftClick()
    currentMonth(currentArr)
    currentYear(currentArr)
    updateDates(currentArr)
    eventsOfWeek()
});

document.getElementById('rightArrow').addEventListener('click', function (e) {

    containerTag.innerHTML = ""
    e.preventDefault()
    checkClasslist()
    updateWeekOnRightClick()
    currentMonth(currentArr)
    currentYear(currentArr)
    updateDates(currentArr)
    eventsOfWeek()
});

// Click event for li-element
for (let index = 0; index < ulDate.length; index++) {
    const date = ulDate[index];

    date.addEventListener('click', function (e) {
        e.preventDefault()
        checkClasslist()
        e.target.classList.add('activeDate')

    });
};

submitButton.addEventListener('click', function (e) {
 
    eventEl.style.display = "block"
    timeEl.style.display = "block"
    submitButton.value = '✓'
  
})

eventsOfWeek(time)

async function eventsOfWeek(time) {
    let response = await fetch(`/events/${time}`, {
        method: "get"
    });
    let responseData = await response.json();
    renderEvents(responseData.events)
}

function renderEvents(events) {

    currentArr.forEach(date => {
        date = date.toLocaleDateString()
        events.forEach(event => {
            if (event.time === date) {
                createElement(event)
            }

        });
    });
}

function createElement(event) {

    let divTag = document.createElement('div')
    divTag.className = "card"

    let pTag1 = document.createElement('p')
    pTag1.className = "event-title"
    pTag1.textContent = event.title

    let pTag2 = document.createElement('p')
    pTag2.className = "event-time"
    pTag2.textContent = event.time

    let buttonTag1 = document.createElement('button')
    buttonTag1.className = "edit-button"
    buttonTag1.dataset.id = event.id
    buttonTag1.innerText = "Edit"

    let buttonTag2 = document.createElement('button')
    buttonTag2.className = "delete-button"
    buttonTag2.innerText = "Delete"
    buttonTag2.dataset.id = event.id
    
    containerTag.appendChild(divTag)
    divTag.appendChild(pTag1)
    divTag.appendChild(pTag2)
    divTag.appendChild(buttonTag1)
    divTag.appendChild(buttonTag2)

    document
    .querySelectorAll(".edit-button")
    .forEach((btn) => (btn.onclick = handleEdit));

    document
    .querySelectorAll(".delete-button")
    .forEach((btn) => (btn.onclick = handleDelete));
}


async function handleDelete(evt) {
    
    const id = Number(evt.target.dataset.id)
    console.log("HandleDelete was called with id", id);
    
    const response = await fetch(`/events/${id}`, {
        method: "delete"
    });

    // if (response.redirected) {
    //     window.location.href = response.url; // '/'
    // }
    console.log(response)

    if(response.ok) {
        const eventContainer = evt.target.parentElement;
        eventContainer.remove()
    }
}

//SEEM TO WORK OK
async function handleEdit(evt) {
    console.log('handleEdit was called')
    const id = Number(evt.target.dataset.id); // data-id -> dataset.id
    const container = evt.target.parentElement;
    console.log('container', container)
    const titleEl = container.querySelector(".event-title");
    const dateEl = container.querySelector(".event-time");
    console.log(titleEl, dateEl);

    // if not editable make them editable
    if (!titleEl.isContentEditable && !dateEl.isContentEditable) {
        titleEl.contentEditable = true;
        dateEl.contentEditable = true;

        // clicking the same button should save the changes
        evt.target.innerText = "Save";
    } else {
        // Second time clicked it should save changes
        // reset element to be non editable
        titleEl.contentEditable = false;
        dateEl.contentEditable = false;
        evt.target.innerText = "Edit";
        
        // Look at values of authorEl and quoteEl and submit new quote
        const newEvent = {
            title: titleEl.innerText,
            time: dateEl.innerText,
        };
        const response = await fetch(`/events/${id}`, {
            method: "put",
            body: JSON.stringify(newEvent),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check if there is a redirect to follow the new url

        // if (response.redirected) {
        //     window.location.href = response.url;
        // }
    }
}


