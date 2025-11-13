const express = require('express')
const { register, login, updateUserName, verifyOtp, resentOtp } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/token');
const userRoutes = express.Router()

userRoutes.post('/register', register);
userRoutes.post('/login', login);
// middleware -- > verifyToken  -- user defined middleware
userRoutes.put('/update-username', verifyToken, updateUserName);
userRoutes.post('/verify-otp', verifyOtp)
userRoutes.get("/resent-otp/:email", resentOtp)

// create profile -- userpro -- 
module.exports = userRoutes;