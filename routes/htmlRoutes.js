var db = require("../models");


module.exports = function(app, passport) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("load", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load index page
  app.get("/index", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
    


  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  // Register for a new account
  app.get("/login", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("login", {
        example: dbExample
      });
    });
  });
  // unbale to login page
  app.get("/error", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function() {
      res.render("error", {});
    });
  });
  // unbale to recognize email address
  app.get("/error2", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function() {
      res.render("error2", {});
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
