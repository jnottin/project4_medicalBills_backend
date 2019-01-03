const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const { Hospital, Procedure } = require("./models/other_hospital.js");
const port = process.env.PORT || 3010;

const app = express();

app.use(parser.json());
app.use(cors());

app.use(express.static("client/build"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

// app.get("/api/hospitals", (req, res) => {
//     Hospital.find()
//         .then(hospital => {
//             res.json(hospital);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });


//NEW TO TRY AVERAGE
app.get("/api/hospitals", (req, res) => {
    Hospital.find()
        .then(hospital => {
            console.log(hospital);
            // for each hospital
            // CHECK FUNCTION
            // hospital.avg_appendectomy_cost = hospital.avgPriceMethod()
            // console.log(hospital.avg_appendectomy_cost)

            // for (var i = 0; i < hospital.length; i++) {
            //     if (hospital[i].appendectomy_cost.length > 1) {
            //         hospital[i].avg_appendectomy_cost = hospital[i].avgPriceMethod(hospital[i].appendectomy_cost, "appendectomy_costs");
            //     } else {
            //         hospital[i].avg_appendectomy_cost = hospital[i].appendectomy_cost[0]
            //     }
            //     console.log(hospital[i].appendectomy_cost);
            //     console.log(hospital[i].avg_appendectomy_cost);
            // }
            res.json(hospital);
        })
        .catch(err => {
            console.log(err);
        });
});


app.post("/newMedicalBill", (req, res) => {
    console.log(req.body);
    console.log(req.body.procedure);
    var procedureCost = req.body.procedure
    console.log(procedureCost);
    Hospital.findOne({ name: req.body.name }).then(hospital => {
        console.log("hospital")
        console.log(hospital.name)
    })
    if (typeof hospital.name != "undefined") {
        console.log("found")
    } else {
        Hospital.create({
            name: req.body.name,
            address: req.body.address,
            lng: req.body.lng,
            lat: req.body.lat,
            cost: req.body.cost,
            procedureCost: req.body.cost,
        }).then(hospital => {
            res.send(hospital);
        });
    }
});




app.set('port', process.env.PORT || 3010)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})