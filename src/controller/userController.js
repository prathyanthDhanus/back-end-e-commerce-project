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
    const identifyUser = await user.findById(productId)
    if (identifyUser) {
      res.send(identifyUser.cart)
    } else {
      res.send("please login")
    }
  } catch (err) {
    console.log("error found", err)
  }
}

//--------------















module.exports = { reg, login, addToCart, getToCart }