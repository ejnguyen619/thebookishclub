module.exports = app => {
    const books = require("../controllers/books.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOneUser);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    app.use('/api/users', router);
  };