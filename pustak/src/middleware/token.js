const { sign, verify } = require("jsonwebtoken")

const generateToken = (payload) => {
    try {
        const token = sign({ data: payload }, "abcdefghklimnopqrst", { expiresIn: '1m' })
        return token
    } catch (error) {
        console.log("Failed to generate token ..", error.message);
    }
}

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (token === undefined) {
            return res.status(400).json({ errMessage: "Bad Request token must be send" })
        }
        verify(token, "abcdefghklimnopqrst");
        next()
    } catch (error) {
        return res.status(403).json({ errMessage: "Unauthorized" })
    }
}

module.exports = { generateToken, verifyToken }