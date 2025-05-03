const multer = require('multer');
const path = require('path');
const AppError = require('../utils/appError');
const { v4: uuidv4 } = require('uuid');

// Set up disk storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/files'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `file-${uuidv4()}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

// Allow all file types
const multerFilter = (req, file, cb) => {
  if (file) {
    cb(null, true);
  } else {
    cb(new AppError('File upload failed', 400), false);
  }
};

// Upload single file middleware
exports.uploadSingleFile = (fieldName) => {
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  });

  return upload.single(fieldName);
};