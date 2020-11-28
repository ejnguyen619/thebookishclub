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
  // const name = req.query.name;
  // const email = req.query.email;
  // const password = req.query.password;
  // console.log("Name:" + name);
  // console.log("Email:" + email);
  // console.log("Password:" + password);
  // var query = {name: name, email: email, password: password};
  // console.log(query);
  var query = createQuery(req);
  if(query.id == undefined)
  User
    .find(query)
    .then(data => {
      console.log(res);
      //console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
  else
  User
    .findById(query.id)
    .then(data => {
      console.log(res);
      //console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};

const createQuery = req => {
  var query = {};
  const name = (req.query.name != undefined) ? req.query.name : " ";
  const email = (req.query.email != undefined) ? req.query.email : " ";
  const password = (req.query.password != undefined) ? req.query.password : " ";
  const id = (req.query.id != undefined) ? req.query.id : " ";
  if(name != " ") query["name"] = name;
  if(email != " ") query["email"] = email;
  if(password != " ") query["password"] = password;
  if(id != " ") query["id"] = id;
  //console.log(query);
  return query;
};