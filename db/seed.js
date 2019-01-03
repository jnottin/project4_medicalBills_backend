const { Hospital, Procedure } = require("../models/other_hospital.js");
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