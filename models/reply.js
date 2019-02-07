module.exports = function(sequelize, DataTypes) {
  var Reply = sequelize.define("Reply", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
  Reply.associate = function(models) {
    Reply.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
    Reply.hasOne(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Reply;
};