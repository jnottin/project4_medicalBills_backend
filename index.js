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
                                res.sendStatus(401)
                            }
                        })
                } else {
                    res.sendStatus(401)
                }
            })
    } else {
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
    Hospital.find()
        .then(hospital => {
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
                    hospital[procedureName].push(
                        procedureCost
                    )
                    hospital.save(err => {
                        // res.send(hospital)
                    })
                    var procedureTextName = getProcedureName(procedureName)
                    var userId = getIdFromToken(req)
                    Procedure.create({
                        name_of_procedure: procedureTextName,
                        hospital_name: req.body.name,
                        hospital_address: req.body.address,
                        cost: procedureCost,
                        date_of_procedure: req.body.date_of_procedure
                    }).then(procedure => {
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

                })

            } else {
                Hospital.create({
                    name: req.body.name,
                    address: req.body.address,
                    lng: req.body.lng,
                    lat: req.body.lat,
                }).then(hospital => {
                    hospital[procedureName].push(procedureCost)
                    hospital.save(err => {
                        // res.send(hospital)
                    })
                    var procedureTextName = getProcedureName(procedureName)
                    var userId = getIdFromToken(req)
                    Procedure.create({
                        name_of_procedure: procedureTextName,
                        hospital_name: req.body.name,
                        hospital_address: req.body.address,
                        cost: procedureCost,
                        date_of_procedure: req.body.date_of_procedure
                    }).then(procedure => {
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