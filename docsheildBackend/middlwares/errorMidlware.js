
const AppError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText') ;
const dotenv = require('dotenv') ;
dotenv.config({path : 'config.env'}) ; 



const hundleJwtInvalidSignature = () => 
new AppError('invalid token , please login again...', 401, httpStatusText.FAIL)  ; 
const hundleJwtTokenExpired = () => 
new AppError('Expired token , please login again...', 401, httpStatusText.FAIL)  ; 


const globalError  = (err , req ,res , next) => {
    err.statusCode = err.statusCode || 500 ; 
    err.statusText = err.statusText || httpStatusText.ERROR ;
    err.message = err.message
    

    if (process.env.NODE_ENV == "development") {
        sendErrorForDev(err , res) ; 
    } else {
        if (err.name == "JsonWebTokenError"  ) {
          err  =  hundleJwtInvalidSignature() ; 
        }    ;
        if (err.name == "TokenExpiredError"  ) {
          err  =  hundleJwtTokenExpired() ; 
        }    ;
        sendErrorForProd(err , res) ;
    }
}


const sendErrorForDev = (err , res) => {
    return res.status(err.statusCode).json ({
        status : err.statusText , 
        error : err  ,
        message : err.message , 
        stack : err.stack 
    })
}

const sendErrorForProd = (err , res) => {
    return res.status(err.statusCode).json ({
        status : err.statusText , 
        message : err.message , 
    })
}

module.exports = globalError ; 