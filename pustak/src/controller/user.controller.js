const { UserModel } = require("../model/user.model");

const register = async (req, res) => {
    try {
        // object de- structure
        const { username, email, password } = req.body;
        /*
        1. check user all ready exist
        2. save the user
        */

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, statusCode: 400, errorMsg: "Bad Request", message: "Invalid input filed's" })
        }

        const isExist = await UserModel.findOne({ email: email });

        if (isExist) {
            return res.status(400).json({ success: false, statusCode: 409, errorMsg: "Conflict", message: "Email is all-ready exist" })
        }

        const newUser = { username, email, password, status: true }
        const user = await UserModel.create(newUser)
        //  delete the password from user object


        return res.status(201).json({ success: true, statusCode: 201, message: "user successfully registered ..", data: user })

    } catch (error) {

    }
}

const login = async (req, res) => {
    try {
        return `Login`
    } catch (error) {

    }
}

module.exports = { register, login }