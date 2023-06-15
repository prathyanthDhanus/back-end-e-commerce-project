const user = require("../model/userSchema")
const product = require("../model/productSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


//------------user registration---------------

const register = async (req, res) => {
  try {
    const USERNAME = req.body.username
    const PASSWORD = req.body.password
    const identifyUser = await user.findOne({ username: USERNAME })

    if (identifyUser) {
      res.json({

        status: "false",

        message: "user already exist"
      })
    }

    let hashedPassword = await bcrypt.hash(PASSWORD, 10)

    const outcome = new user({ username: USERNAME, password: hashedPassword });
    await outcome.save()

    res.json({

      status: "success",

      message: "Registered successfully,please login"
    })
  } catch (err) {
    console.log("error found", err)
  }
}

//-------------user login--------------------

const login = async (req, res) => {
  try {
    const USERNAME = req.body.username;
    const PASSWORD = req.body.password;
    const identifyUser = await user.findOne({ username: USERNAME })
    if (!identifyUser) {
      res.json({

        status: "success",

        message: "Wrong user"
      })
    }
    let PassWord = await bcrypt.hash(PASSWORD, 10)
    bcrypt.compare(PassWord, identifyUser.password, (err) => {
      if (err) {
        return res.json({ status: "failure", message: "Invalid password" })
      }
    })
    const token = jwt.sign({ username: USERNAME }, "userscrtkey", { expiresIn: "24h" })
    res.status(200).json({

      status: "success",

      message: "User logged in successfully ",

      token
    });
  } catch (err) {
    console.log("internal server error", err)
  }
}

//----------------product added to cart by user-------------

const addToCart = async (req, res) => {
  const productId = req.params.id
  const productData = await product.findById(productId)
  if (!productData) {
    return res.json({ status: "failure", message: "something went wrong" })
  }
  try {
    const USERNAME = req.body.username
    const identifyUser = await user.findOne({ username: USERNAME })
    if (identifyUser.cart.includes(productId)) {
      res.json({ status: "failure", message: "product already exist on cart" })
    } else {
      identifyUser.cart.push(productId)
      await identifyUser.save()
      res.json({ status: "success", message: "product successfully added to cart" })
    }
  } catch (err) {
    console.log("error found", err)
  }
}

//---------------get products from cart------------------

const getFromCart = async (req, res) => {
  const productId = req.params.id
  try {
    const identifyUser = await user.findById(productId).populate("cart")
    if (identifyUser) {
      res.json({ status: "success", message: "cart items retrieved successfully", data: identifyUser.cart })
    } else {
      res.json({ status: "failure", message: "please login" })
    }
  } catch (err) {
    console.log("error found", err)
  }
}

//----------------delete products from cart------------------

const deleteFromCart = async (req, res) => {
  const productId = req.params.id
  const Username = req.body.username
  try {
    const identifyUser = await user.findOne({ username: Username })
    const updatedCart = identifyUser.cart.filter((id) => id.toString() !== productId.toString())

    if (updatedCart.length !== identifyUser.cart.length) {
      identifyUser.cart = updatedCart
      await identifyUser.save()
      res.send("Product successfully removed from the cart")
    } else {
      res.send("Product does not exist in the cart")
    }
  } catch (err) {
    console.log("Error found", err)
  }
}

//--------------product added to wishlist------------------

const addToWishlist = async (req, res) => {
  const productId = req.params.id
  const productData = await product.findById(productId)
  if (!productData) {
    res.json({ status: "failure", message: "something went wrong" })
  }
  try {
    const USERNAME = req.body.username
    const identifyUser = await user.findOne({ username: USERNAME })
    if (identifyUser.wishlist.includes(productId)) {
      res.json({ status: "failure", message: "product already exist on wishlist" })
    } else {
      identifyUser.wishlist.push(productId)
      await identifyUser.save()
      res.json({ status: "success", message: "product successfully added to wishlist" })
    }
  } catch (err) {
    console.log("error found", err)
  }

}

//----------------get product from wishlist-----------------

const getFromWishlist = async (req, res) => {
  const productId = req.params.id
  try {
    const identifyUser = await user.findById(productId).populate("wishlist")
    if (identifyUser.wishlist.length > 0) {
      res.json({ status: "success", message: "wishlisted product retrieved successfully ", data: identifyUser.wishlist })
    } else {
      res.json({ status: "failure", message: "wishlist is empty" })
    }
  } catch (err) {
    console.log("error found", err)
  }
}

//---------------delete products from wishlist----------------

const deleteFromWishlist = async (req, res) => {
  const productId = req.params.id
  const USERNAME = req.body.username
  try {
    const identifyUser = await user.findOne({ username: USERNAME })
    const updatedWishlist = identifyUser.wishlist.filter((id) => id.toString() !== productId.toString())
    if (updatedWishlist.length !== identifyUser.wishlist.length) {
      identifyUser.wishlist = updatedWishlist;
      await identifyUser.save();
      res.json({ status: "success", message: "product successfully removed from wishlist" });
    } else {
      res.json({ status: "failure", message: "product does not exist on wishlist" });
    }
  } catch (err) {
    console.log("error found", err)
  }
}













module.exports = { register, login, addToCart, getFromCart, deleteFromCart, addToWishlist, getFromWishlist, deleteFromWishlist }