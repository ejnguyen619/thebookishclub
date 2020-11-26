module.exports = app => {
    const users = require("../controllers/users.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/createUser", users.createUser);

    // Update an existing user based on email
    router.put("/updateUser/:id", users.updateUser);
  
    app.use('/api/users', router);
  };