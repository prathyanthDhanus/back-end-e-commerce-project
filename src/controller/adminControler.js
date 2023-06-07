const admin = require("../model/adminSchema");
const users = require("../model/userSchema")



//----------------admin registration------------------

const adminReg = async (req, res) => {
    try {
        const UserName = req.body.username;
        const Password = req.body.password;
        const identifyAdmin = await admin.findOne(req.body)
        if (identifyAdmin) {
            res.send("admin already exist")
        }
        const outcome = new admin({ username: UserName, password: Password })
        await outcome.save()
        res.send("Registered successfully,plese login")
    } catch (err) {
        console.log("error found", err)
    }
}

//-----------------admin login------------------------

const adminLogin = async (req, res) => {
    try {
        // const UserName = req.body.username;
        const Password = req.body.password;
        const identifyAdmin = await admin.findOne(req.body)
        if (!identifyAdmin) {
            res.send("Admin not found")
        } else {
            if (identifyAdmin.password == Password) {
                res.send("Login successfully")
            } else {
                res.send("Wrong password")
            }
        }
    } catch (err) {
        console.log("error found", err)
    }
}

//-----------------get all users---------------------

const getallUsers = async (req,res)=>{
    try{
        const userdata= await users.find()
        res.send(userdata)
    }catch(err){
        console.log("error found",err)
    }
}

//--------------get users by id-----------------------

const getUserId = async (req,res)=>{
   const userId = req.params.id 
    try{
        const userdata = await users.findById(userId)
        res.send(userdata)
    }catch(err){
        console.log('error found',err)
    }
}






module.exports = {adminReg,adminLogin,getallUsers,getUserId}