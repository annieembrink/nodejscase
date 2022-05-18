import fs from 'fs';
const dbPath = "./eventsDB.json";



const mainModel = {
    getEvents: function () {
        console.log('function getEvents in model')
        return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    },

    saveEvent: function (event) {
        console.log('function saveEvent in model')
        return fs.writeFileSync(dbPath, JSON.stringify(event));
    },
    addEvent: function (title, time) {
        const allEvents = this.getEvents();

        const lastEvent = allEvents[allEvents.length - 1];
        const newId = (lastEvent?.id || 0) + 1;

        const newEvent = {id: newId, title, time}

        allEvents.push(newEvent);
        this.saveEvent(allEvents);

        console.log('function addEvent in model')

        return true;
    }
}

export default mainModel