const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Hospital = new Schema({
    name: String,
    address: String,
    lng: Number,
    lat: Number,
    totalHospitalprocedures: [{
        type: Schema.Types.ObjectId,
        ref: 'Procedure'
    }],
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
    avg_appendectomy_cost: Number,
    avg_breast_biopsy_cost: Number,
    avg_carotid_endarterectomy_cost: Number,
    avg_cataract_surgery_cost: Number,
    avg_cesarean_section_cost: Number,
    avg_coronary_artery_bypass_cost: Number,
    avg_debridement_of_wound_cost: Number,
    avg_free_skin_graft_cost: Number,
    avg_spinal_fusion_cost: Number,
    avg_total_hip_replacement_cost: Number,
});

Hospital.methods.avgPriceMethod = function (hospitalProcedurePriceArray) {
    var sum = 0
    for (var i = 0; i < hospitalProcedurePriceArray.length; i++) {
        sum += hospitalProcedurePriceArray[i];
        var avg = (sum / hospitalProcedurePriceArray.length).toFixed(2)
    }
    return avg

}

module.exports = {
    Hospital: mongoose.model("Hospital", Hospital)
};