module.exports = app => {
  const books = require("../controllers/books.controllers.js");

  var router = require("express").Router();

  // // Create a new Tutorial
  // router.post("/", tutorials.create);

  // Retrieve all Books with given title
  router.get("/findBooksByTitle", books.findAllByTitle);
  router.get("/findBooksByAuthor", books.findAllByAuthor);
  router.get("/findAllBooks", books.findAllBooks);

  app.use('/api/books', router);
};