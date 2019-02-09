// var cryptr = require("cryptr");
// // var express = require("express");
// // var connection = require("./../config");
// // cryptr = new Cryptr("myTotalySecretKey");
module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define('user', {
	  id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		firstname: { type: Sequelize.STRING,notEmpty: true},
		lastname: { type: Sequelize.STRING,notEmpty: true},
		username: {type:Sequelize.TEXT},
		about : {type:Sequelize.TEXT},
		email: { type:Sequelize.STRING, validate: {isEmail:true} },
		password : {type: Sequelize.STRING,allowNull: false }, 
		last_login: {type: Sequelize.DATE},
        status: {type: Sequelize.ENUM('active','inactive'),
        defaultValue:'active' }
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
