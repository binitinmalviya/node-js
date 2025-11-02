const express = require('express')
const { register, login, updateUserName } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/token');
const userRoutes = express.Router()

userRoutes.post('/register', register);
userRoutes.post('/login', login);
// middleware -- > verifyToken  -- user defined middleware
userRoutes.put('/update-username', verifyToken, updateUserName);

module.exports = { userRoutes }
