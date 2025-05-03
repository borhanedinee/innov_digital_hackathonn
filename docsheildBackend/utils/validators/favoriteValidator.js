const { check, body } = require("express-validator");
const db = require("../../models");
const validatorMidlware = require("../../middlwares/validatorMidlware");

exports.createFavoriteValidator = [
  check("user_id")
  .custom((val, { req }) => {
    if (val !== undefined) { 
      throw new Error("You are not allowed to send user_id in the request body");
    }
    return true;
  }), 
  check("product_id")
    .notEmpty()
    .withMessage("product ID is required")
    .custom(async (value, { req }) => {
      // Check if ad exists
      const Product = await db.products.findByPk(value);
      if (!Product) {
        throw new Error("Product ID does not exist");
      }

      // Check if the user has already favorited this ad
      const favorite = await db.favorites.findOne({
        where: {
          user_id: req.user.id,
          product_id: value,
        },
      });

      if (favorite) {
        throw new Error("You have already favorited this product");
      }

      return true;
    }),

    body().custom(async (_, { req }) => {
        req.body.user_id = req.user.id;
    }),


  validatorMidlware,
];

exports.deleteFavoriteValidator = [
  check("id")
    .isInt({ min: 1 }) 
    .withMessage("Invalid favorite ID")
    .custom(async (val, { req }) => {

      const favorite = await db.favorites.findByPk(val);
      if (favorite) {
        if (favorite.user_id != req.user.id) {
          console.log(favorite.user_id) ; 
          console.log(req.user.id) ; 
          throw new Error("You are not allowed to perform this action");
        }
      } else {
        throw new Error("Favorite not found");
      }
    }),

  validatorMidlware,
];