const fileAccessController = require("../controllers/fileAccess_controller");
const express = require("express");



const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    fileAccessController.createFilterObject,
    fileAccessController.getAllFileAccess
  )
  .post(
    authController.protect,
    authController.allowedTo("approval"),
    fileAccessController.setFileAndUserIds,
    fileAccessController.createFileAccess
  );

router
  .route("/:id")
  .get(fileAccessController.getFileAccess)
  .put(
    authController.protect,
    authController.allowedTo("approval"),
 
    fileAccessController.updateFileAccess
  )
  .delete(
    authController.protect,
    authController.allowedTo("approval"),
    fileAccessController.deleteFileAccess
  );

module.exports = router;