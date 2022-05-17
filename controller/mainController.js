import readline from 'readline';
import express from 'express';
import mainModel from "../model/mainModel.js";
import mainViews from "../views/mainViews.js";

export default {
    createEvent: (req, res) => {
     
        const title = req.body.event.title;

        const time = req.body.event.time;

        console.log(title, time);
        
        const isOK = mainModel.addEvent(title, time);

        console.log('the function create event in contact')
    },
    getAllEvents: (req, res) => {
        res.render("events", { events: mainModel.getEvents() });
    },
}
