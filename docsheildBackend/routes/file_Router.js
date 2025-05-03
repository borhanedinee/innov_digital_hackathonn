const authController = require("../controllers/authController");
const fileController = require("../controllers/file_controller");
const fileValidator = require("../utils/validators/fileValidator");

const express = require('express');
const router = express.Router();

// If you had reviews for files, you would use this:
// const reviewRouter = require('./reviewRoute');
// router.use("/:fileId/reviews", reviewRouter);

router.route('/')
    .get(
        authController.protect,
        fileController.getAllFiles
    )
    .post(
        
        authController.protect,
        // fileController.saveUploadedFile,
        fileController.uploadFile , 
        fileController.saveUploadedFile , 
        // fileValidator.createFileValidator,
        fileController.createFile
    );

router.route("/:id")
    .get(fileController.getFile)
    .put(
        authController.protect,
        fileController.updateFile
     )
    .delete(
        // authController.protect,
        fileController.deleteFile
    );

module.exports = router;