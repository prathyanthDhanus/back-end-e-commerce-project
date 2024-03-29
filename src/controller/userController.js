const user = require("../model/userSchema")
const product = require("../model/productSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userJoi = require("../help/schemaValidation")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


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
    return res.json({
      status: "failure",
      message: "product already exist on cart"
    })
  }
  identifyUser.cart.push(productId)
  await identifyUser.save()
  res.json({
    status: "success",
    message: "product successfully added to cart"
  })


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
    return res.json({

      status: "success",
      message: "Product successfully removed from the cart"
    })
  }
  res.json({
    status: "failure",
    message: "Product does not exist in the cart"
  })


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
    return res.json({ 
      status: "failure", 
      message: "product already exist on wishlist" 
    })
  }
  identifyUser.wishlist.push(productId)
  await identifyUser.save()
  res.json({ 
    status: "success", 
    message: "product successfully added to wishlist" 
  })


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
    return res.json({
      status: "success",
      message: "product successfully removed from wishlist"
    });
  }
  res.json({
    status: "failure",
    message: "product does not exist on wishlist"
  });


}

//----------------------payment section-------------------

const payment = async (req, res) => {
  const userId = req.params.id;
  const User = await user.findById(userId).populate("cart");

  // console.log(User)

  if (!User) {
    return res.json({
      status: "failure",
      message: "please login"
    });
  }

  if (User.cart.length === 0) {
    return res.json({
      message: "user cart is empty, please add some products"
    });
  }

  let totalSum = User.cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  //method for integrate stripe api in express
  let metadata = "thank you for purchasing from us, see you soon";
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Sample Product',
            description: 'This is a sample product',
            images: ['https://example.com/product-image.jpg'],
          },
          unit_amount: totalSum * 100, // amount in rupees
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png',
    cancel_url: 'https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q',
    metadata: {
      script: metadata,
    },
  })

  res.json({ url: session.url, orderId: session.id });

  User.orderdetails.push({
    products: User.cart.length,
    orderid: session.id,
    total: totalSum
  })
  await User.save();
  // console.log(User.orderdetails)

};

//exporting modules

module.exports = {
  register, login, addToCart, getFromCart, deleteFromCart,
  addToWishlist, getFromWishlist, deleteFromWishlist, payment
}