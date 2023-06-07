const express = require('express');
const products = require("../controller/productController");
const admin = require("../controller/adminControler")
const router = express.Router()


router.post("/admin/register",admin.adminReg);
router.post("/admin/login",admin.adminLogin);
router.post("/admin/products",products.addProduct);
router.get("/admin/users",admin.getallUsers);
router.get("/admin/users/:id",admin.getUserId);
router.get("/admin/products",products.getAllProduct);



module.exports=router