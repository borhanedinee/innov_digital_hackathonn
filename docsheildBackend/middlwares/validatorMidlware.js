const { validationResult } = require('express-validator'); 

const validatorMidlware  = (req, res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });

    }
    next() ; 
    // Call next() to proceed to the controller if no errors
}
module.exports = validatorMidlware ; 


