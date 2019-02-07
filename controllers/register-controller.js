// var cryptr = require("cryptr");
// // var express = require("express");
// var connection = require("./../config");
// // cryptr = new Cryptr("myTotalySecretKey");
// module.exports.register = function(req, res) {
//   var today = new Date();
//   var encryptedString = cryptr.encrypt(req.body.password);
//   var users = {
//     name: req.body.name,
//     email: req.body.email,
//     password: encryptedString,
//     createdAt: today,
//     updatedAt: today
//   };
//   connection.query("INSERT INTO users SET ?", users, function(error) {
//     if (error) {
//       res.json({
//         status: false,
//         message: "there are some error with query"
//       });
//     } else {
//       res.redirect("http://localhost:3000/login");
//     }
//   });
// };
