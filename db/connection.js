const mongoose = require('mongoose')

if (process.env.NODE_ENV == "production") {
    mongoose.connect(process.env.MLAB_URL, { useMongoClient: true })
} else {
    mongoose.connect("mongodb://localhost/project4medicalcosts", { useCreateIndex: true, useNewUrlParser: true });
}

mongoose.Promise = Promise;
mongoose.set("debug", true);
module.exports = mongoose;