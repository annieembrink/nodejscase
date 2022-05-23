import mainModel from "../model/mainModel.js";

export default {
  
    createEvent: (req, res) => {

        const title = req.body.event.title;
        const time = req.body.event.time;
        console.log(title, time);
        const isOK = mainModel.addEvent(title, time);

        res.redirect('/events');

        console.log('function createEvent in controller')
    },
    getAllEvents: (req, res) => {


        res.render("events", {
            events: mainModel.getEvents(),
            dates: mainModel.setToMonday(new Date),
            addedDays: mainModel.addSevenDays(new Date),
            removedDays: mainModel.removeSevenDays(new Date),
            theWeek: mainModel.weekArray()
        })

    },
    getAllFilteredEvents: (req, res) => {
        res.render("events", {
            events: mainModel.getFilteredEvents()
        })
    },
    removeEvent: (req, res) => {
        const id = Number(req.params.id);
        const eventToBeRemoved = mainModel.getEvent(id);
        const isOK = mainModel.removeEvent(eventToBeRemoved.id);
        if (!isOK) {
            console.log('event removed');
            return;
        }

        res.redirect('/');
    },
    updateEvent: (req, res) => {
        const id = Number(req.params.id);
        const title = req.body.title;
        const time = req.body.time;
        
        const isOK = mainModel.updateEvent(id, title, time);

        if (!isOK) {
            console.log("Quote not Updated");
            return;
        }

        console.log("Event Updated");

        res.redirect('/');
    }
}
