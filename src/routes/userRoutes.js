const express = require("express");
const user = require("../controller/userController");

const router = express.Router();




    router.post("/users/register",user.reg);
    router.post("/users/login",user.login);
    router.get("/users/products")
    














    module.exports=router   