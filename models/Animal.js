//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")
////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make fruits schema
const animalsSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number,
})

// make animal model
const Animal = model("Animal", animalsSchema)
//////////////////////////////////
// export the model
/////////////////////////////////
module.exports = Animal