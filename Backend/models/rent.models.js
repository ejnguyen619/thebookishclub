module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        email: String,
        books_count: Number,
        books_rented_details: [{
            book_id: Number,
            title: String
        }],
        user_books_rented_count: Number
      },
      { timestamps: true }
    );
      
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
      
    const Rent = mongoose.model("rent", schema);
    return Rent;
  };