const crypto = require('node:crypto');


const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const multer = require('multer');



const AppError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require("../middlwares/asyncWrapper");
const db = require('../models');
const User = db.users;
const uploadImageMiddlware = require('../middlwares/uploadSingleFile');
// const  sendEmail  = require('../utils/sendEmail')  ; 
const { createToken } = require('../utils/createToken');



//it is just for user  : 







exports.signup = asyncWrapper(async (req, res, next) => {
  //1- create user  : 
 console.log("req.body : " +req.body) ; 
  const user = await User.create(
    req.body
  );


  //2- Generate token : 
  const token = await createToken(user.id)
  res.status(201).json({ data: user, token })
})


exports.login = asyncWrapper(async (req, res, next) => {
  //1) check if password and email in the body (valid) 
  //2) check if uer exist & check if the passwrd correct 
  //3 ) generate Token 
  const { email } =  req.body;



  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError('incorrect eamil or password', 404, httpStatusText.FAIL));
  }


  const token = await createToken(user.id);
  res.status(201).json({ data: user, token })


});

exports.protect = asyncWrapper(async (req, res, next) => {
  //1) check if token exist 
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  }

  if (!token) {
    return next(new AppError('you are not login , please login to get acess to this route', 401, httpStatusText.FAIL));
  }
  //2) verfiy that the tokn is valid 
  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);

  //3) check if user exist : 
  const currecntUser = await User.findByPk(decoded.userId);


  if (!currecntUser) {
    return next(new AppError('the user that belong to this token no longer exist', 401, httpStatusText.FAIL));
  }


  //4) check if user change his password after token created 
  if (currecntUser.passwordChangedAt) {
    passchangeTimerStamp = parseInt(
      currecntUser.passwordChangedAt.getTime() / 1000,
      10
    );
    //password changed after token created 
    if (passchangeTimerStamp > decoded.iat) {
      console.log(passchangeTimerStamp, decoded.iat);
      return next(new AppError('user recentlly change his password , please login again', 401, httpStatusText.FAIL));
    }

  }
  console.log(currecntUser.active)  ; 


  //check if the user is active : 
  

  req.user = currecntUser;
  next();
});

exports.allowedTo = (...roles) => asyncWrapper(async (req, res, next) => {
  //1- acess roles : 
  //2- acess regustred user ;
  if (!roles.includes(req.user.role)) {
    return next(new AppError('your are not allowd to acess this route', 403, httpStatusText.FAIL));
  }
  next();

});

// exports.forgotPassword = asyncWrapper(async (req, res, next) => {
//   //1-get user bu email : 
//   console.log(req.body.email);
//   const user = await User.findOne({
//     where: {
//       email: req.body.email
//     }
//   });
//   if (!user) {
//     return next(new AppError('there is no user for this email', 404));
//   }

//   //2-if user exist , generate random 6 digits and hash it  :  
//   const resetCode = (Math.floor(100000 + Math.random() * 900000)).toString();
//   const hashedResetCode = crypto
//     .createHmac('sha256', process.env.JWT_SECRET_KEY)
//     .update(resetCode)
//     .digest('hex');

//   user.passwordResetCode = hashedResetCode;
//   //add expiration time for password reset code (10 min)

//   user.passwordResetExpired = Date.now() + 10 * 60 * 1000;

//   await user.save();
  
//   const message = `hi ${user.username} \n We received a request to reset your password on TruckLink app \n ${resetCode} \n eter this code to complete reset`
//   // sned the reset code via email : 
 

//   await sendEmail.sendEmail({
//     email: user.email ,
//     subject: 'your password reset code (valid for 10 min)' , 
//      message , 
//   });
  

  
//   await res.status(200).json(  httpStatusText.FAIL , {message : "Reset code sent to email" }) ;
  
  






// }); 

// fsnlvqgogdqsiicp