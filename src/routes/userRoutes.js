const express = require("express");
const user = require("../controller/userController");
const products = require("../controller/productController");
const usertkn = require("../middleware/userToken")
const tryCatch = require("../middleware/tryCatch")
const router = express.Router();




router.post("/users/register", tryCatch(user.register));
router.post("/users/login", tryCatch(user.login));

router.get("/users/products", usertkn, tryCatch(products.getAllProduct));
router.get("/users/products/:id", usertkn, tryCatch(products.getProductById));
router.get("/users/products/category/:category", usertkn, tryCatch(products.getCategory));

router.post("/users/cart/:id", usertkn, tryCatch(user.addToCart));
router.get("/users/cart/:id", usertkn, tryCatch(user.getFromCart));
router.delete("/users/cart/:id", usertkn, tryCatch(user.deleteFromCart));

router.post("/users/wishlist/:id", usertkn, tryCatch(user.addToWishlist));
router.get("/users/wishlist/:id", usertkn, tryCatch(user.getFromWishlist));
router.delete("/users/wishlist/:id", usertkn, tryCatch(user.deleteFromWishlist))


router.get("/users/product/cart/payment/:id",tryCatch(user.payment))













module.exports = router   