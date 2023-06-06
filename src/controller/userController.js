const user = require("../model/userSchema")





//------------user registration---------------
const reg = async (req,res)=>{
    try{
        const UserName = req.body.username
     const Password = req.body.password
     const identifyUser= await user.findOne({username:UserName})
      if(identifyUser){
        res.send("user already exist")
      }
      const outcome = new user({username:UserName,password:Password});
        await outcome.save()
        res.send("Registered successfully,please login")
    }catch(err){
        console.log("error found",err)
    }
}

//-------------user login--------------------
  const login = async (req,res)=>{
    try{
      const UserName = req.body.username;
      const Password = req.body.password;
      const identifyUser= await user.findOne({username:UserName})
      if(!identifyUser){
        res.send("Wrong user")
      }else{
        if(Password==identify.password){
          res.send("login successfully")
        }else{
          res.send("wrong password")
        }
        
      }

    }catch(err){
             console.log("internal server error",err)
    }
  }
  
  //-----------------

















module.exports = {reg,login}