const { orders } = require("../models/index.js");

module.exports = app => {
    const orders = require("../controllers/orders.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/createNewOrder", orders.createNewOrder);
  
    app.use('/api/orders', router);
  };