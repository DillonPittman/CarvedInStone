module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    text: DataTypes.STRING
  });

  Comments.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Comments.belongsTo(models.Example, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comments;
};
