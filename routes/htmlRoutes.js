var db = require("../models");

module.exports = function(app) {
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
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbPosts
      });
    });
  });

  // Load Post page and pass in an example by id
  app.get("/post/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(
      dbPost
    ) {
      res.render("example", {
        example: dbPost
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
