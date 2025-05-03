module.exports = (sequelize, DataTypes) => {
    const FileAccess = sequelize.define("FileAccess", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      file_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "The file this access relates to",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "The employee/user who has access to the file",
      },
      granted_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "User ID of the person who granted the access",
      },
      granted_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return FileAccess;
  };