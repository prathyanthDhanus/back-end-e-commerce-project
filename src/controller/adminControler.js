const users = require("../model/userSchema")
const jwt = require("jsonwebtoken")


//-----------------admin login------------------------

const adminLogin = async (req, res) => {
    
        const username = process.env.ADMIN_USERNAME      //requiring username and password from .env
        const password = process.env.ADMIN_PASSWORD

        const USERNAME = req.body.username
        const PASSWORD = req.body.password

        if (username == USERNAME && password == PASSWORD) {
            // res.send("Admin login successfully")
            const token = jwt.sign({ username }, "adminscrtkey", { expiresIn: "24h" })
            return res.status(200).json({ status: "success", message: "Admin logged in successfully", token });
        }

        res.json({ status: "failure", message: "Wrong username or password", error_message: "username or password mismatch" })

}

//-----------------get all users---------------------

const getAllUsers = async (req, res) => {
    
        const userdata = await users.find()

        res.json({

            status: "success",

            message: "List of users",

            data: userdata
        })

}

//--------------get users by id-----------------------

const getUserId = async (req, res) => {
    const userId = req.params.id
    
        const userdata = await users.findById(userId)
        res.send({

            status: "success",

            message: "User details",

            data: userdata
        })
}






module.exports = { adminLogin, getAllUsers, getUserId }