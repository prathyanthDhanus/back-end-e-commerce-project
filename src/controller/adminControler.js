const users = require("../model/userSchema")
const jwt = require("jsonwebtoken")


//-----------------admin login------------------------

const adminLogin = async (req, res) => {
    try {
        const UserName = process.env.ADMIN_USERNAME      //requiring username and password from .env
        const Password = process.env.ADMIN_PASSWORD

        const uname = req.body.username
        const pwd = req.body.password
        if (UserName == uname && Password == pwd) {
            res.send("Admin login successfully")
        } else {
            res.send("Wrong username and password")
        }
    } catch (err) {
        console.log("error found", err)
    }
}

//-----------------get all users---------------------

const getallUsers = async (req, res) => {
    try {
        const userdata = await users.find()
        res.send(userdata)
    } catch (err) {
        console.log("error found", err)
    }
}

//--------------get users by id-----------------------

const getUserId = async (req, res) => {
    const userId = req.params.id
    try {
        const userdata = await users.findById(userId)
        res.send(userdata)
    } catch (err) {
        console.log('error found', err)
    }
}






module.exports = { adminLogin, getallUsers, getUserId }