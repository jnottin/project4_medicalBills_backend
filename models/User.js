const mongoose = require('../db/connection')

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    userHospitals: [{
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }]
})

mongoose.model('User', UserSchema)

module.exports = mongoose