const { Procedure } = require("../models/procedure.js");
const data = require('./data-procedures.json')


Procedure.deleteMany({})
    .then(() => {
        process.exit()
    })
    .catch((err) => {
        console.log(err)
    })