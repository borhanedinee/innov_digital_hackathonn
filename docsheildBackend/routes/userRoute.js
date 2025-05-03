

const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../utils/validators/userValidator');

const authController = require('../controllers/authController');





const router = express.Router();

router.route("/getMe")
    .get(
        authController.protect , 
        userController.getLoggedUserData ,
        userController.getUser,
    ) ; 

router.route ("/changeMyPassword" ) .put(
      authController.protect ,
      userValidator.changeMyPasswordValidator, 
      userController.updateLoggedUserPassword , 
      
     )        
router.route ("/deleteMe" ) .delete(
      authController.protect ,
     userController.deleteloggedUserData , 
     )    
//permittd just for ligged user : 

     
router.route("/changePasswrod/:id")
.put(
    userValidator.changeUserPasswordValidator,
    userController.changeUserPassword
    );

//permitted for admin : 


router.route('/')
    .get(
   
        userController.getUsers 
    )
    .post(
        userValidator.createUserValidator , 
        userController.createUser 
    )
router.route("/:id")
    .get(
        userController.getUser,
    )
    .put(
        userValidator.updateUserValidator , 
        userController.updateUser ,
    )



module.exports = router; 