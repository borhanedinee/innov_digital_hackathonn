const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    }
);

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('connected..');
    })
    .catch((err) => {
        console.log('Error' + err);
    });

const db = {};

// Assign Sequelize instance and DataTypes
db.Sequelize = Sequelize ;
db.sequelize = sequelize ;
db.sequelize = sequelize ;


///models creation : 

db.users = require('./user_Model')(sequelize, DataTypes);
db.files = require('./file_model')(sequelize, DataTypes);
db.fileAccess = require('./fileAccess_model')(sequelize, DataTypes);


//realtionships : 
  

// Users:
db.users.hasMany(db.fileAccess, { foreignKey: "user_id" });
db.users.hasMany(db.files, { foreignKey: "sender_id" }); // A user can have multiple files

// // files:
// db.files.belongsTo(db.categories, { foreignKey: "category_id" });
// db.files.belongsTo(db.subCategories, { foreignKey: "subcategory_id" });
db.files.belongsTo(db.users, { foreignKey: "sender_id" }); // Each product belongs to a user
db.files.hasMany(db.fileAccess, { foreignKey: "file_id" ,}); // A product can have many reviews

// // Reviews:
db.fileAccess.belongsTo(db.files, { foreignKey: "file_id" });
db.fileAccess.belongsTo(db.users, { foreignKey: "user_id" });

// // favorites :

// db.users.hasMany(db.favorites, { foreignKey: "user_id", onDelete: "CASCADE" });
// db.files.hasMany(db.favorites, { foreignKey: "product_id", onDelete: "CASCADE" });
// db.favorites.belongsTo(db.users, { foreignKey: "user_id" });
// db.favorites.belongsTo(db.files, { foreignKey: "product_id" });


// //addresses :

// db.addresses.belongsTo(db.users, { foreignKey: "user_id" });







db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!');
    });

// Export the database object
module.exports = db;
