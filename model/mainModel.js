import fs from 'fs';
const dbPath = "./eventsDB.json";

const mainModel = {
    getEvents: function () {
        return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    },

    saveEvent: function (event) {
        return fs.writeFileSync(dbPath, JSON.stringify(event));
    },
    addEvent: function (event, time) {
        const allEvents = this.getEvents();

        const lastEvent = allEvents[allEvents.length - 1];
        const newId = (lastEvent?.id || 0) + 1;

        const newEvent = {id: newId, event, time}

        allEvents.push(newEvent);
        this.saveEvent(allEvents);

        return true;
    }
}

export default mainModel