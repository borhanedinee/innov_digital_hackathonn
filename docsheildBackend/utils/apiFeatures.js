const { json } = require('express');
const Sequelize = require('sequelize');
const { sequelize } = require('../models');
class ApiFeatures {


    constructor(sequelizeQuery, queryString) {
        this.sqlQuery = sequelizeQuery;
        this.queryString = queryString;
    }

    serach() {
        if (this.queryString.keyword) {
            const keyword = this.queryString.keyword;
            console.log(keyword);
            const serachableFeilds = ["title","description"] 
            const searchConditions = serachableFeilds.map(field => ({
                [field]: {[Sequelize.Op.like]: `%${keyword}%`}
            }));
            

            this.sequelizeQuery = {
                ...this.sequelizeQuery,
                where: {
                    [Sequelize.Op.or]: searchConditions
                },
            }
        }
    }

    filter() {
        const queryStringObject = { ...this.queryString };
        const excludedFields = ['page', 'limit', 'sort', 'fields', 'keyword'];

        // Remove excluded fields from the query string
        excludedFields.forEach((field) => {
            delete queryStringObject[field];
        });

        // Convert operators (gte, gt, lte, lt) to Sequelize syntax
        const operatorsMap = {
            gte: Sequelize.Op.gte,
            gt: Sequelize.Op.gt,
            lte: Sequelize.Op.lte,
            lt: Sequelize.Op.lt,
        };

        const sequelizeFilters = {};
        for (const [key, value] of Object.entries(queryStringObject)) {
            // Check if the value contains operators
            if (typeof value === 'object') {
                sequelizeFilters[key] = {};
                for (const [operator, val] of Object.entries(value)) {
                    const sequelizeOperator = operatorsMap[operator];
                    if (sequelizeOperator) {
                        sequelizeFilters[key][sequelizeOperator] = val;
                    }
                }
            } else {
                // Regular equality condition
                sequelizeFilters[key] = value;
            }
        }

        // Apply the filters to the Sequelize query
        this.sequelizeQuery = {
            ...this.sequelizeQuery,
            where: {
                ...sequelizeFilters,

                
            },
        };

        return this;
    }

    limitFields() {
        console.log("Calling limitFields inside...");
        if (this.queryString.fields) {
           console.log("limit fields methode"  );
            // Include only the specified fields from the query string
            const fields = this.queryString.fields.split(',');
            if (!fields.includes('createdAt')) {
                fields.push('createdAt');
            }
            this.sequelizeQuery = {
                ...this.sequelizeQuery,
                attributes: fields,
            };
        }
        return this;
    }

    paginate(countDocuments) {

        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 5; //each page how mush shoud have items
        const offset = (page - 1) * limit;

        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        const endIndex = page * limit;  //ex : page =5 limit 10 => endIndex = 50 
        pagination.numberOfPages = Math.ceil(countDocuments / limit) //0.3 => 1 ; 

        if (endIndex < countDocuments) {
            pagination.next = page + 1;
        }

        if (offset > 0) {
            pagination.prev = page - 1;
        }

        this.paginationResult = pagination;
        this.sequelizeQuery = {
            ...this.sequelizeQuery,
            limit: parseInt(limit),
            offset: parseInt(offset),

        };

        return this;

    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').map(field => {
                return field.startsWith('-')
                    ? [field.substring(1), 'DESC']
                    : [field, 'ASC'];
            });

            this.sequelizeQuery = {
                ...this.sequelizeQuery,
                order: sortBy,
            }
        } else {
            this.sequelizeQuery.order = [['createdAt', 'DESC']];
        }

        return this;
    }

        join(includeOptions) {  
            if (includeOptions) {
                this.sequelizeQuery = {
                    ...this.sequelizeQuery,
                    include: includeOptions,
                };
            }
            return this;
        }


     group(groupOptions) {
        if(groupOptions) {
            this.sequelizeQuery = {
             ...this.sequelizeQuery ,
             attributes: {groupOptions}  ,   
            }
        }
        return this ; 

     }




}

module.exports = ApiFeatures;


