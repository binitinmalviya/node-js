const multer = require("multer");
const path = require('path')
const storage = multer.diskStorage({
    // store files in src/uploads (one level up from utils)
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname) || '';
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
})
//  bookImage-371931873917-3618361371381738.JPG

//  nitin1371371031.png  /upload/nitin1371371031.png   http://nitin.dev/upload/nitin1371371031.png

let upload = multer({ storage: storage })

module.exports = { upload }

// ../