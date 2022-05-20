import fs from 'fs';

const dbPath = "./eventsDB.json";

const mainModel = {
    getEvents: function () {
        // console.log('function getEvents in model')
        const events = JSON.parse(fs.readFileSync(dbPath, "utf-8"))
        
        //todays date with same format as html form dates
        let anotherDate = new Date
        anotherDate = anotherDate.toLocaleDateString()

        const filteredObjects = events.filter(function(event) {
            if (event.time == anotherDate) {
                return event
            }
        })
        this.addSevenDays(new Date)
        this.removeSevenDays(new Date)

        return filteredObjects
    },
    setToMonday: function (date) {
        let day = date.getDay() || 7;
        day = day - 1
        if (day !== 1)
            date.setHours(-24 * (day - 1));
        return date;
    },
    saveEvent: function (event) {
        // console.log('function saveEvent in model')
        return fs.writeFileSync(dbPath, JSON.stringify(event));
    },
    addEvent: function (title, time) {
        const allEvents = this.getEvents();

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
    addSevenDays: function (date) {
        date.setDate(date.getDate() + 7);
        console.log(date)
    },
    removeSevenDays: function (date) {
        date.setDate(date.getDate() - 7);
        date = date.toLocaleDateString()
        console.log(date)
    }
}


export default mainModel