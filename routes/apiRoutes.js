var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({
      include:[db.Comments]
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // get one example
  app.get("/api/examples/:id", function(req, res) {
    db.Example.findOne({where: {
      id: req.params.id},
      include: [db.Comments]
    }).then(function(dbExamples) {
      res.json(dbExamples);
      
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: {
       id: req.params.id,       
      } 
    }).then(function( dbExample ) {
      res.json(dbExample);
    });
  });
//Create a Comment
  app.post("/api/comments", function(req,res){
    console.log(req.body)
    db.Comments.create(req.body).then(function(dbComment){
      res.json(dbComment)
    })
   });

// get all comments
app.get("/api/comments", function(req,res){
  console.log(req.params)
  db.Comments.findAll({})
  .then(function(dbComment){
    console.log(dbComment)
    res.json(dbComment)
  })
})

// get all comments for a specific ExampleId
  app.get("/api/comments/:id", function(req,res){
    console.log(req.params)
    db.Comments.findAll({where: { ExampleId: req.params.id}})
    .then(function(dbComment){
      res.json(dbComment)
    })
  })

};

