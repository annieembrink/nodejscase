
export default {
    allEvents: (events) => {
        console.log('function allEvents in views')
        events.map(event => ` ${event.dateTime}: '${event.title}'`).join('\n')
    }
        
}