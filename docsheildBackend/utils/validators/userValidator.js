const { check, body } = require('express-validator');
const validatorMidlware = require('../../middlwares/validatorMidlware');
const { default: slugify } = require('slugify');
var bcrypt = require('bcrypt');
const db = require('../../models');
const User = db.users;

exports.createUserValidator = [
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
                
            }
        }),

    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Invalid phone number')
        .custom(async (phone) => {
            const existingUser = await User.findOne({ where: { phone } });
            if (existingUser) {
                return Promise.reject('Phone is already in use');
            }
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('role')
        .optional()
        .isIn(['admin', 'user']).withMessage('Role must be either admin or user'),
        

    validatorMidlware,
];

// UPDATE User Validator
exports.updateUserValidator = [
    body('username')
        .optional()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .custom((val, { req }) => {
            if (val) req.body.slug = slugify(val);
            return true;
        }),

    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .custom(async (email, { req }) => {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser && existingUser.id !== req.params.id) {
                return Promise.reject('Email is already in use');
            }
        }),

    body('phone')
        .optional()
        .isMobilePhone().withMessage('Invalid phone number')
        .custom(async (phone, { req }) => {
            const existingUser = await User.findOne({ where: { phone } });
            if (existingUser && existingUser.id !== req.params.id) {
                return Promise.reject('Phone is already in use');
            }
        }),

    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('role')
        .optional()
        .isIn(['admin', 'user']).withMessage('Role must be either admin or user'),
    

    validatorMidlware,
];


exports.changeUserPasswordValidator = [
    body("currentPassword")
        .notEmpty()
        .withMessage("you must enter your current passwrod")
        .custom(async (val, { req }) => {
            //1) verfiy current password : 
            const user = await User.findByPk(req.params.id)
            if (!user) {
                throw new Error("there is no user for this id")
            }

            const isCorrectPassword = await bcrypt.compare(
                req.body.currentPassword,
                user.password
            )


            if (!isCorrectPassword) {
                throw new Error('incorrect current password');
            }


        }),

    body("passwordConfirm")
        .notEmpty()
        .withMessage("you must enter the password confirm")
        .custom(async (val, { req }) => {

            //2) verify current password : 
            if (val !== req.body.password) {
                throw new Error('password confirmation incorrect');
            }
            return true;

        }),
    body("password")
        .notEmpty()
        .withMessage("you must enter the password"),

    validatorMidlware,
];

exports.changeMyPasswordValidator = [
    body("currentPassword")
        .notEmpty()
        .withMessage("you must enter your current passwrod")
        .custom(async (val, { req }) => {
            //1) verfiy current password : 
            const user = await User.findByPk(req.user.id)
            if (!user) {
                throw new Error("there is no user for this id")
            }

            const isCorrectPassword = await bcrypt.compare(
                req.body.currentPassword,
                user.password
            )


            if (!isCorrectPassword) {
                throw new Error('incorrect current password');
            }


        }),

    body("passwordConfirm")
        .notEmpty()
        .withMessage("you must enter the password confirm")
        .custom(async (val, { req }) => {

            //2) verify current password : 
            if (val !== req.body.password) {
                throw new Error('password confirmation incorrect');
            }
            return true;

        }),
    body("password")
        .notEmpty()
        .withMessage("you must enter the password"),

    validatorMidlware,
];

// DELETE User Validator
exports.deleteUserValidator = [
    check('id')
        .isUUID()
        .withMessage('Invalid User ID'),
    validatorMidlware,
];