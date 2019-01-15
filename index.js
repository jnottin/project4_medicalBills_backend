const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const { Hospital } = require("./models/hospital.js");
const { Procedure } = require("./models/procedure.js");
const port = process.env.PORT || 3010;


//User requires
const passport = require('./config/passport')();
const config = require('./config/config')
const functions = require('./functions.js')
const getIdFromToken = functions.getIdFromToken;
const getProcedureName = functions.getProcedureName;
const calcProcedureCosts = functions.calcProcedureCosts
const jwt = require('jwt-simple')
const mongoose = require('./models/User')
const User = mongoose.model('User')

//required for environmental variables on frontend
require('dotenv').config();

const app = express();

app.use(parser.json());
app.use(cors());

app.use(express.static("client/build"));


//User routes
app.use(passport.initialize())

//Edit User medical Bill
app.put("/editMedicalBill/:id", (req, res) => {
    console.log({ _id: req.params.id });
    Procedure.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//Delete User medical Bill
app.delete("/deleteMedicalBill/:id", (req, res) => {
    Procedure.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.status(200).end()
        })
        .catch(err => {
            console.log(err)
        })
});


//Delete User medical Bill
app.delete("/deleteMedicalBill/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    Procedure.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.status(200).end()
        })
        .catch(err => {
            console.log(err)
        })
});

//Show User Bills
app.get('/userProcedures', (req, res) => {
    var userId = getIdFromToken(req)
    console.log(userId)
    User.findOne({ _id: userId }).populate('userProcedures').then(user => {
        console.log(user)
        res.json(user)
    });
});


//Sign up adding new user to database
app.post('/signup', (req, res) => {
    if (req.body.email && req.body.password) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    User.create(newUser)
                        .then(user => {
                            if (user) {
                                var payload = {
                                    id: user._id
                                }
                                console.log(payload)
                                var token = jwt.encode(payload, config.jwtSecret)
                                res.json({
                                    token: token
                                })
                            } else {
                                res.statusMessage = "FIRST Current password does not match";
                                res.sendStatus(401)
                            }
                        })
                } else {
                    res.statusMessage = "SECOND Current password does not match";
                    res.sendStatus(401)
                }
            })
    } else {
        res.statusMessage = "THIRD Current password does not match";
        res.sendStatus(401)
    }
})

//user Login
app.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                if (user.password === req.body.password) {
                    var payload = {
                        id: user._id
                    }
                    var token = jwt.encode(payload, config.jwtSecret)
                    res.json({
                        token: token
                    })
                } else {
                    res.sendStatus(401)


                }
            } else {
                res.sendStatus(401)
            }
        })
    } else {
        res.sendStatus(401)
    }
})


//Get Hospitals and calc average per procedure
app.get("/api/hospitals", (req, res) => {
    Hospital.find().populate('totalHospitalprocedures')
        .then(hospital => {
            for (var i = 0; i < hospital.length; i++) {
                if (hospital[i].totalHospitalprocedures.length !== 0) {
                    hospital[i].appendectomy_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Appendectomy');
                    hospital[i].breast_biopsy_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Breast Biopsy');
                    hospital[i].carotid_endarterectomy_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Carotid Endarterectomy');
                    hospital[i].cataract_surgery_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Cataract Surgery');
                    hospital[i].cesarean_section_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Cesarean Section');
                    hospital[i].coronary_artery_bypass_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Coronary Artery Bypass');
                    hospital[i].debridement_of_wound_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Debridement of Wound');
                    hospital[i].free_skin_graft_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Free Skin Graft');
                    hospital[i].spinal_fusion_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Spinal Fusion');
                    hospital[i].total_hip_replacement_cost = calcProcedureCosts(hospital[i].totalHospitalprocedures, 'Total Hip Replacement');
                } else {
                    // console.log("seed Data")
                }
            }
            for (var i = 0; i < hospital.length; i++) {
                hospital[i].avg_appendectomy_cost = hospital[i].avgPriceMethod(hospital[i].appendectomy_cost);
                hospital[i].avg_breast_biopsy_cost = hospital[i].avgPriceMethod(hospital[i].breast_biopsy_cost);
                hospital[i].avg_carotid_endarterectomy_cost = hospital[i].avgPriceMethod(hospital[i].carotid_endarterectomy_cost);
                hospital[i].avg_cataract_surgery_cost = hospital[i].avgPriceMethod(hospital[i].cataract_surgery_cost);
                hospital[i].avg_cesarean_section_cost = hospital[i].avgPriceMethod(hospital[i].cesarean_section_cost);
                hospital[i].avg_coronary_artery_bypass_cost = hospital[i].avgPriceMethod(hospital[i].coronary_artery_bypass_cost);
                hospital[i].avg_debridement_of_wound_cost = hospital[i].avgPriceMethod(hospital[i].debridement_of_wound_cost);
                hospital[i].avg_free_skin_graft_cost = hospital[i].avgPriceMethod(hospital[i].free_skin_graft_cost);
                hospital[i].avg_spinal_fusion_cost = hospital[i].avgPriceMethod(hospital[i].spinal_fusion_cost);
                hospital[i].avg_total_hip_replacement_cost = hospital[i].avgPriceMethod(hospital[i].total_hip_replacement_cost);
            }

            res.json(hospital);
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/newMedicalBill", (req, res) => {
    var procedureName = req.body.procedureName
    var procedureCost = req.body.cost

    Hospital.countDocuments({ name: req.body.name })
        .then(count => {
            if (count > 0) {
                console.log(`found ${count}`)
                Hospital.findOne({
                    name: req.body.name
                }).then(hospital => {
                    var procedureTextName = getProcedureName(procedureName)
                    Procedure.create({
                        name_of_procedure: procedureTextName,
                        hospital_name: req.body.name,
                        hospital_address: req.body.address,
                        cost: procedureCost,
                        date_of_procedure: req.body.date_of_procedure
                    }).then(procedure => {
                        hospital.totalHospitalprocedures.push(
                            procedure
                        )
                        hospital.save(err => {
                        })
                        var userId = getIdFromToken(req)
                        User.findOne({
                            _id: userId
                        }).then(user => {
                            user.userProcedures.push(procedure);
                            user.save(err => {
                                res.send(procedure)
                                console.log(user.userProcedures)
                            })
                        })
                    })

                })

            } else {
                Hospital.create({
                    name: req.body.name,
                    address: req.body.address,
                    lng: req.body.lng,
                    lat: req.body.lat,
                }).then(hospital => {
                    var procedureTextName = getProcedureName(procedureName)
                    var userId = getIdFromToken(req)
                    Procedure.create({
                        name_of_procedure: procedureTextName,
                        hospital_name: req.body.name,
                        hospital_address: req.body.address,
                        cost: procedureCost,
                        date_of_procedure: req.body.date_of_procedure
                    }).then(procedure => {
                        hospital.totalHospitalprocedures.push(procedure)
                        hospital.save(err => {
                            // res.send(hospital)
                        })
                        console.log('procedure')
                        console.log(procedure)
                        User.findOne({
                            _id: userId
                        }).then(user => {
                            user.userProcedures.push(procedure);
                            user.save(err => {
                                res.send(procedure)
                                console.log(user.userProcedures)
                            })
                        })

                    })
                });
            }
        })
});




app.set('port', process.env.PORT || 3010)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})