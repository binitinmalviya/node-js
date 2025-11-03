const bcrypt = require('bcrypt')
const saltRounds = 10;

const encryptPassword = (password) => {
    console.log("encryptPassword function generating the hash password using plain password and algorithm rounds");

    const hashPassword = bcrypt.hashSync(password, saltRounds);
    console.log('hashPassword generated ..... ', hashPassword);
    return hashPassword;
}


const comparePassword = (password, hashPassword) => {
    console.log("Password:", password, "Hash password", hashPassword);

    return bcrypt.compareSync(password, hashPassword)
}


// generate otp 

const generateOtp = () => {
    return Math.floor(1000 + Math.random(1, 9) * 1000);
}

module.exports = { encryptPassword, comparePassword, generateOtp }


