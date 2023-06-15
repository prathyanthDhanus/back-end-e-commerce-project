const express = require('express');
const products = require("../controller/productController");
const admin = require("../controller/adminControler")
const AdminToken = require("../middleware/adminToken")
const tryCatch = require("../middleware/tryCatch")
const router = express.Router()


router.post("/admin/login", tryCatch(admin.adminLogin));

router.post("/admin/products", AdminToken, tryCatch(products.addProduct));

router.get("/admin/users", AdminToken, tryCatch(admin.getAllUsers));
router.get("/admin/users/:id", AdminToken, tryCatch(admin.getUserId));

router.get("/admin/products", AdminToken, tryCatch(products.getAllProduct));
router.get("/admin/products/category/:category", AdminToken, tryCatch(products.getCategory));
router.get("/admin/products/:id", AdminToken, tryCatch(products.getProductById));

router.put("/admin/products/:id", AdminToken, tryCatch(products.updateProduct));
router.delete("/admin/products/:id", AdminToken, tryCatch(products.deleteProduct));



module.exports = router