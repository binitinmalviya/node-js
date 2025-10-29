const express = require('express');
const { getUser, register } = require('../controllers/users.controller');

const userRoute = express.Router()

userRoute.post('/register', register)

userRoute.get('/get-user', getUser)

module.exports = { userRoute }

// v1/api/users/get-user