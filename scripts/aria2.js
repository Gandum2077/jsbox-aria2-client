const Aria2 = require("aria2")

const query = $context.query
const aria2 = new Aria2(query.options)
const params = query.params || []

aria2.call(query.method, ...params)
    .then(n => {
        $jsbox.notify("eventId", {
            response: n
        })
    })
    .catch(err => {
        $jsbox.notify("eventId", {
            error: err
        })
    })