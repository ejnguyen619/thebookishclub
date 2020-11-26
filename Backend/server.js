const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');

const app = express();

var corsOptions = {
  origin: "http://localhost:5050"
};

const db = require("./models");
// const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect(db.url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.dbName;
//     dbVar = dbo.collection("myData");
//     console.log(dbVar);
//   });
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.use(morgan('short'));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bookish club application." });
});

require("./routes/books.routes")(app);
require("./routes/users.routes")(app);
require("./routes/orders.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});