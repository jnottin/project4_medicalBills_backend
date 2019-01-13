const { Hospital, Procedure } = require("../models/hospital.js");
const data = require('./data.json')


Hospital.deleteMany({})
    .then(() => {
        Hospital.collection.insertMany(data)
            .then((hospitals) => {
                console.log(hospitals)
                process.exit()
            })
    })
    .catch((err) => {
        console.log(err)
    })