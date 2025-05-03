


const { body } = require("express-validator");
const validatorMiddleware = require('../../middlwares/validatorMidlware'); // Import your middleware to handle errors
const db = require("../../models");
const { default: slugify } = require('slugify');


const User = db.users ;

exports.signupValidator = [
  // Validate username
  body('username')
  .notEmpty().withMessage('Username is required')
  .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
  .custom((val, { req }) => {
      req.body.slug = slugify(val);  // Automatically slugify the username
      return true;
  }),

body('email')
  .isEmail().withMessage('Invalid email format')
  .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
          return Promise.reject('Email is already in use');
      }
  }),

// body('phone')
//   .notEmpty().withMessage('Phone number is required')
//   .isMobilePhone().withMessage('Invalid phone number')
//   .custom(async (phone) => {
//       const existingUser = await User.findOne({ where: { phone } });
//       if (existingUser) {
//           return Promise.reject('Phone is already in use');
//       }
//   }),

body('password')
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

body('role')
  .optional()
  .isIn(['employer', 'approval']).withMessage('Role must be either admin or user'),
  

  validatorMiddleware,
];

exports.loginValidator = [
    // Validate email
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(), 

  // Validate password
  body("password")
    .notEmpty()
    .withMessage("Password is required") , 

  // Apply the middleware to handle errors
  validatorMiddleware,
];

