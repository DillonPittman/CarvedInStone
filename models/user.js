// var cryptr = require("cryptr");
// // var express = require("express");
// // var connection = require("./../config");
// // cryptr = new Cryptr("myTotalySecretKey");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
  //Associating User model with Posts and Replies
  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
    User.hasMany(models.Reply, {
      onDelete: "cascade"
    });
  };
  return User;
};
