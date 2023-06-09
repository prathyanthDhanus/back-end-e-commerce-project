const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
        username: String,
        password: String,
        cart: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
        }],
        wishlist: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
        }]
})

const user = mongoose.model("user", userschema)
module.exports = user