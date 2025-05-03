const multer = require('multer');
const AppError = require('../utils/appError');


exports.uploadMultipleImages = (fields) => {
    const multerStorage = multer.memoryStorage();
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new AppError('only images allowed', 400), false);
        }
    }
    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
    return upload.fields(fields)
    


} 
