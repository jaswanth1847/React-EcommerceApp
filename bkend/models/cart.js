let mongoose = require("mongoose")

let cartsch = new mongoose.Schema({
    "_id":String,
    "pid":String,
    "uid":String,  // user id 
    "pimg":String,
    "price":Number,
    "dct":Number,
    "qty":Number,
    "cat":String,
    "name":String
})

let cm = mongoose.model("cart", cartsch)
module.exports = cm 