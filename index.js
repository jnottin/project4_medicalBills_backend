const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const { Hospital } = require("./models/hospital.js");
const port = process.env.PORT || 3010;


//User requires
const passport = require('./config/passport')();
const config = require('./config/config')
const jwt = require('jwt-simple')
var jwtDecode = require('jwt-decode');
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
app.get('/userHospitals', (req, res) => {
    // console.log(req.headers)
    try {
        var authorization = req.headers.authorization.split(' ')[1]
        console.log(authorization)
        var authorizationDecode = jwtDecode(authorization, config.jwtSecret)
        console.log(authorizationDecode)
        var userId = authorizationDecode.id
        console.log(userId)
        return userId
    }
    catch (error) {
        console.log('could not decode ID', error)
        return null
    }

    // if (req.headers && req.headers.authorization) {
    //     var authorization = headers.authorization.split(' ')[1],
    //         decoded;
    //     try {
    //         decoded = jwt.verify(authorization, secret.secretToken);
    //     } catch (e) {
    //         return res.status(401).send('unauthorized');
    //     }
    //     var userId = decoded.id;

    //     // Fetch the user by id 
    //     User.findOne({ _id: userId }).then(function (user) {
    //         // Do something with the user
    //         return res.sendStatus(200);
    //     });
    //     console.log(userId)
    // }
    // return res.sendStatus(500);
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
                                    id: newUser.id
                                }
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
                        id: user.id
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
    console.log(req.body);;
    console.log(req.body.procedure);
    var procedure = req.body.procedure
    var procedureCost = req.body.cost
    console.log(procedure)

    Hospital.countDocuments({ name: req.body.name })
        .then(count => {
            if (count > 0) {
                console.log(`found ${count}`)
                Hospital.findOne({
                    name: req.body.name
                }).then(hospital => {

                    console.log(procedureCost)
                    if (procedure === 'appendectomy_cost') {
                        hospital.appendectomy_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'breast_biopsy_cost') {
                        hospital.breast_biopsy_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'carotid_endarterectomy_cost') {
                        hospital.carotid_endarterectomy_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'cataract_surgery_cost') {
                        hospital.cataract_surgery_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'cesarean_section_cost') {
                        hospital.cesarean_section_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'coronary_artery_bypass_cost') {
                        hospital.coronary_artery_bypass_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'debridement_of_wound_cost') {
                        hospital.debridement_of_wound_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'free_skin_graft_cost') {
                        hospital.free_skin_graft_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'spinal_fusion_cost') {
                        hospital.spinal_fusion_cost.push(
                            procedureCost
                        )
                    } else if (procedure === 'total_hip_replacement_cost') {
                        hospital.total_hip_replacement_cost.push(
                            procedureCost
                        )
                    } else {
                        console.log("error!!!!!")
                    }
                    console.log(hospital)
                    hospital.save(err => {
                        res.send(hospital)
                    })
                })

            } else {
                if (procedure === 'appendectomy_cost') {
                    console.log(req.body.email)
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        appendectomy_cost: req.body.cost
                    }).then(hospital => {
                        User.findOne({
                            email: req.body.email
                        }).then(user => {
                            user.userHospitals.push(hospital);
                            res.send(hospital);
                            console.log(user.userHospitals)
                        })
                    });
                } else if (procedure === 'breast_biopsy_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        breast_biopsy_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else if (procedure === 'carotid_endarterectomy_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        carotid_endarterectomy_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else if (procedure === 'cataract_surgery_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        cataract_surgery_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else if (procedure === 'cesarean_section_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        cesarean_section_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else if (procedure === 'coronary_artery_bypass_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        coronary_artery_bypass_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else if (procedure === 'debridement_of_wound_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        debridement_of_wound_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else if (procedure === 'free_skin_graft_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        free_skin_graft_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else if (procedure === 'spinal_fusion_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        spinal_fusion_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else if (procedure === 'total_hip_replacement_cost') {
                    Hospital.create({
                        name: req.body.name,
                        address: req.body.address,
                        lng: req.body.lng,
                        lat: req.body.lat,
                        total_hip_replacement_cost: req.body.cost
                    }).then(hospital => {
                        res.send(hospital);
                        console.log(hospital)
                    });
                } else {
                    console.log("Error on something!!!")
                }
            }
        })
});




app.set('port', process.env.PORT || 3010)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})