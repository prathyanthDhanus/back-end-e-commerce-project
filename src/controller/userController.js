const user = require("../model/userSchema")
const product = require("../model/productSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userJoi = require("../help/schemaValidation")


//------------user registration---------------

const register = async (req, res) => {

  // const USERNAME = req.body.username
  // const PASSWORD = req.body.password

  //validating req.body
  const { error, value } = userJoi.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { username, password } = value

  const identifyUser = await user.findOne({ username: username })

  if (identifyUser) {
    return res.json({

      status: "failure",

      message: "user already exist"
    })
  }

  let hashedPassword = await bcrypt.hash(password, 10)

  const outcome = new user({ username: username, password: hashedPassword });
  await outcome.save()

  res.json({

    status: "success",

    message: "Registered successfully,please login"
  })

}

//-------------user login--------------------

const login = async (req, res) => {

  // const USERNAME = req.body.username;
  // const PASSWORD = req.body.password;
  const { error, value } = userJoi.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { username, password } = value

  const identifyUser = await user.findOne({ username: username })
  if (!identifyUser) {
    return res.json({

      status: "failure",

      message: "Wrong user"
    })
  }

  let PassWord = await bcrypt.hash(password, 10)
  bcrypt.compare(PassWord, identifyUser.password, (error) => {
    if (error) {
      return res.json({ status: "failure", message: "Invalid password" })
    }
  })

  const token = jwt.sign({ username: username }, "userscrtkey", { expiresIn: "24h" })
  res.status(200).json({

    status: "success",

    message: "User logged in successfully ",

    token
  });

}

//----------------product added to cart by user-------------

const addToCart = async (req, res) => {
  const productId = req.params.id
  const productData = await product.findById(productId)
  if (!productData) {
    return res.json({ status: "failure", message: "something went wrong" })
  }

  const USERNAME = req.body.username
  const identifyUser = await user.findOne({ username: USERNAME })
  if (identifyUser.cart.includes(productId)) {
    return res.json({ status: "failure", message: "product already exist on cart" })
  }
  identifyUser.cart.push(productId)
  await identifyUser.save()
  res.json({ status: "success", message: "product successfully added to cart" })


}

//---------------get products from cart------------------

const getFromCart = async (req, res) => {
  const productId = req.params.id

  const identifyUser = await user.findById(productId).populate("cart")
  if (identifyUser) {
    return res.json({

      status: "success",
      message: "cart items retrieved successfully",
      data: identifyUser.cart

    })
  }
  res.json({ status: "failure", message: "please login" })


}

//----------------delete products from cart------------------

const deleteFromCart = async (req, res) => {
  const productId = req.params.id
  const Username = req.body.username

  const identifyUser = await user.findOne({ username: Username })
  const updatedCart = identifyUser.cart.filter((id) => id.toString() !== productId.toString())

  if (updatedCart.length !== identifyUser.cart.length) {
    identifyUser.cart = updatedCart
    await identifyUser.save()
    return res.json({ status: "success", message: "Product successfully removed from the cart" })
  }
  res.json({ status: "failure", message: "Product does not exist in the cart" })


}

//--------------product added to wishlist------------------

const addToWishlist = async (req, res) => {
  const productId = req.params.id
  const productData = await product.findById(productId)
  if (!productData) {
    return res.json({ status: "failure", message: "something went wrong" })
  }

  const USERNAME = req.body.username
  const identifyUser = await user.findOne({ username: USERNAME })
  if (identifyUser.wishlist.includes(productId)) {
    return res.json({ status: "failure", message: "product already exist on wishlist" })
  }
  identifyUser.wishlist.push(productId)
  await identifyUser.save()
  res.json({ status: "success", message: "product successfully added to wishlist" })


}

//----------------get product from wishlist-----------------

const getFromWishlist = async (req, res) => {
  const productId = req.params.id

  const identifyUser = await user.findById(productId).populate("wishlist")
  if (identifyUser.wishlist.length > 0) {
    return res.json({

      status: "success",
      message: "wishlisted product retrieved successfully ",
      data: identifyUser.wishlist
    })
  }
  res.json({ status: "failure", message: "wishlist is empty" })


}

//---------------delete products from wishlist----------------

const deleteFromWishlist = async (req, res) => {
  const productId = req.params.id
  const USERNAME = req.body.username

  const identifyUser = await user.findOne({ username: USERNAME })
  const updatedWishlist = identifyUser.wishlist.filter((id) => id.toString() !== productId.toString())
  if (updatedWishlist.length !== identifyUser.wishlist.length) {
    identifyUser.wishlist = updatedWishlist;
    await identifyUser.save();
    return res.json({ status: "success", message: "product successfully removed from wishlist" });
  }
  res.json({ status: "failure", message: "product does not exist on wishlist" });


}


//exporting modules

module.exports = { register, login, addToCart, getFromCart, deleteFromCart, addToWishlist, getFromWishlist, deleteFromWishlist }