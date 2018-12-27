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



app.set('port', process.env.PORT || 3010)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})