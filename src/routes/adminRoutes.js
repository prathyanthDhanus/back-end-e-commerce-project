const express = require('express');
const products = require("../controller/productController");
const admin = require("../controller/adminControler")
const AdminToken = require("../middleware/adminToken")
const router = express.Router()


router.post("/admin/login", admin.adminLogin);

router.post("/admin/products",AdminToken, products.addProduct);

router.get("/admin/users",AdminToken,admin.getAllUsers);
router.get("/admin/users/:id",AdminToken, admin.getUserId);

router.get("/admin/products",AdminToken, products.getAllProduct);
router.get("/admin/products/category/:category",AdminToken, products.getCategory);
router.get("/admin/products/:id",AdminToken, products.getProductById);

router.put("/admin/products/:id",AdminToken, products.updateProduct);
router.delete("/admin/products/:id",AdminToken, products.deleteProduct);



module.exports = router