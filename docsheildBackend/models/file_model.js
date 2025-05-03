module.exports = (sequelize, DataTypes) => {

  const File = sequelize.define("File", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'User (employee) who sent the file'
      },
      approver_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'User (approver) who approved/rejected the file'
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      file_path: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Path or URL where the file is stored'
      },
      file_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'File extension/type (e.g., pdf, docx)'
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending"
      },
      vi: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'AES Initialization Vector used in encryption',
      },
      approved_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // Virtual field to show if the file is signed
      isSigned: {
        type: DataTypes.VIRTUAL,
        get() {
          return !!this.signature_hash;
        }
      }
  });

  return File;
};