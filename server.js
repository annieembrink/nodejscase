import mainController from "./controller/mainController.js";
import ejs from 'ejs';
import express from "express";
import mainModel from "./model/mainModel.js";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', mainController.getAllEvents);
app.get('/events', mainController.getAllEvents)
app.get('/startpage', mainController.calenderC)
app.get('/events/:time', mainController.eventsOfWeek)

app.post('/events', mainController.createEvent);

app.put('/events/:id', mainController.updateEvent);

app.delete('/events/:id', mainController.removeEvent);

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
})
