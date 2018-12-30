const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const { Hospital, Procedure } = require("./models/hopsital.js");
const port = process.env.PORT || 3010;

const app = express();

app.use(parser.json());
app.use(cors());

app.use(express.static("client/build"));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/client/build/index.html");
// });

app.get("/api/procedures", (req, res) => {
    Procedure.find()
        .then(procedure => {
            res.json(procedure);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/api/hospitals", (req, res) => {
    Hospital.find()
        .then(hospital => {
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


    // if (Hospital.findOne({ name: req.body.name }).count() > 0) {
    //     console.log("found")
    // } else {
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
    // }
});




app.set('port', process.env.PORT || 3010)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})