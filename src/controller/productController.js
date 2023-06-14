const products = require("../model/productSchema")


//----------------add products-------------

const addProduct = async (req, res) => {
    try {
        const add = new products(req.body)
        const productData = await add.save();
        res.send(productData)
    } catch (err) {
        console.log("error", err)
    }
}

//---------------get products-----------------

const getAllProduct = async (req, res) => {
    try {
        const productData = await products.find();
        res.send(productData)
    } catch (err) {
        console.log("error found", err)
    }
}

//---------------get product by category-----------

const getCategory = async (req, res) => {
    const Category = req.params.category
    try {
        const productData = await products.find({ category: Category })
        if (products.length < 0) {
            res.send("no products found in this category")
        } else {
            res.send(productData)
        }
    } catch (err) {
        console.log("error found", err)
    }
}

//---------------get products by id----------------

const getproductById = async (req, res) => {
    const productId = req.params.id
    try {
        const productData = await products.findById(productId)
        console.log(productId)
        if (productData) {
            res.json(productData)
        } else {
            res.send("please enter a valid id")
        }
    } catch (err) {
        console.log("error found", err)
    }
}

//--------------update products using id------------------

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        const productData = await products.findByIdAndUpdate(productId, data,{new:true})
        res.send(productData)
    } catch (err) {
        console.log("error found", err)
    }
}

//-------------delete products using id-----------------

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        const productData = await products.findByIdAndDelete(productId, data)
        res.send(productData)
    } catch (err) {
        console.log("error found", err)
    }
}















module.exports = { addProduct, getAllProduct, getproductById, getCategory, updateProduct, deleteProduct }








