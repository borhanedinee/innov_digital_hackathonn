
const bcrypt = require("bcrypt");


module.exports = (sequelize , DataTypes ) => {
    const User = sequelize.define("User", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            notEmpty: true, // Ensure username is not empty
          },
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true, // Ensure email is valid
          },
        },
        phone: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING(255),
          unique: false,
        },
        role: {
          type: DataTypes.ENUM("employer", "approval"),
          allowNull: false,
          defaultValue: "employer",
        },
        active: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 1,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      }, {
        tableName: "users",
        timestamps: true,
      });
    
        User.beforeCreate ( async (user) =>  {

      if (user.password ) {
        user.password =  await bcrypt.hash(user.password , 12) ; 
      }
    })

    User.beforeUpdate ( async (user) =>  {

      if (user.password ) {
        user.password =  await bcrypt.hash(user.password , 12) ; 
        user.passwordChangedAt =  new Date() ; 
      }
    })
      return User;
}
