const express = require("express");
const user = require("../controller/userController");
const products = require("../controller/productController");

const router = express.Router();




    router.post("/users/register",user.reg);
    router.post("/users/login",user.login);
    router.get("/users/products",products.getAllProduct);
    router.get("/users/products/:id",products.getproductById);
    router.get("/users/products/category/:category",products.getCategory);
    














    module.exports=router   