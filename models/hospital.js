const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

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

// Hospital.methods.avgPriceMethod = function avgPriceMethod() {
//     var stuff = 1;
//     return stuff
// }

Hospital.methods.avgPriceMethod = function (hospitalProcedurePriceArray, procedureForAvg) {
    console.log(hospitalProcedurePriceArray)
    var sum = 0
    var avg = 0
    for (var i = 0; i < hospitalProcedurePriceArray.length; i++) {
        sum += hospitalProcedurePriceArray[i];
    }
    if (procedureForAvg === "appendectomy_cost") {
        avg = (sum / this.appendectomy_cost.length).toFixed(2)
    } else if (procedureForAvg === "breast_biopsy_cost") {
        avg = (sum / this.breast_biopsy_cost.length).toFixed(2)
    } else if (procedureForAvg === "carotid_endarterectomy_cost") {
        avg = (sum / this.carotid_endarterectomy_cost.length).toFixed(2)
    } else if (procedureForAvg === "cataract_surgery_cost") {
        avg = (sum / this.cataract_surgery_cost.length).toFixed(2)
    } else if (procedureForAvg === "cesarean_section_cost") {
        avg = (sum / this.cesarean_section_cost.length).toFixed(2)
    } else if (procedureForAvg === "coronary_artery_bypass_cost") {
        avg = (sum / this.coronary_artery_bypass_cost.length).toFixed(2)
    } else if (procedureForAvg === "debridement_of_wound_cost") {
        avg = (sum / this.debridement_of_wound_cost.length).toFixed(2)
    } else if (procedureForAvg === "free_skin_graft_cost") {
        avg = (sum / this.free_skin_graft_cost.length).toFixed(2)
    } else if (procedureForAvg === "spinal_fusion_cost") {
        avg = (sum / this.spinal_fusion_cost.length).toFixed(2)
    } else if (procedureForAvg === "total_hip_replacement_cost") {
        avg = (sum / this.total_hip_replacement_cost.length).toFixed(2)
    }

    console.log(avg)

    return avg

}

module.exports = {
    Hospital: mongoose.model("Hospital", Hospital),
    Procedure: mongoose.model("Procedure", Procedure)
};