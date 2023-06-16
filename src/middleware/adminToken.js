const jwt = require("jsonwebtoken");

const adminToken = ((req,res,next)=>{
    let authHeader = req.headers.authorization
    if(authHeader==undefined){
        res.status(404).send("no token provided")
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token,"adminscrtkey",(error)=>{
        if(error){
            res.json({status:"failure",message:"Invalid token"})
        }else{
            next()
        }
    })
})

module.exports=adminToken