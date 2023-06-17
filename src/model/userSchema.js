const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        cart: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
        }],
        wishlist: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
        }],
        orderdetails: [{
                products: [{
                        type: Number,
                        default: 0
                }],
                orderid: [{
                        type: String,
                        default: ""
                }],
                total: [{
                        type: Number,
                        default: 0
                }]
        }]
})

const user = mongoose.model("user", userschema)
module.exports = user