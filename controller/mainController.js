import mainModel from "../model/mainModel.js";

export default {
    eventsOfWeek: function(req, res) {
        let time = req.params.time;
        res.json({events: mainModel.eventsOfWeek(time)})
    }, 
    calenderC: function (req, res) {
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
            console.log("event not Updated");
            return;
        }
        res.redirect('/');
    }
};