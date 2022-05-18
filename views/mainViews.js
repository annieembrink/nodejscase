import mainModel from "../model/mainModel.js"

export default {
    allEvents: (events) => {
        events = mainModel.getEvents()
        console.log('function allEvents in views', events)

        // events.map(event => ` ${event.dateTime}: '${event.title}'`).join('\n')
    }
}

// export default {
//     allEvents: (events) => events.map(event => ` ${event.dateTime}: '${event.title}'`).join('\n')

//     

//     // console.log('log of events (func allEvents) in views', events)
//     // events.map(event => {
//     //     (` ${event.dateTime}: '${event.title}'`).join('\n')
//     //     const pTAG = document.createElement('p')
//     //     pTAG.textContent = event.title
//     //     resultDiv.appendChild(pTAG)
//     // })

//     // console.log(event.title)


// }