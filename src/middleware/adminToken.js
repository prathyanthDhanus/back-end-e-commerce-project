const jwt = require("jsonwebtoken");

const adminToken = ((req,res,next)=>{
    let authHeader = req.headers.authorization
    if(authHeader==undefined){
        res.status(404).send("no token provided")
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token,"adminscrtkey",(err)=>{
        if(err){
            res.send("Invalid token")
        }else{
            next()
        }
    })
})

module.exports=adminToken