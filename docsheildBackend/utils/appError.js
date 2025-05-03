const httpStatusText = require('./httpStatusText') ;
class AppError extends Error {

    constructor (message , statusCode , statusText) {
        super (message) ; 
        this.message = message ; 
        this.statusCode= statusCode ; 
        this.statusText = `${statusCode}` .startsWith(4)? `${httpStatusText.FAIL}` : `${httpStatusText.ERROR}` ; 
         this.isOperational = true;
    }

    // create(message , statusCode , statusText) {
    //     this.message = message ; 
    //     this.statusCode= statusCode ; 
    //     this.statusText = `${statusCode}` .startsWith(4)? `${httpStatusText.FAIL}` : `${httpStatusText.ERROR}` ; 
    //      this.isOperational = true;
    //     return this; 
    // }
}

module.exports =  AppError   ;

