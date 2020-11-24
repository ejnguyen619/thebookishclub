const dbConfig = require("../config/db.config.js");

// Connection url
var url = dbConfig.url;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.books = require("./books.models.js")(mongoose);
db.users = require("./users.models.js")(mongoose);

module.exports = db;