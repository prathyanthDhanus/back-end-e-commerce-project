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














module.exports={addProduct}








