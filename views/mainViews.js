import mainModel from "../model/mainModel.js"

export default {
    allEvents: (events) => {
        events = mainModel.getEvents()
        console.log('function allEvents in views', events)

        // events.map(event => ` ${event.dateTime}: '${event.title}'`).join('\n')
    }
}


