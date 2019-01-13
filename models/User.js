const mongoose = require('../db/connection')

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    userProcedures: [{
        type: Schema.Types.ObjectId,
        ref: 'Procedure'
    }]
})

mongoose.model('User', UserSchema)

module.exports = mongoose