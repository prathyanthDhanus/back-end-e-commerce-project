const products = require("../model/productSchema")


//----------------add products-------------

const addProduct = async (req,res)=>{
    try{
        const add = new products(req.body)
       const productData =  await add.save();
         res.send(productData)
    }catch(err){
        console.log("error",err)
    }
}

//---------------get products-----------------

const getAllProduct = async (req,res)=>{
    try{
        const productData = await products.find();
        res.send(productData)
    }catch(err){
        console.log("error found",err)
    }
}

//---------------get product by category-----------





//---------------get products by id----------------
const getproductById = async (req,res)=>{
   try{
    const productId = req.params.id;
    const productData = await products.findById(productId)
    res.send(productData)
   }catch(err){
    console.log("error found",err)
   }
}

















module.exports={addProduct,getAllProduct}








