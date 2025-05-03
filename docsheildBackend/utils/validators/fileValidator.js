const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlwares/validatorMidlware");

exports.createFileValidator = [
  check("sender_id")
    .isInt({ min: 1 })
    .withMessage("Sender ID must be a valid integer"),

  check("approver_id")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("Approver ID must be a valid integer"),

  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title cannot exceed 255 characters"),

  check("description")
    .optional()
    .isLength({ max: 5000 })
    .withMessage("Description cannot exceed 5000 characters"),

  check("file_path")
    .notEmpty()
    .withMessage("File path is required"),

  check("file_type")
    .optional()
    .isLength({ max: 50 })
    .withMessage("File type must be 50 characters or fewer"),

  check("status")
    .optional()
    .isIn(["pending", "approved", "rejected"])
    .withMessage("Status must be one of: pending, approved, rejected"),

  check("vi")
    .notEmpty()
    .withMessage("AES Initialization Vector (vi) is required"),

  validatorMiddleware,
];

exports.updateFileValidator = [
  check("id")
    .isInt({ min: 1 })
    .withMessage("Invalid file ID"),

  check("status")
    .optional()
    .isIn(["pending", "approved", "rejected"])
    .withMessage("Status must be one of: pending, approved, rejected"),

  check("approved_at")
    .optional()
    .isISO8601()
    .withMessage("Approved date must be a valid ISO8601 date"),

  validatorMiddleware,
];

exports.getFileValidator = [
  check("id")
    .isInt({ min: 1 })
    .withMessage("Invalid file ID"),
  validatorMiddleware,
];

exports.deleteFileValidator = [
  check("id")
    .isInt({ min: 1 })
    .withMessage("Invalid file ID"),
  validatorMiddleware,
];