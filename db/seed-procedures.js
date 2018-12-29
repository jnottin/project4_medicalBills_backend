const { Hospital, Procedure } = require("../models/hopsital.js");
const data = require('./data-procedures.json')


Procedure.deleteMany({})
    .then(() => {
        Procedure.collection.insertMany(data)
            .then((procedures) => {
                console.log(procedures)
                process.exit()
            })
    })
    .catch((err) => {
        console.log(err)
    })