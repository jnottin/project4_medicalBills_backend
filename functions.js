const config = require('./config/config')
const jwt = require('jwt-simple')

module.exports = {
    getIdFromToken: function (req) {
        if (req.headers && req.headers.authorization) {
            var userToken = req.headers.authorization.split(' ')[1]
        } else if (req.body.headers && req.body.headers.authorization) {
            var userToken = req.body.headers.authorization.split(' ')[1]
        }
        try {
            var decoded = jwt.decode(userToken, config.jwtSecret);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        return userId
    },
    getProcedureName: function (procedureName) {
        procedureTextNamesList = {
            appendectomy_cost: 'Appendectomy',
            breast_biopsy_cost: 'Breast Biopsy',
            carotid_endarterectomy_cost: 'Carotid Endarterectomy',
            cataract_surgery_cost: 'Cataract Surgery',
            cesarean_section_cost: 'Cesarean Section',
            coronary_artery_bypass_cost: 'Coronary Artery Bypass',
            debridement_of_wound_cost: 'Debridement of Wound',
            free_skin_graft_cost: 'Free Skin Graft',
            spinal_fusion_cost: 'Spinal Fusion',
            total_hip_replacement_cost: 'Total Hip Replacement',
        }
        var procedureTextName = procedureTextNamesList[procedureName]
        return procedureTextName
    }
}

// module.exports = function getProcedureName(procedureName) {
//     procedureTextNamesList = {
//         appendectomy_cost: 'Appendectomy',
//         breast_biopsy_cost: 'Breast Biopsy',
//         carotid_endarterectomy_cost: 'Carotid Endarterectomy',
//         cataract_surgery_cost: 'Cataract Surgery',
//         cesarean_section_cost: 'Cesarean Section',
//         coronary_artery_bypass_cost: 'Coronary Artery Bypass',
//         debridement_of_wound_cost: 'Debridement of Wound',
//         free_skin_graft_cost: 'Free Skin Graft',
//         spinal_fusion_cost: 'Spinal Fusion',
//         total_hip_replacement_cost: 'Total Hip Replacement',
//     }
//     var procedureTextName = procedureTextNamesList[procedureName]
//     return procedureTextName
// }