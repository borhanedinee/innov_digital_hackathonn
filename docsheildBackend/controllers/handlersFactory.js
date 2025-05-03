

const asyncWrapper = require('../middlwares/asyncWrapper');


const { default: slugify } = require('slugify');
const AppError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const ApiFeatures = require('../utils/apiFeatures') ; 
const Factory = require('./handlersFactory');
const { where, json } = require('sequelize');





  exports.getAll = (model , includeOptions = []  ) => asyncWrapper(
    async (req, res) => {
      
      const documentCount = await model.count() ; 
      const apiFeatures  = new ApiFeatures(
        {}, 
        req.query ,
      ) ;  
      
      apiFeatures.filter().paginate(documentCount).sort();

      // 💡 Conditionally apply joins only if no fields are specified
      if (!req.query.fields) {
        apiFeatures.join(includeOptions);
      }
  
      apiFeatures.limitFields().serach();

      const documents = await model.findAll(
      
          apiFeatures.sequelizeQuery ,
      )
      const {  paginationResult } =  apiFeatures ;
       res.json({ status: httpStatusText.SUCCESS, results: documents.length, paginationResult  , data:  documents  });
    }
  )

  exports.getOne = (model , includeOptions = []) => asyncWrapper(
    async (req, res, next) => {
      const { id } = req.params;
      const document = await model.findOne({
        where : {id} , 
        include : includeOptions , 
      }) ; 

      if (!document) {
        return next(new AppError('no document found fo this id', 404, httpStatusText.FAIL));
      }
      res.status(200).json({ status: httpStatusText.SUCCESS, data: { document } });
    }
  )

  exports.updateOne = (model) => asyncWrapper(
    async (req, res, next) => {
      const { id } = req.params;

      console.log("############id : " + id) ; 
    
      const updatedDocument = await model.update(
        req.body ,
        {
          where: { id: id } , 
        }
      )
  
      if (updatedDocument[0] === 0) {
        return next(new AppError('no document found fo this id', 404, httpStatusText.FAIL));
      }
  
  
      const updatedModel = await model.findByPk(req.params.id);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: { updatedModel } });
  
    }
  )

  exports.creatOne = (model) => asyncWrapper(
    async (req, res, next) => {

      const newDocument = await model.create(
         req.body,
      )

      console.log("Final req.body: ", req.body);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: newDocument });
  
    }
  )

  exports.deleteOne = (model) => asyncWrapper(
    async (req, res, next) => {
      const { id } = req.params;
      const deletedDocument = await model.destroy({
        where: { id: id }
      })
  
      if (!deletedDocument) {
        return next(new AppError('no document found fo this id', 404, httpStatusText.FAIL));
      }
      res.status(200).json({ status: httpStatusText.SUCCESS });
  
    }
  )