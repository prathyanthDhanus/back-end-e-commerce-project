const express = require('express');
const products = require("../controller/productController");
const admin = require("../controller/adminControler")
const router = express.Router()


router.post("/admin/register",admin.adminReg);
router.post("/admin/login",admin.adminLogin);
router.post("/admin/products",products.addProduct);
router.get("/admin/users",admin.getallUsers);
router.get("/admin/products",products.getAllProduct);
router.get("/admin/products/:category",products.getCategory);
router.get("/admin/products/:id",products.getproductById)
router.get("/admin/users/:id",admin.getUserId);
router.put("/admin/products/:id",products.updateProduct);
router.delete("/admin/products/:id",products.deleteProduct)



module.exports=router