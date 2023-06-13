const express = require("express");
const user = require("../controller/userController");
const products = require("../controller/productController");
const usertkn = require("../middleware/userToken")

const router = express.Router();




router.post("/users/register", user.reg);
router.post("/users/login", user.login);
router.get("/users/products", usertkn, products.getAllProduct);
router.get("/users/products/:id", usertkn, products.getproductById);
router.get("/users/products/category/:category", usertkn, products.getCategory);
router.post("/users/cart/:id", usertkn, user.addToCart);
router.get("/users/cart/:id", usertkn, user.getToCart);
router.delete("/users/cart/:id", usertkn, user.deleteFromCart)
router.post("/users/wishlist/:id", usertkn, user.addToWishlist);
router.get("/users/wishlist/:id", usertkn, user.getTowishlist);
router.delete("/users/wishlist/:id", usertkn, user.deleteFromWishlist)













module.exports = router   