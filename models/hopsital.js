const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Procedure = new Schema({
    name_of_procedure: String,
    cost: Number,
    insurance_provider: String,
    date_of_procedure: String,
});

const Hospital = new Schema({
    name: String,
    address: String,
    long: Number,
    lat: Number,
    procedures: [Procedure],
});

module.exports = {
    Hospital: mongoose.model("Hospital", Hospital),
    Procedure: mongoose.model("Procedure", Procedure)
};