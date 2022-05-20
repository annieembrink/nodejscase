import readline from 'readline';
import express from 'express';
import mainModel from "../model/mainModel.js";
import mainViews from "../views/mainViews.js";

export default {
    createEvent: (req, res) => {
     
        const title = req.body.event.title;

        //Want time to be date of the day
        const time = req.body.event.time;

        console.log(title, time);
        
        const isOK = mainModel.addEvent(title, time);

        // console.log(mainModel.getEvents())
        // console.log(mainViews.allEvents(mainModel.getEvents()))
        // mainViews.allEvents()
        res.redirect('/events');

        console.log('function createEvent in controller')
    },
    getAllEvents: (req, res) => {
        console.log('function getAllEvents in controller')
        res.render("events", { events: mainModel.getEvents() });
        // res.render("events", { events: mainModel.getEventsByWeek(mainModel.getEvents) });
    },
}


// localhost:300/?start=2022-05-22&end=2022-05-29
// req.query.start
// req.query.end
// res.render("events"...
// res.json({events: eventModel.getEvents()})
