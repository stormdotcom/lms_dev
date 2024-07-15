const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize multer with the storage engine and limits
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20000000, // 1 MB file size limit
    },
    // fileFilter: (req, file, cb) => {
    //     const fileTypes = /jpeg|jpg|png|pdf|doc|docx/;
    //     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //     const mimetype = fileTypes.test(file.mimetype);

    //     if (mimetype && extname) {
    //         return cb(null, true);
    //     } else {
    //         cb(new Error('File type not supported'));
    //     }
    // }
});

const videoUpload = multer({
    storage: storage,
    limits: {
        fileSize: 200000000, // 1 MB file size limit
    },
    // fileFilter: (req, file, cb) => {
    //     const fileTypes = /jpeg|jpg|png|pdf|doc|docx/;
    //     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //     const mimetype = fileTypes.test(file.mimetype);

    //     if (mimetype && extname) {
    //         return cb(null, true);
    //     } else {
    //         cb(new Error('File type not supported'));
    //     }
    // }
});
const vidUpload = multer({ dest: 'uploads/' });
module.exports = {
    upload,
    videoUpload,
    vidUpload
};
