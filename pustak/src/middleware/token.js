const { sign, verify } = require("jsonwebtoken")

const generateToken = (payload) => {
    try {
        console.log("Token is Generating ..");

        console.log("Payload ", payload);

        const token = sign({ data: payload }, "abcdefghklimnopqrst", { expiresIn: '1m' })
        console.log("Token is Generated ..", token);
        return token
    } catch (error) {
        console.log("Failed to generate token ..", error.message);
    }
}

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        console.log('token', token);

        if (token === undefined) {
            return res.status(400).json({ errMessage: "Bad Request token must be send" })
        }

        verify(token, "abcdefghklimnopqrst");
        next()
    } catch (error) {
        return res.status(403).json({ errMessage: "Unauthorized" })
    }
}

//  key --- ajdwiahdoawak + email , _id , {} --- danwdiadiadgaigdi

module.exports = { generateToken, verifyToken }