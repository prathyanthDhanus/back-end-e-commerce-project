const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const port = 3000;
const url = process.env.MONGODB_URL

app.use(express.json()); // JSON parsing middleware is applied to all incoming requests before they reach the route handlers. 

//---------------user------------------

const userRoutes = require("./src/routes/userRoutes")
app.use("/", userRoutes)


//---------------admin----------------

const adminRoutes = require("./src/routes/adminRoutes")
app.use("/", adminRoutes)



//mongodb connection setup
mongoose.connect(url)
    .then(() => console.log("mongodb atlas connected"))
    .catch((e) => console.log("error found", e))


app.listen(port, () => {
    console.log(`port is starting on ${port}`)
})

