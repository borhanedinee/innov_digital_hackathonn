const asyncWrapper = require('../middlwares/asyncWrapper');
const db = require('../models');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const File = db.files; // <- Changed from Product to File
const Sequelize = require('sequelize');
const httpStatusText = require('../utils/httpStatusText');
const factory = require('./handlersFactory');
const ApiFeatures = require('../utils/apiFeatures');
const { uploadSingleFile } = require('../middlwares/uploadSingleFile'); // Make sure you create/upload this middleware

// Upload file middleware (not images now)
const uploadFile = uploadSingleFile('file'); // expects a single uploaded file with key = "file"

const saveUploadedFile = asyncWrapper(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: 'No file uploaded',
    });
  }

  const fileName = `file-${uuidv4()}-${Date.now()}-${req.file.originalname}`;
  const filePath = `uploads/files/${fileName}`;

  console.log(filePath) ; 

  // If you want to process the file, you can use sharp or move it manually.
  // For simplicity, let's assume the middleware already stores it.

  req.body.file_path = filePath;
  req.body.file_type = req.file.mimetype.split('/')[1];

  next();
});

const getAllFiles = factory.getAll(File, 
  [
   {
      model: db.users,
      attributes: ['id', 'username'],
    },
    {
      model: db.fileAccess,
      
    },
]

);

const getFile = factory.getOne(File,
//    [
//   {
//     model: db.users,
//     as: 'Sender',
//     attributes: ['id', 'username', 'email'],
//   },
//   {
//     model: db.users,
//     as: 'Approver',
//     attributes: ['id', 'username', 'email'],
//   },
// ]
);

const createFile = factory.creatOne(File);
const updateFile = factory.updateOne(File);
const deleteFile = factory.deleteOne(File);

module.exports = {
  createFile,
  getAllFiles,
  getFile,
  updateFile,
  deleteFile,
  uploadFile,
  saveUploadedFile,
};