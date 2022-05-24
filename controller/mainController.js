import mainModel from "../model/mainModel.js";

export default {
    eventsOfWeek: function(req, res) {
        let time = req.params.time;
        res.json({events: mainModel.eventsOfWeek(time)})
    }, 
    calenderC: function (req, res) {
        console.log('test')
        res.render("calender")
    },
    createEvent: (req, res) => {
        const title = req.body.event.title;
        const time = req.body.event.time;
        console.log(title, time);
        const isOK = mainModel.addEvent(title, time);

        res.redirect('/events');

    },
    getAllEvents: (req, res) => {
        res.render("events", {
            events: mainModel.getEvents(),
            dates: mainModel.setToMonday(new Date),
            theWeek: mainModel.weekArray(),
            events2: mainModel.eventsOfWeek()
        })

    },
    getAllFilteredEvents: (req, res) => {
        console.log('what is this?')
        res.render("calender")
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
            console.log("event not Updated");
            return;
        }

        console.log("Event Updated");

        res.redirect('/');
    }
}