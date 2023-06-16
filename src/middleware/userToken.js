const jwt =require("jsonwebtoken")

const userToken = ((req,res,next)=>{
    let authHeader = req.headers.authorization
    if(authHeader==undefined){
        res.status(401).send("no token provided")
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token,"userscrtkey",(error)=>{
        if(error){
            res.json({status:"failure",message:"Invalid User"})
        }else{
           next();
        }
    })

})

module.exports=userToken;