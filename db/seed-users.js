const mongoose = require('../models/User')
const User = mongoose.model('User')
const data = require('./data-procedures.json')


User.deleteMany({})
    .then(() => {
        process.exit()
    })
    .catch((err) => {
        console.log(err)
    })