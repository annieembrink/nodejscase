import mainModel from "../model/mainModel.js";
import mainViews from "../views/mainViews.js";

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
    }
}


 // res.render("404", {
        //     events: mainModel.getEvents(),
        //     dates: mainModel.setToMonday(new Date),
        //     filteredEvents: mainModel.getFilteredEvents()
        // });

    // console.log('filtered events')
        // this.testFunction()
        // res.render("events", {
        //     filteredEvents: mainModel.getFilteredEvents()
        // });

        // const startDate = req.query.start;
        // const endDate = req.query.end;

        // console.log("getAllQuotes Was called with query", req.query)