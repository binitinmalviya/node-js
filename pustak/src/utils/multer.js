const multer = require("multer");
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, res, cb) => cb(null, path.join(__dirname, 'uploads')),
    filename: (req, res, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})


let upload = multer({ storage: storage })

module.exports = { upload }