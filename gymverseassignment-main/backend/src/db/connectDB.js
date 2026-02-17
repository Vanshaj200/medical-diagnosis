const mongoose  = require("mongoose")

const config = require("../conf/config");

const connectDB = async () => {
    await mongoose.connect(config.mongoUri)
    .then(() =>{
        console.log("Database connected")
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectDB;