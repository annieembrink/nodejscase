import fs from 'fs';

const dbPath = "./eventsDB.json";

const mainModel = {
    getEvents: function () {
        const events = JSON.parse(fs.readFileSync(dbPath, "utf-8"))
        return events

    },
    weekArray: function () {
        let array = []
        for (let index = 0; index < 7; index++) {
            let monday = this.setToMonday(new Date);
            monday.setDate(monday.getDate() + index);
            // let monday2 = monday.toLocaleDateString()
            console.log(monday, array)
            array.push(monday)
        }
        return array

    },
    getFilteredEvents: function () {
        //todays date with same format as html form dates
        const events = this.getEvents()
        let anotherDate = new Date
        anotherDate = anotherDate.toLocaleDateString()

        const filteredObjects = events.filter(function (event) {
            if (event.time == anotherDate) {
                return event
            }
        })
       
       
        return filteredObjects
    },
    setToMonday: function (date) {
        let day = date.getDay() || 7;
        // day = day - 1
        if (day !== 1)
            date.setHours(-24 * (day - 1));
        console.log('monday of this week', date)

        // date = date.toLocaleDateString()

        return date;
    },
    saveEvent: function (event) {
        // console.log('function saveEvent in model')
        return fs.writeFileSync(dbPath, JSON.stringify(event));
    },
    addEvent: function (title, time) {
        // const allEvents = this.getEvents();
        const allEvents = this.getEvents()

        const lastEvent = allEvents[allEvents.length - 1];
        const newId = (lastEvent?.id || 0) + 1;

        const newEvent = {
            id: newId,
            title,
            time
        }

        allEvents.push(newEvent);
        this.saveEvent(allEvents);

        console.log('function addEvent in model')

        return true;
    },
    addSevenDays: function (days) {
        
        let date2 = new Date;
        date2.setDate(date2.getDate() - days);

        // date.setDate(date.getDate() + 7);
        // date = date.toLocaleDateString()
        // console.log('added seven days', date)
        return date2
    },
    removeSevenDays: function (date) {
        date.setDate(date.getDate() - 7);
        date = date.toLocaleDateString()
        console.log('removed seven days', date)
        return date
    }
}


export default mainModel