const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const url = "mongodb+srv://prathyanthbusinessmail:M0xlSdpCEavulUWJ@cluster0.aul70bf.mongodb.net/"

app.use(express.json());

//mongodb connection setup
mongoose.connect(url)
.then(()=> console.log("mongodb atlas connected"))
.catch((e)=>console.log("error found",e))




