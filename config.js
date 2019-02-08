var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "d13xat1hwxt21t45.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "xbep12izt41xqapv",
  password: "agc7isrk8h25dniq",
  database: "ay2bo87e6n2e4hqk"
});
connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected");
  } else {
    console.log("Error while connecting with database");
  }
});
module.exports = connection;
