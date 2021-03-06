const db = require("../models");
const Books = db.books;

// Retrieve all Books from the database based on title.
exports.findAllByTitle = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    // console.log(condition);

    Books.find(condition)
      .select('book_id authors original_publication_year original_title title language_code average_rating image_url library')
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
    .select('book_id authors original_publication_year original_title title language_code average_rating image_url library')
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

// Retrieve all Books from the database sorted by ID.
exports.findAllBooks = (req, res) => {
  var page = parseInt(req.query.page);
  const PAGE_SIZE = 24;  // Similar to 'limit'
  var skip = (page - 1) * PAGE_SIZE;
  Books.find()
    .select('book_id authors original_publication_year original_title title language_code average_rating image_url library')
    .skip(skip)                 // Same as before, always use 'skip' first
    .limit(PAGE_SIZE)
    .then(data => {
      // console.log(res);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};

exports.updateBookLibrary = (req, res) => {
  Books.updateMany({book_id: { $gt :  req.query.low, $lt : req.query.high}}, {library: req.body},
    function (err, result) {
      if(err){
        console.log(err);
      }
      else {
        console.log("success!");
        res.send(result);
      }
    })
  // const id = req.query.original_title;
  // Books.findOneAndUpdate({ original_title: id },  
  //   { library: req.body}, {new: true}, function (err, docs) { 
  //   if (err){ 
  //       console.log(err) 
  //   } 
  //   else{ 
  //       console.log("Updated Doc : ",docs); 
  //   } 
  // });
}



// // Retrieve all Books from the database with pagination.
// exports.findAllBooks = (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = 24;
//   Books.find()
//     .select('book_id authors original_publication_year original_title language_code average_rating image_url')
//     .then(data => {
//       const pager = paginate(data.length, page, pageSize);
//       const pageOfItems = data.slice(pager.startIndex, pager.endIndex + 1);
//       console.log("pager: ", pager);
//       console.log("pageOfItems: ", pageOfItems);
//       // res.send(json({ pager, pageOfItems }));
//       res.send({pager, pageOfItems});
//       // res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving books."
//       });
//     });
// };
