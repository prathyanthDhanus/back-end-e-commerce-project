const products = require("../model/productSchema")


//----------------add products-------------

const addProduct = async (req, res) => {
    try {
        const add = new products(req.body)
        const productData = await add.save();
        res.json({

            status: "success",

            message: "product added succesfully",

            data: productData

        })
    } catch (err) {
        console.log("error", err)
    }
}

//---------------get products-----------------

const getAllProduct = async (req, res) => {
    try {
        const productData = await products.find();
        res.json({

            status: "success",

            message: "product received successfully",

            data: productData
        })
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
            res.json({

                status: "failure",

                message: "no product found in this category"
            })
        } else {
            res.json({

                status: "success",

                message: "product received successfully",

                data: productData
            })
        }
    } catch (err) {
        console.log("error found", err)
    }
}

//---------------get products by id----------------

const getProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const productData = await products.findById(productId)
        console.log(productId)
        if (productData) {
            res.json({

                status: "success",

                message: "product received successfully",

                data: productData
            })
        } else {
            res.json({

                status: "failure",

                message: "please enter a valid id"
            })
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
        const productData = await products.findByIdAndUpdate(productId, data, { new: true })
        res.json({

            status: "success",

            message: "product updated successfully",

            data: productData
        })
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
        res.json({

            status: "succcess",

            message: "product deleted successfully",

            data: productData
        })
    } catch (err) {
        console.log("error found", err)
    }
}















module.exports = { addProduct, getAllProduct, getProductById, getCategory, updateProduct, deleteProduct }








