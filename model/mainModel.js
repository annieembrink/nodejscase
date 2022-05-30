import fs from 'fs';

const dbPath = "./eventsDB.json";

const mainModel = {
    eventsOfWeek: function(time) {
        let updatedWeekArray = this.getEvents()
        return updatedWeekArray
    },
    getEvents: function () {
        let events = JSON.parse(fs.readFileSync(dbPath, "utf-8"))
        return events
    },
    getEvent: function (id) {
        return this.getEvents().find((event) => event.id === id);
      },
    saveEvent: function (event) {
      
        return fs.writeFileSync(dbPath, JSON.stringify(event));
    },
    addEvent: function (title, time) {
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

        return true;
    },
    removeEvent: function (id) {
        const allEvents = this.getEvents();
        const filteredEvents = allEvents.filter((event) => event.id !== id);
        this.saveEvent(filteredEvents);
    
        return true;
      },
      updateEvent: function (id, newTitle, newTime) {
        const allEvents = this.getEvents();
    
        if (!allEvents) {
          return false;
        }
    
        const idx = allEvents.findIndex((event) => event.id === id);
    
        if (idx < 0) {
          return false;
        }
    
        allEvents[idx].title = newTitle;
        allEvents[idx].time = newTime;
    
        this.saveEvent(allEvents);
    
        return true;
      }
};


export default mainModel