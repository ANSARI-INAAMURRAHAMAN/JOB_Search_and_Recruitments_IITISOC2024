const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, 'public/images_resume'))
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
});

const storage2 = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, 'public/images_cover'))
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
});

const storage3 = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, 'public/images_logo'))
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });
const upload3 = multer({ storage: storage3 });

module.exports = { upload, upload2, upload3 };