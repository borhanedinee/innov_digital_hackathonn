const express = require('express');

const router = express.Router();
const authValidator = require('../utils/validators/authValidator');
const authController = require('../controllers/authController');






const userValidator = require('../utils/validators/userValidator');

    




//all users 


router.route('/signup')
    .post(
        

        authValidator.signupValidator , 
        authController.signup         , 
    );
router.route('/login')
    .post(
        authValidator.loginValidator  , 
        authController.login , 
    );

// router.route('/forgotPassword')
//     .post(
        
//         authValidator.loginValidator , 
//         // authController.forgotPassword , 
//     );



module.exports = router ; 