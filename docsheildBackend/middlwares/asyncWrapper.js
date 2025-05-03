module.exports = (fn) => {
    return (req , res , next ) => {
        fn(req,res,next).catch( (err) => {
            next (err) ; // it will take this error to the middle waer 
        }
        ) ; 
    }
}