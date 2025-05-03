
const httpstatusText = require('./utils/httpStatusText')
const express = require('express') ; 
const dotenv = require("dotenv") ; 
const app = express() ; 
var morgan = require('morgan') ; 

dotenv.config({path : 'config.env'}) ; 


app.use(express.json()); 


app.use((req, res, next) => {
    console.log('Incoming Request:', req.method, req.url);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});



const fileRouter = require('./routes/file_Router') ; 
const authRouter = require('./routes/authRoute') ; 
const fileAcessRouter = require('./routes/fileAcess_Router') ; 
  
const globalError = require('./middlwares/errorMidlware copy');
const AppError = require('./utils/appError');
const { fileAccess } = require('./models');

    ; 
app.use('/api/v1/auth' ,  authRouter )      ; 
app.use('/api/v1/files' ,  fileRouter) ; 
app.use('/api/v1/fileAccess' , fileAcessRouter) ; 



app.use(globalError) ;

app.all("*" , (req , res , next) => {
    const appError = new AppError( `Can't find this route : ${req.originalUrl}` ,400 , httpstatusText.ERROR ); 
    next(appError) ; 

}
) ;

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))  ;  
    console.log(`mode : ${process.env.NODE_ENV}`) ; 
    }
 
    
    const server = app.listen(
        process.env.PORT , () => {
        console.log('App running') ; 
    }) ; 


    
    process.on("unhandledRejection" , (err) => {
        console.error(`unhandeledRejection Errors : ${err}`) ; 
        server.close(() => { 
           console.error('shutting down....')
           process.exit(1) ; 
        })
    }
    )
    
