//it is just for admin : 
const asyncWrapper = require('../middlwares/asyncWrapper');
const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const User = db.users; // Assuming the User model is defined in the `db` object
const { default: slugify } = require('slugify');
const Factory = require('./handlersFactory');
const uploadImageMiddlware = require('../middlwares/uploadSingleFile');
const httpStatusText = require('../utils/httpStatusText');
const sharp = require('sharp');
const { createToken } = require('../utils/createToken');


//just for logged users : 

exports.getLoggedUserData  = asyncWrapper ( async (req , res ,next) => {
  console.log()
  req.params.id = req.user.id ;
  next() ;

})

exports.updateLoggedUserPassword = asyncWrapper ( async (req , res , next) => {

  const user = await User.update(
    req.body , 
    {
      where: { id: req.user.id },
      individualHooks: true,
    } , 
  )
  if (user[0] === 0) {
    return next(new AppError('no document found fo this id', 404, httpStatusText.FAIL));
  }
  console.log(`this si user.id ${req.user.id}`) ;
  const updatedModel = await User.findByPk(req.user.id);
  const token = await createToken(req.user.id)  ;
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { updatedModel } , token});
  
}) ;

exports.deleteloggedUserData = asyncWrapper (async (req , res , next ) => {
    await User.update(
    {active : false}, 
    {
      where: { id: req.user.id },
      individualHooks: true,
    } ,
    
    res.status(204).json( { status: httpStatusText.SUCCESS , message : "user has been disactivated"  }   )  
  )
})






exports.changeUserPassword = asyncWrapper(async (req, res, next) => {

  console.log('ID:', req.params.id);
  const updatedDocument = await User.update(
    req.body , 
    {
      where: { id: req.params.id },
      individualHooks: true,
    } , 
  )
  if (updatedDocument[0] === 0) {
    return next(new AppError('no document found fo this id', 404, httpStatusText.FAIL));
  }
  const updatedModel = await User.findByPk(req.params.id);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { updatedModel } });
})

// CRUD operations for User
exports.getUsers = Factory.getAll(User, "users");
exports.getUser = Factory.getOne(User);
exports.createUser = Factory.creatOne(User) ; 
exports.updateUser = Factory.updateOne(User) ; 


