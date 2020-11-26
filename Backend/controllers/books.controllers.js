const db = require("../models");
const Books = db.books;

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
