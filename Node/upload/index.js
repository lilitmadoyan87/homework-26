const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname.slice(file.originalname.lastIndexOf(".")-4, file.originalname.lastIndexOf(".")) + '-' + path.extname(file.originalname))
    }
})

module.exports.upload = multer({ storage: storage })