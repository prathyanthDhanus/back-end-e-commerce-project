const user = require("../model/userSchema")
const product = require("../model/productSchema")



//------------user registration---------------
const reg = async (req, res) => {
  try {
    const UserName = req.body.username
    const Password = req.body.password
    const identifyUser = await user.findOne({ username: UserName })
    if (identifyUser) {
      res.send("user already exist")
    }
    const outcome = new user({ username: UserName, password: Password });
    await outcome.save()
    res.send("Registered successfully,please login")
  } catch (err) {
    console.log("error found", err)
  }
}

//-------------user login--------------------

const login = async (req, res) => {
  try {
    const UserName = req.body.username;
    const Password = req.body.password;
    const identifyUser = await user.findOne({ username: UserName })
    if (!identifyUser) {
      res.send("Wrong user")
    } else {
      if (Password == identifyUser.password) {
        res.send("login successfully")
      } else {
        res.send("wrong password")
      }
    }
  } catch (err) {
    console.log("internal server error", err)
  }
}

//----------------product added to cart by user-------------

const addToCart = async (req, res) => {
  const productId = req.params.id
  const productData = await product.findById(productId)
  if (!productData) {
    res.send("something went wrong")
  }
  try {
    const Username = req.body.username
    const identifyUser = await user.findOne({ username: Username })
    if (identifyUser.cart.includes(productId)) {
      res.send("product already exist on cart")
    } else {
      identifyUser.cart.push(productId)
      await identifyUser.save()
      res.send("product successfully added to cart")
    }
  } catch (err) {
    console.log("error found", err)
  }
}

//---------------get products from cart------------------

const getToCart = async (req, res) => {
  const productId = req.params.id
  try {
    const identifyUser = await user.findById(productId).populate("cart")
    if (identifyUser) {
      res.send(identifyUser.cart)
    } else {
      res.send("please login")
    }
  } catch (err) {
    console.log("error found", err)
  }
}

//----------------delete from cart------------------

// const deletefrmCart = async (req, res) => {
//   const productId = [req.body.id]
//   const Username = req.body.username

//   try {
//     const identifyUser = await user.findOne({ username: Username })
//     if (!identifyUser) {
//       res.send('please login')
//     }
//     else {
//       const updatedCart = identifyUser.cart.filter(e => !productId.includes(e))
//       identifyUser = updatedCart
//       await identifyUser.save()
//       res.send(`${productId.length} product removed from cart`)
//     }
//   } catch (err) {
//     console.log("error found", err)
//   }

// }
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
    res.send("something went wrong")
  }
  try {
    const UserName = req.body.username
    const identifyUser = await user.findOne({ username: UserName })
    if (identifyUser.wishlist.includes(productId)) {
      res.send("product already exist on wishlist")
    } else {
      identifyUser.wishlist.push(productId)
      await identifyUser.save()
      res.send("product successfully added to wishlist")
    }
  } catch (err) {
    console.log("error found", err)
  }

}

//----------------get product from wishlist-----------------

const getTowishlist = async (req, res) => {
  const productId = req.params.id
  try {
    const identifyUser = await user.findById(productId).populate("wishlist")
    if (identifyUser.wishlist.length > 0) {
      res.send(identifyUser.wishlist)
    } else {
      res.send("wishlist is empty")
    }
  } catch (err) {
    console.log("error found", err)
  }
}

//---------------delete products from wishlist----------------















module.exports = { reg, login, addToCart, getToCart, deleteFromCart, addToWishlist, getTowishlist }