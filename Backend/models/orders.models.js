module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        book_id: Number,
        email: String,
        title: String,
        deliveryType: {type: String, required: [true, "can't be blank"]},
        name: String,
        addressLine1: String,
        addressLine2: String,
      },
      { timestamps: true }
    );
      
    const Orders = mongoose.model("orders", schema);
    return Orders;
  };