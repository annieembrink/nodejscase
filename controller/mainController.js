import { response } from "express";
import mainModel from "../model/mainModel.js";

export default {
    eventsOfWeek: function(req, res) {
        let time = req.params.time;
        res.json({events: mainModel.eventsOfWeek(time)})
    }, 
    calenderC: function (req, res) {
        res.render("startpage")
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
        console.log('remove event was called with params', req.params)
        const id = Number(req.params.id);
        const eventToBeRemoved = mainModel.getEvent(id);
        const isOK = mainModel.removeEvent(eventToBeRemoved.id);
        if (!isOK) {
            console.log('event not removed');
        return res.json({success:false})
        }

        // res.redirect('/');
        return res.json({success:true})
    },
    updateEvent: (req, res) => {
        console.log('update event was called with params', req.params)
        const id = Number(req.params.id);
        const title = req.body.title;
        const time = req.body.time;
        const isOK = mainModel.updateEvent(id, title, time);

        if (!isOK) {
            console.log("event not Updated");
            // return;
            return res.json({success:false});
        }
        // res.redirect('/');
        return res.json({success:true})
    }
};