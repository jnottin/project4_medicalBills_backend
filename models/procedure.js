const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Procedure = new Schema({
    name_of_procedure: String,
    hospital_name: String,
    hospital_address: String,
    cost: Number,
    date_of_procedure: String,
});

module.exports = {
    Procedure: mongoose.model("Procedure", Procedure)
};