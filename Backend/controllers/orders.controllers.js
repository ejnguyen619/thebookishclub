const db = require("../models");
const Order = db.orders;
const Book = db.books;

// when the user clicks on confirm booking option, the orders database is populated with details provided by user.
// The number of book is reduced by 1 for that particular book id

// Create and save a new Order
exports.createNewOrder = (req, res) => {
    // Validate request

    var order = null;

    // book_id, email, and title should come from user details. Putting in query parameter as of now
    var book_id = req.query.book_id;
    var email = req.query.email;
    var title = req.query.title;

    // console.log(book_id);

    // check for the delivery type in the request body
    if (!req.body.deliveryType) {
      res.status(400).send({ message: "Need a delivery type to proceed. Field can not be empty!" });
      return;
    }
    else if (req.body.deliveryType == "DropOff") {
        // Create an Order for delivery
        order = new Order({
            book_id: book_id,
            email: email,
            title: title,
            name: req.body.name,
            deliveryType: req.body.deliveryType,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2
        });
    }
    else if (req.body.deliveryType == "Pickup"){
        // Create an Order for pick up
        order = new Order({
            book_id: book_id,
            email: email,
            title: title,
            name: req.body.name,
            deliveryType: req.body.deliveryType
        });
    }
    else {
        res.status(400).send({ message: "Delivery type can only be Pickup and DropOff!" });
        return;
    }
  
    // Save order in the database
    order.save(order)
      .then(data => {
        // console.log(res);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Order."
        });
    });

    Book.findOneAndUpdate({ book_id: book_id },  
        { $inc: { books_count: -1}}, { useFindAndModify: false }, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Updated Doc : ",docs); 
        } 
    });
    
};

