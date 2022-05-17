import readline from 'readline';
import express from 'express';
import mainModel from "../model/mainModel.js";
import mainViews from "../views/mainViews.js";

export default {
    createEvent: (req, res) => {
        // const events = req.body.title;
        // console.log(events)
        // res.render('events', {events: mainModel.getEvents()});
        // mainViews.allEvents()
        console.log('the function create event')
    }
}
