const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    title : String,
    description:String,
    price:Number,
    image:String,
    category:String
})
const product = mongoose.model("product",productschema)
module.exports=(product)