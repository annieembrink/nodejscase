import mainController from "./controller/mainController.js";
import ejs from 'ejs';
import express from "express";
import mainModel from "./model/mainModel.js";

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use('/img', express.static('img'));

app.get('/', mainController.getAllEvents);
app.get('/events', mainController.getAllEvents)
app.get('/calender', mainController.calenderC)
app.get('/events/:time', mainController.eventsOfWeek)

app.post('/events', mainController.createEvent);

app.put('/events/:id', mainController.updateEvent);

app.delete('/events/:id', mainController.removeEvent);

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
})
