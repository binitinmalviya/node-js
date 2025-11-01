const { UserModel } = require("../model/user.model");
const bcrypt = require('bcrypt');
const { encryptPassword, comparePassword } = require("../utils/helper");
const register = async (req, res) => {
    try {
        // object de- structure
        const { username, email, password } = req.body;
        /*
        1. check user all ready exist
        2. save the user
        */

        console.log(username);


        if (!username || !email || !password) {
            return res.status(400).json({ success: false, statusCode: 400, errorMsg: "Bad Request", message: "Invalid input filed's" })
        }

        const isExist = await UserModel.findOne({ email: email });

        if (isExist) {
            return res.status(400).json({ success: false, statusCode: 409, errorMsg: "Conflict", message: "Email is all-ready exist" })
        }

        console.log("....");

        console.log("calling encryption password function encrypt the password...");

        const newUser = { username, email, password: encryptPassword(password), status: true }

        console.log("User saved with hash password", newUser);

        const user = await UserModel.create(newUser)
        //  delete the password from user object
        const userWithOutPasswordUser = user.toObject();
        delete userWithOutPasswordUser.password;

        return res.status(201).json({ success: true, statusCode: 201, message: "user successfully registered ..", data: userWithOutPasswordUser })

    } catch (error) {

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, statusCode: 400, errorMsg: "Bad Request", message: "Invalid input filed's" })
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ success: false, statusCode: 404, errorMsg: "Not Found", message: "User not found please register .." })
        } else {
            console.log(user);

            const isPasswordTrue = comparePassword(password, user.password);
            const deletePassword = user.toObject()
            delete deletePassword.password
            if (isPasswordTrue)
                return res.status(200).json({ success: true, statusCode: 200, message: "Login In Successfully", data: deletePassword });
            else
                return res.status(400).json({ success: false, statusCode: 400, errorMsg: "Bad Request", message: "Invalid password" });

        }


    } catch (error) {

    }
}

const updateUserName = async (req, res) => {
    try {
        const { email, username } = req.body;
        console.log(email, username);

        if (!email) {
            return res.status(404).json({ success: false, statusCode: 404, errorMsg: "Not Found", message: "Invalid request" })
        }

        const user = await UserModel.findOneAndUpdate({ email: email }, { $set: { username: username } }, { new: true });
        //  falsy null [] "" 

        if (!user) {
            return res.status(404).json({ success: false, statusCode: 404, errorMsg: "Not Found", message: "User not found" });
        }

        return res.status(201).json({ success: true, statusCode: 201, message: "User name updated", data: user });

    } catch (error) {

    }
}

module.exports = { register, login, updateUserName }