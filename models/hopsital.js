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
    lng: Number,
    lat: Number,
    cost: Number,
    appendectomy_cost: [Number],
    breast_biopsy_cost: [Number],
    carotid_endarterectomy_cost: [Number],
    cataract_surgery_cost: [Number],
    cesarean_section_cost: [Number],
    coronary_artery_bypass_cost: [Number],
    debridement_of_wound_cost: [Number],
    free_skin_graft_cost: [Number],
    spinal_fusion_cost: [Number],
    total_hip_replacement_cost: [Number],
});

module.exports = {
    Hospital: mongoose.model("Hospital", Hospital),
    Procedure: mongoose.model("Procedure", Procedure)
};