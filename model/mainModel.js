import fs from 'fs';

const dbPath = "./eventsDB.json";

const mainModel = {
    eventsOfWeek: function(time) {

        // const updatedWeekArray = this.getEvents().filter((event) => event.time >= firstDateOfWeek && event.time >= lastDateOfWeek)

        let updatedWeekArray = this.getEvents().filter((event) => event.time)
        console.log('updatedweekarray', updatedWeekArray)
        return updatedWeekArray
    },
    getEvents: function () {
        let events = JSON.parse(fs.readFileSync(dbPath, "utf-8"))
        return events

    },
    getEvent: function (id) {
        return this.getEvents().find((event) => event.id === id);
      },
    weekArray: function () {
        let array = []
        for (let index = 0; index < 7; index++) {
            let monday = this.setToMonday(new Date);
            monday.setDate(monday.getDate() + index);
            array.push(monday)
        }
        return array

    },
    // getFilteredEvents: function () {
    //     //todays date with same format as html form dates
    //     const events = this.getEvents()
    //     let anotherDate = new Date
    //     anotherDate = anotherDate.toLocaleDateString()

    //     const filteredObjects = events.filter(function (event) {
    //         if (event.time == anotherDate) {
    //             return event
    //         }
    //     })
       
    //     return filteredObjects
    // },
    setToMonday: function (date) {
        let day = date.getDay() || 7;
        // day = day - 1
        if (day !== 1)
            date.setHours(-24 * (day - 1));
        // console.log('monday of this week', date)

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

        // console.log('function addEvent in model')

        return true;
    },
    addSevenDays: function (days) {
        
        let date2 = new Date;
        date2.setDate(date2.getDate() - days);
        return date2
    },
    removeSevenDays: function (date) {
        date.setDate(date.getDate() - 7);
        date = date.toLocaleDateString()
        return date
    },
    removeEvent: function (id) {
        // Get all quotes
        const allEvents = this.getEvents();
    
        // if quotes are not defined we return false
        // to signal that something went wrong
        // if (!allQuotes) {
        //   return false;
        // }
    
        // Remove quote specified by id
        const filteredEvents = allEvents.filter((event) => event.id !== id);
    
        // Write new state to db
        this.saveEvent(filteredEvents);
    
        return true;
      },
      updateEvent: function (id, newTitle, newTime) {
        // Get all quotes
        const allEvents = this.getEvents();
    
        // if quotes are not defined we return false
        // to signal that something went wrong
        if (!allEvents) {
          return false;
        }
    
        // Update quote specified by id
        const idx = allEvents.findIndex((event) => event.id === id);
    
        if (idx < 0) {
          return false;
        }
    
        allEvents[idx].title = newTitle;
        allEvents[idx].time = newTime;
    
        // Write new state to db
        this.saveEvent(allEvents);
    
        return true;
      }
}


export default mainModel