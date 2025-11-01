const express = require('express')
const { register, login, updateUserName } = require('../controller/user.controller')
const userRoutes = express.Router()

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.put('/update-username', updateUserName);

module.exports = { userRoutes }
