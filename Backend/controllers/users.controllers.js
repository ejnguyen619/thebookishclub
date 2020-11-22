const db = require("../models");
const Books = db.books;

// // Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a User
    const user = new User({
      email: req.body.email,
      password: password,
      name: req.body.name,
      address: req.body.address,
      image_url: req.body.image_url
    });
  
    // Save Tutorial in the database
    tutorial
      .save(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

// Retrieve all Books from the database based on title.
exports.findAllByTitle = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    // console.log(condition);

    Books.find(condition)
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

// Retrieve all Books from the database based on title.
exports.findAllByAuthor = (req, res) => {
  const authors = req.query.authors;
  var condition = authors ? { authors: { $regex: new RegExp(authors), $options: "i" } } : {};
  // console.log(condition);

  Books.find(condition)
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

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
  
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };