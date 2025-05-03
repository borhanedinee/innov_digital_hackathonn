const { check, body , param } = require("express-validator");
const validatorMidlware = require("../../middlwares/validatorMidlware");
const db = require("../../models"); 


exports.createAddressValidator = [
    check("full_name")
        .notEmpty().withMessage("Full name is required")
        .isString().withMessage("Full name must be a string")
        .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),

    check("phone")
        .notEmpty().withMessage("Phone number is required")
        .isMobilePhone().withMessage("Invalid phone number format"),

    check("city")
        .notEmpty().withMessage("City is required")
        .isString().withMessage("City must be a string"),

    check("street")
        .notEmpty().withMessage("Street address is required")
        .isString().withMessage("Street must be a string"),

    check("postal_code")
        .notEmpty().withMessage("Postal code is required")
        .isPostalCode("any").withMessage("Invalid postal code format"),

    check("country")
        .notEmpty().withMessage("Country is required")
        .isString().withMessage("Country must be a string"),


    body().custom((_, { req }) => {
        if (req.body.user_id != req.user.id) {
            throw new Error("You are not allowed to update this address");
        } 
        req.body.user_id = req.user.id; // Attach the user ID from authentication
        return true;
    }),

    validatorMidlware,
];

exports.updateAddressValidator = [
    check("id")
        .isInt({ min: 1 }).withMessage("Invalid address ID")
        .custom(async (val, { req }) => {
            const address = await db.addresses.findByPk(val);
            if (!address) {
                throw new Error("Address not found");
            }
            if (address.user_id !== req.user.id) {
                throw new Error("You are not allowed to update this address");
            }
        }),

    check("full_name")
        .optional()
        .isString().withMessage("Full name must be a string")
        .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),

    check("phone")
        .optional()
        .isMobilePhone().withMessage("Invalid phone number format"),

    check("city")
        .optional()
        .isString().withMessage("City must be a string"),

    check("street")
        .optional()
        .isString().withMessage("Street must be a string"),

    check("postal_code")
        .optional()
        .isPostalCode("any").withMessage("Invalid postal code format"),

    check("country")
        .optional()
        .isString().withMessage("Country must be a string"),


    validatorMidlware,
];

exports.deleteAddressValidator = [
    check("id")
        .isInt({ min: 1 }).withMessage("Invalid address ID")
        .custom(async (val, { req }) => {
            const address = await db.addresses.findByPk(val);
            if (!address) {
                throw new Error("Address not found");
            }
            if (address.user_id !== req.user.id) {
                throw new Error("You are not allowed to delete this address");
            }
        }),

    validatorMidlware,
];

exports.getAdressValidator = [
    check("id")
        .isInt({ min: 1 }).withMessage("Invalid address ID")
        .custom(async (val, { req }) => {
            const address = await db.addresses.findByPk(val);
            if (!address) {
                throw new Error("Address not found");
            }
            if (address.user_id !== req.user.id) {
                throw new Error("You are not allowed to get this address");
            }
        }),


    validatorMidlware,
];


exports.setDefaultAddressValidator = [
    check("id")
      .notEmpty()
      .withMessage("Address ID is required")
      .isInt()
      .withMessage("Address ID must be an integer")
      .custom(async (id, { req }) => {
        const address = await db.addresses.findOne({
          where: { id, user_id: req.user.id }
        });
  
        if (!address) {
          throw new Error("Address not found or does not belong to you");
        }
  
        return true;
      }),
  
    validatorMidlware
  ];