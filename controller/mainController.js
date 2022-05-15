import readline from 'readline';
import express from 'express';
import mainModel from "../models/mainModel.js";
import mainViews from "../views/mainViews.js";

export default {
    createEvent: (req, res) => {
        const event = req.body.event;
        const time = req.body.author;

        res.render("events", {events: mainModel.getEvents()});
    }
}
