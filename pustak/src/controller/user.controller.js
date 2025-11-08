const { generateToken } = require("../middleware/token");
const OtpModel = require("../model/otp.model");
const { UserModel } = require("../model/user.model");
const { encryptPassword, comparePassword, generateOtp } = require("../utils/helper");
const { wellComeMessage } = require("../utils/nodemailer");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                errorMsg: "Bad Request",
                message: "Please provide username, email and password.",
            });
        }

        const isExist = await UserModel.findOne({ email });
        if (isExist) {
            return res.status(409).json({
                success: false,
                statusCode: 409,
                errorMsg: "Conflict",
                message: "Email already exists.",
            });
        }

        console.log("Encrypting password...");
        const hashedPassword = encryptPassword(password);

        const newUser = {
            username,
            email,
            password: hashedPassword,
            status: true,
        };

        const user = await UserModel.create(newUser);

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        const otp = generateOtp();
        await wellComeMessage(email, username, otp);

        console.log("Generated OTP:", otp);

        const isOtp = await OtpModel.create({
            otp: otp.toString(),
            userId: user._id,
        });

        console.log("OTP saved:", isOtp);

        if (isOtp) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                message: `User successfully registered & OTP sent to your email: ${email}!`,
                data: userWithoutPassword,
            });
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: `User registration successful but OTP save failed.`,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

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
            const token = generateToken(email);

            if (user.isVerify) {
                if (isPasswordTrue)
                    return res.status(200).json({ success: true, statusCode: 200, message: "Login In Successfully", data: deletePassword, accessToken: token });
                else
                    return res.status(400).json({ success: false, statusCode: 400, errorMsg: "Bad Request", message: "Invalid password" });
            }

            return res.status(409).json({ success: false, statusCode: 409, message: "Please verify your email.." })
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

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                errorMsg: "Bad Request",
                message: "Please provide email and otp",
            });
        }

        if (otp.toString().length !== 4) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                errorMsg: "Bad Request",
                message: "otp must be 4 digit",
            });
        }
        // with help of user email we can find out the user 
        const user = await UserModel.findOne({ email: email });
        const dbOtp = await OtpModel.findOne({ userId: user._id });
        if (otp.toString() === dbOtp.otp) {

            const check = await UserModel.findOneAndUpdate({ email: user.email }, { $set: { isVerify: true } }, { new: true });
            console.log("check", check)
            return res.status(201).json({ success: true, statusCode: 201, message: "OTP verify successfully." })
        }

        return res.status(400).json({ success: false, statusCode: 400, message: "Invalid OTP." })


    } catch (error) {
        console.error("[ERROR]", error);
    }
}

const resentOtp = async (req, res) => {
    try {
        // 1. first get the email get user via email .
        const { email } = req.params;

        // 2. generate otp save into db with user id into otp model.
        const user = await UserModel.findOne({ email });
        console.log(user)
        const reOtp = generateOtp();
        await wellComeMessage(email, user.username, reOtp);
        const isReOtp = await OtpModel.create({
            otp: reOtp.toString(),
            userId: user._id,
        });

        if (isReOtp) {
            return res
                .status(201)
                .json({
                    success: true,
                    statusCode: 201,
                    message: `resend otp successfully ${email}!`,
                });
        } else {
            return res
                .status(201)
                .json({
                    success: false,
                    statusCode: 500,
                    message: `resend otp not successfully .. sent to failed otp`,
                });
        }

    } catch (error) {
        console.error("[ERROR]", error);
    }
};

module.exports = { register, login, updateUserName, verifyOtp, resentOtp }