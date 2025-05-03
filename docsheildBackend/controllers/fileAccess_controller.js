
const db = require('../models');
const FileAccess = db.fileAccess;

const factory = require('./handlersFactory');

// Middleware to set file_id and user_id if not provided in body
const setFileAndUserIds = (req, res, next) => {
  if (!req.body.file_id && req.params.fileId) {
    req.body.file_id = req.params.fileId;
  }
  if (!req.body.user_id && req.user) {
    req.body.user_id = req.user.id;
  }
  next();
};

// Create a filter object to get file access for a specific file
const createFilterObject = (req, res, next) => {
  if (req.params.fileId) {
    req.query = { file_id: req.params.fileId, ...req.query };
  }
  next();
};

// Factory-based CRUD operations
const getAllFileAccess = factory.getAll(FileAccess, [
  {
    model: db.users,
    attributes: ['id', 'username'],
  },
  {
    model: db.files,
    attributes: ['id', 'title'],
  },
]);

const createFileAccess = factory.creatOne(FileAccess);
const getFileAccess = factory.getOne(FileAccess, [
  {
    model: db.users,
    attributes: ['id', 'username'],
  },
  {
    model: db.files,
    attributes: ['id', 'title'],
  },
]);
const updateFileAccess = factory.updateOne(FileAccess);
const deleteFileAccess = factory.deleteOne(FileAccess);

module.exports = {
  createFileAccess,
  getAllFileAccess,
  getFileAccess,
  updateFileAccess,
  deleteFileAccess,
  createFilterObject,
  setFileAndUserIds,
};