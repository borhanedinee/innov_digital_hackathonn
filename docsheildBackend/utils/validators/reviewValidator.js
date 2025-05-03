const { check , body } = require('express-validator');

const db = require('../../models');


const validatorMidlware = require('../../middlwares/validatorMidlware');
const { where } = require('sequelize');

exports.createReviewValidator = [
    check('product_id')
    .notEmpty().withMessage('Product ID is required')
    .custom(async (value, { req }) => {
        // Check if product exists
        const product = await db.products.findByPk(value);
        if (!product) {
            throw new Error('Product ID does not exist');
        }

        // Check if the user has already reviewed this product
        const review = await db.reviews.findOne({
            where: {
                user_id: req.user.id,
                product_id: value, 
            }
        });

        if (review) {
            throw new Error('You have already reviewed this product');
        }

        return true; 
    }),
    
    check('rating')
        .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
        .notEmpty().withMessage('Rating is required'),
    check('comment')
        .optional()
        .isString().withMessage('Comment must be a string'),
    body().custom( async(_, { req }) => {
        req.body.user_id = req.user.id;
    
    }),
    validatorMidlware,
];

exports.updateReviewValidator = [
    check("id").isInt({ min: 1 }).withMessage("Invalid product ID")
    .custom( async (val, { req }) => {
        req.body.user_id = req.user.id;
        const Review = await db.reviews.findByPk(val);
        if (Review) {
            if (Review.user_id !== req.user.id) {
                throw new Error('you are not allowed to performe this action');
            }
        }
    }),
    check('rating')
        .optional()
        .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    check('comment')
        .optional()
        .isString().withMessage('Comment must be a string'),
    body().custom( async (_, { req }) => {
        req.body.user_id = req.user.id;
        // const Review = await db.reviews.findByPk(req.params.id);
       
      
    }),
    validatorMidlware,
];

exports.deleteReviewValidator = [
    check("id").isInt({ min: 1 }).withMessage("Invalid product ID")
    .custom( async (val, { req }) => {
        req.body.user_id = req.user.id;
        const Review = await db.reviews.findByPk(val);
        if (Review) {
            if (Review.user_id !== req.user.id) {
                throw new Error('you are not allowed to performe this action');
            }
        }
    }),

    validatorMidlware,
];

