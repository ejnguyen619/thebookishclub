const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.createUser = (req, res) => {
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
      name: req.body.name,
      organization: req.body.organization,
      address: req.body.address,
      image_url: req.body.image_url
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
            err.message || "Some error occurred while creating the User."
        });
      });
  };


exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User data was updated successfully." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.getUserInfo = (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const password = req.query.password;
  var query = {name: name, email: email, password: password};

  User
    .find(query)
    .then(data => {
      console.log(res);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};