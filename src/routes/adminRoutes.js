const express = require('express');
const products = require("../controller/productController");
const admin = require("../controller/adminControler")
const router = express.Router()


router.post("/admin/register",admin.adminReg);
router.post("/admin/login",admin.adminLogin);
router.post("/admin/products",products.addProduct);



module.exports=router