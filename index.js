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
    Hospital.create({
        name: req.body.name,
        address: req.body.address,
        lng: req.body.lng,
        lat: req.body.lat,
        cost: req.body.cost,
        procedures: [{
            name_of_procedure: req.body.name_of_procedure
        }]
    }).then(hospital => {
        // let name_of_procedure_input = req.body.name_of_procedure
        // console.log(name_of_procedure)
        // hospital.procedures.push({
        //     name_of_procedure: name_of_procedure_input,
        // });
        res.send(hospital);
    });
});



app.set('port', process.env.PORT || 3010)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})