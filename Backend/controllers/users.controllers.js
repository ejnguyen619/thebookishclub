const db = require("../models");
const User = db.users;

// // Create and Save a new User
exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.email) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a User
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
      // address: req.body.address,
      // image_url: req.body.image_url
    });
  
    // Save user in the database
    user
      .save(user)
      .then(data => {
        console.log(res);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
