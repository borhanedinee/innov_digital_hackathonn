const { check , body} = require('express-validator') ;

const { default: slugify } = require('slugify');
const validatorMidlware = require('../../middlwares/validatorMidlware');

exports.getSubCategoryValidator = [
    // check('id').isMongoId().withMessage('invalid category id') , 
    validatorMidlware , 
] ;

exports.createSubCagtegoryValidator = [
    check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name is too short")
    .isLength({ max: 32 })
    .withMessage("Category name is too long"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val, { lower: true });
      return true;
    }),
    validatorMidlware ,
] ;


exports.updateSubCategoryValidator = [
    body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMidlware,
    
] ;