const products = require("../model/productSchema")


//----------------add products-------------

const addProduct = async (req, res) => {
  
        const add = new products(req.body)
        const productData = await add.save();
        res.json({

            status: "success",

            message: "product added succesfully",

            data: productData

        })
    
}

//---------------get products-----------------

const getAllProduct = async (req, res) => {
   
        const productData = await products.find();
        res.json({

            status: "success",

            message: "product received successfully",

            data: productData
        })
  
}

//---------------get product by category-----------

const getCategory = async (req, res) => {
    const Category = req.params.category
    
        const productData = await products.find({ category: Category })
        if (products.length < 0) {
           return res.json({

                status: "failure",

                message: "no product found in this category"
            })
        } 
            res.json({

                status: "success",

                message: "product received successfully",

                data: productData
            })
        
    
}

//---------------get products by id----------------

const getProductById = async (req, res) => {
    const productId = req.params.id
    
        const productData = await products.findById(productId)
        console.log(productId)
        if (productData) {
         return  res.json({

                status: "success",

                message: "product received successfully",

                data: productData
            })
        } 
            res.json({

                status: "failure",

                message: "please enter a valid id"
            })
        
    
}

//--------------update products using id------------------

const updateProduct = async (req, res) => {
    
        const productId = req.params.id
        const data = req.body
        const productData = await products.findByIdAndUpdate(productId, data, { new: true })
        res.json({

            status: "success",

            message: "product updated successfully",

            data: productData
        })
    
}

//-------------delete products using id-----------------

const deleteProduct = async (req, res) => {
  
        const productId = req.params.id
        const data = req.body
        const productData = await products.findByIdAndDelete(productId, data)
        res.json({

            status: "succcess",

            message: "product deleted successfully",

            data: productData
        })
  
}






//exporting modules

module.exports = { addProduct, getAllProduct, getProductById, getCategory, updateProduct, deleteProduct }








