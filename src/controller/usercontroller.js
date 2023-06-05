const user = require("../controller/usercontroller")






const reg = async (req,res)=>{
    try{
        const UserName = req.body.username
     const Password = req.body.password
     const identify = await user.findOne({username:UserName})
      if(identify){
        res.send("user already exist")
      }
      const outcome = new user({username:UserName,password:Password});
        await outcome.save()
        res.send("Registered successfully,please login")
    }catch(err){
        console.log("error found",err)
    }
}