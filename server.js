import express from 'express';
import ejs from 'ejs';
import mainController from "./controller/mainController.js";
import mainViews from './views/mainViews.js';
import mainModel from './model/mainModel.js';


// "app" environment
// -------------------------
const app = express();

// variables
// -------------------------
const port = 3000;

// set template engine to ejs
// -------------------------
app.set('view engine', 'ejs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/', function (request, response) {
    console.log(request.body.event.title);
    console.log(request.body.event.time);
    console.log('this is app.post in server.js')
});

// middleware (use param next...)
// -------------------------
// ...

// handle requests
// -------------------------
// serve static files
// -------------------------
app.use(express.static('public'));

// route request
// -------------------------
app.get('/', (req, res) => {
    res.render('calender');
});

app.get('/newactivity', (req, res) => {
    res.render('newactivity');
});

app.get('/events', (req, res) => {
    res.render('events');
});

// 404 not found
// -------------------------
app.get('*', (req, res, next) => {
    res.render('404');
});
app.get('/events', mainController.getAllEvents);

app.post('/events', mainController.createEvent);
// app.post('/newactivity', (req, res) => {
//     mainController.createEvent()
//     res.redirect('/calender')
// })

// handle errors
// -------------------------

// server error 500...
// -------------------------
app.use((err, req, res, next) => {

    // show response
    return res.status(500).send("Server error, please return later");
});

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});