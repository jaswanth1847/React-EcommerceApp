let mongoose = require("mongoose")

let prodsch = new mongoose.Schema({
    "_id":String,
    "name":String,
    "cat":String,
    "desc":String, //description
    "price":Number,
    "pimg":String,
    "dct":Number,  // discount
    "reviews":[]
})

let pm = mongoose.model("product", prodsch)
module.exports = pm